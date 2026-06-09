import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/user.context";
import type { LoginResponse, LoginRequest } from "../../types/auth.types";
import { api } from "../../services/api.service";
import { StorageKeys } from "../../constants/storage-keys";
import { jwtDecode } from "jwt-decode";
import type { User } from "../../types/users.types";
import { AppRoutes } from "../../constants/app-routes";
import { useForm } from '@mantine/form';
import { Button, Center, Container, Flex, LoadingOverlay, PasswordInput, rem, Text, TextInput } from "@mantine/core";
import { Logo } from "../../components/utils/logo";
import { IconAt, IconLock } from "@tabler/icons-react";
import { notify } from "../../components/feedback/notifier/functions";

export function Login() {

    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
    const { key, onSubmit, getInputProps } = useForm<LoginRequest>({
        initialValues: { password: "", email: "" },
    });
    const [loading, setLoading] = useState(false);
    
    const submit = async (request: LoginRequest) => {
        try {
            setLoading(true);
            const { data: { token } } = await api.post<LoginResponse>("/auth/login", request);
            
            localStorage.setItem(StorageKeys.TOKEN, token);
            const { sub } = jwtDecode(token);
            const { data: user} = await api.get<User>("/users/" + sub);

            updateUser(user);
            navigate(user.role == "Admin" ? AppRoutes.ACCOUNT : AppRoutes.DASHBOARD);
        } catch (error) {
            notify.error(String(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Center h="80vh">
            <Container 
                size="xs" w={rem(400)} maw="95%" pos="relative"
                px="md" py={rem(32)} bd="1px solid var(--mantine-color-default-border)"
            >
                <LoadingOverlay visible={loading}/>

                <form onSubmit={onSubmit(submit)}>
                    <Flex direction="column" gap="lg">
                        <Logo style={{ alignSelf: "center" }}/>
                        <Text ta="center" fz={rem(18)}>Login to your account</Text>

                        <TextInput 
                            key={key("email")}
                            {...getInputProps("email")}
                            label="Email"
                            leftSection={<IconAt/>}
                            required
                        />

                        <PasswordInput
                            key={key("password")}
                            {...getInputProps("password")}
                            label="Password"
                            leftSection={<IconLock/>}
                            required
                        />

                        <Button 
                            mt="sm" 
                            type="submit"
                            style={{ alignSelf: "end" }}
                        >Login</Button>
                    </Flex>
                </form>
            </Container>
        </Center>
    )
}