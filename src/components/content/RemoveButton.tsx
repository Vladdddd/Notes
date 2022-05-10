import { DeleteIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import { useAppDispatch } from "../../hooks/redux"
import { removeNote } from "../../store/noteSlice"

interface PropsType {
    id: string
}

export const RemoveButton: React.FC<PropsType> = ({ id }) => {
    const dispatch = useAppDispatch()
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
            onClick={() => dispatch(removeNote({ id }))}
        />
    )
}