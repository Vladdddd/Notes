import { AddIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup, Flex, IconButton } from "@chakra-ui/react"

interface PropsType {
    text: string
    addMethod: (value: any) => void
}

export const AddButton: React.FC<PropsType> = ({ text, addMethod }) => {
    return (
        <Flex justify='flex-start'>
                <ButtonGroup
                    size='md'
                    variant='outline'
                    isAttached
                >
                    <IconButton
                        aria-label='Add to friends'
                        icon={<AddIcon />}
                        _focus={{}}
                        onClick={addMethod}
                    />
                    <Button _focus={{}}>{text}</Button>
                </ButtonGroup>
        </Flex>
    )
}