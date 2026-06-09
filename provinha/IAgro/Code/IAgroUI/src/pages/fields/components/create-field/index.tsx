import { ActionIcon, Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import type { FieldCreation } from "../../../../types/fields.types";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/user.context";
import { CreateFieldMap } from "../create-field-map";
import { calculatePolygonAreaInAcres } from "../../../../utils/acres.utils";
import { api } from "../../../../services/api.service";

export interface CreateFieldProps {
    opened: boolean;
    open: () => void;
    close: () => void;
}

export function CreateField({ opened, open, close }: CreateFieldProps) {

    const { user } = useContext(UserContext);
    const {
        key, 
        onSubmit, 
        getInputProps,
        setFieldValue,
        reset,
    } = useForm<Omit<FieldCreation, "area" | "companyId">>({
        initialValues: { crop: "", nickname: "", locationPoints: [] },
    });

    const submit = async (form: Omit<FieldCreation, "area" | "companyId">) => {
        const fieldCreation: FieldCreation = {
            ...form, companyId: user!.company.id,
            area: calculatePolygonAreaInAcres(form.locationPoints),
        }
        await api.post("/fields", fieldCreation);
        reset();
        close();
    }

    return (
        <>
            <ActionIcon variant="filled" onClick={open} size="lg">
                <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5}/>
            </ActionIcon>

            <Modal opened={opened} onClose={close} title="Create new Field">
                <form onSubmit={onSubmit(submit)}>
                    <Stack>
                        <TextInput 
                            key={key("nickname")}
                            label="Nickname"
                            {...getInputProps("nickname")}
                            required
                        />

                        <TextInput 
                            key={key("crop")}
                            label="Crop produced in the field"
                            {...getInputProps("crop")}
                            required
                        />

                        <CreateFieldMap 
                            onPolygonDraw={(points) => 
                                setFieldValue("locationPoints", points.map(({ lat, lng }) => ({ latitude: lat, longitude: lng })))}
                        />

                        <Button type="submit">Create</Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}