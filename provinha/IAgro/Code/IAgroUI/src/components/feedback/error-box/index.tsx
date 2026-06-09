import { Center, Stack, Text } from "@mantine/core";

export interface ErrorBoxProps {
    message: string;
    status?: number;
    details: string;
}

export function ErrorBox({
    message,
    status,
    details,
}: ErrorBoxProps) {
    return (
        <Center w="100%" h="100%">
            <Stack>
                <Text ta="center">{ status }</Text>
                <Text ta="center">{ message }</Text>
                <Text ta="center">{ details }</Text>
            </Stack>
        </Center>
    )
}