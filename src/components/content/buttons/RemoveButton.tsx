import { DeleteIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

interface PropsType {
  id: string
  removeMethod: (value: any) => void
}

export const RemoveButton: React.FC<PropsType> = ({ id, removeMethod }) => {
  return (
    <IconButton
      size="sm"
      top="10%"
      right="2%"
      pos="absolute"
      color="#080721"
      opacity="0.8"
      aria-label="Remove"
      zIndex="99"
      icon={<DeleteIcon />}
      _focus={{}}
      onClick={() => removeMethod(id)}
    />
  )
}
