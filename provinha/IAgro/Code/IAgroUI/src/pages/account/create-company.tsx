import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useContext } from "react";
import type { CompanyCreation } from "../../types/users.types";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { UserContext } from "../../contexts/user.context";
import { api } from "../../services/api.service";

export function CreateCompany() {

    const { user } = useContext(UserContext);
    const [opened, { open, close }] = useDisclosure();

    const {
        key,
        onSubmit,
        getInputProps,
        reset,
    } = useForm<CompanyCreation>({
        initialValues: { name: "", cnpj: "", country: "" },
    });

    const submit = async (company: CompanyCreation) => {
        await api.post("/companies", company);
        reset();
        close();
    }

    return user?.role == "Admin" && (
        <>
            <Button
                rightSection={<IconPlus />}
                onClick={open}
            >
                Create New Company
            </Button>

            <Modal opened={opened} onClose={close} title="Create Company">
                <form onSubmit={onSubmit(submit)}>
                    <Stack>
                        <TextInput
                            key={key("name")}
                            label="Name"
                            {...getInputProps("name")}
                            required
                        />
                        <TextInput
                            key={key("country")}
                            label="Country"
                            {...getInputProps("country")}
                            required
                        />
                        <TextInput
                            key={key("cnpj")}
                            label="CNPJ"
                            {...getInputProps("cnpj")}
                            required
                        />
                        <Button type="submit">Create</Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}