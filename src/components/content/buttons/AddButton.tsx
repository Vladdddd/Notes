import { AddIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Flex, IconButton } from '@chakra-ui/react'

interface PropsType {
  text: string
  addMethod: (value: any) => void
}

export const AddButton: React.FC<PropsType> = ({ text, addMethod }) => {
  return (
    <Flex justify="flex-start">
      <ButtonGroup w="40" isAttached>
        <IconButton
          bg="white"
          color="#3563E9"
          aria-label="Add notes"
          border="2px solid #3563E9"
          borderRight="0"
          icon={<AddIcon />}
          _focus={{}}
          _hover={{
            bg: '#3563E9',
            color: 'white',
            border: '2px solid white',
          }}
          _active={{}}
          onClick={addMethod}
        />
        <Button
          _focus={{}}
          _hover={{ bg: '#3563E9', color: 'white', border: '2px solid white' }}
          bg="white"
          color="#3563E9"
          border={'2px solid #3563E9'}
        >
          {text}
        </Button>
      </ButtonGroup>
    </Flex>
  )
}
