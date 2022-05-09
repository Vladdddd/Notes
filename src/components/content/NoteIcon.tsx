import { DeleteIcon } from "@chakra-ui/icons"
import { Box } from "@chakra-ui/layout"
import { IconButton, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../hooks/redux"
import { NoteType, removeNote } from "../../store/noteSlice"

interface PropsType {
    note: NoteType
}

export const NoteIcon: React.FC<PropsType> = ({ note }) => {
    const dispatch = useAppDispatch()
    return (
        <Box w='full' h='full' pos='relative' zIndex='1'>
            <Link to={note.id}><Box
                p='5' pt='3'
                w='full' h='full'
                border='1px solid #CBD5E0' borderRadius='5'
                bg='white'
            >
                <Text 
                    h={['40%', '30%', '22%']} 
                    fontFamily='SFMono-Regular,Menlo,Monaco,Consolas,monospace' 
                    fontSize='lg' 
                    color='gray.800' 
                    overflow='hidden'
                >{note.caption}</Text>

                <Text 
                    h={['60%', '70%', '78%']} 
                    fontSize={['2xl', 'xl']} 
                    overflow='hidden'
                >{note.text}</Text>
            </Box></Link>
            <IconButton
                size='sm'
                top='5%'
                left={['50%', '65%', '70%', '75%', '83%', '85%']}
                pos='absolute'
                opacity='0.8'
                aria-label='Remove'
                icon={<DeleteIcon />}
                _focus={{}}
                onClick={() => dispatch(removeNote({ id: note.id }))}
            />
        </Box>
    )
}