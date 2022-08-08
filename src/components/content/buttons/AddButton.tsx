import { AddIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Flex, IconButton } from '@chakra-ui/react'

interface PropsType {
  text: string
  addMethod: (value: any) => void
}

export const AddButton: React.FC<PropsType> = ({ text, addMethod }) => {
  return (
    <Flex justify="flex-start" mr={['6', '10']}>
      <ButtonGroup w="32" isAttached>
        <IconButton
          bg="#080721"
          color="white"
          aria-label="Add to friends"
          icon={<AddIcon />}
          _focus={{}}
          _hover={{}}
          onClick={addMethod}
        />
        <Button _focus={{}} border="1.5px solid #080721">
          {text}
        </Button>
      </ButtonGroup>
    </Flex>
  )
}
