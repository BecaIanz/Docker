import { Center, Loader } from "@mantine/core";

export function PageLoading() {
    return (
        <Center h="100vh" mah="100%" w="100vw" maw="100%">
            <Loader 
                type="bars" 
                color="cyan"
                size="xl"
            />
        </Center>
    )
}