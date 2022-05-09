import { Box, Flex, Input } from "@chakra-ui/react"

export const Header: React.FC = () => {
    return (
        <Flex mb={2} p={3} w='full' justify='center'>
            <Box as='header' w='3xl'>
                <Input 
                    h='12' 
                    variant='filled' 
                    placeholder='Search your note' 
                    _focus={{}}/>
            </Box>
        </Flex>
        
    )
}