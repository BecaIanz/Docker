import { Button, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import type { Company, UserCreation } from "../../types/users.types";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { UserContext } from "../../contexts/user.context";
import { api } from "../../services/api.service";

export function CreateUser() {

    const { user } = useContext(UserContext);
    const [companies, setCompanies] = useState<Omit<Company, "users">[]>([])
    const [opened, { open, close }] = useDisclosure();

    const {
        key,
        onSubmit,
        getInputProps,
        reset,
    } = useForm<UserCreation>({
        initialValues: { email: "", password: "", companyId: user!.company.id },
    });

    const submit = async (user: UserCreation) => {
        await api.post("/users", user);
        reset();
        close();
    }

    useEffect(() => {
        api.get("/companies").then(({ data }) => setCompanies(data));
    }, [])

    return user?.role != "Reader" && (
        <>
            <Button
                rightSection={<IconPlus />}
                onClick={open}
            >
                Create New User
            </Button>

            <Modal opened={opened} onClose={close} title="Create User">
                <form onSubmit={onSubmit(submit)}>
                    <Stack>
                        <TextInput
                            key={key("email")}
                            label="Email"
                            {...getInputProps("email")}
                            required
                        />
                        <TextInput
                            key={key("password")}
                            label="Password"
                            {...getInputProps("password")}
                            type="password"
                            required
                        />
                        <Select
                            key={key("companyId")}
                            label="Company"
                            {...getInputProps("companyId")}
                            required
                            data={companies.map(x => ({ value: x.id, label: x.name }))}
                        />
                        <Button type="submit">Create</Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}