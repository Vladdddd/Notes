import { DeleteIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"

interface PropsType {
    id: string
    removeMethod: (value: any) => void
}

export const RemoveButton: React.FC<PropsType> = ({ id, removeMethod }) => {
    return (
        <IconButton
            size='md'
            top='5%'
            right='2%'
            pos='absolute'
            opacity='0.8'
            aria-label='Remove'
            zIndex='99'
            icon={<DeleteIcon />}
            _focus={{}}
            onClick={() => removeMethod(id)}
        />
    )
}