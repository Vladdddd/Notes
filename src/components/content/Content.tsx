import { Box, Button, ButtonGroup, Flex, IconButton } from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'
import { addNote, editNote, NoteType, removeNote, StatusEnum } from "../../store/noteSlice"
import { Notes } from "./Notes";
import { useState } from "react";
import { Note } from "./Note";
import { useAppDispatch } from "../../hooks/redux"

const initialNote = {
    id: '',
    text: '',
    caption: ''
}

interface PropsType {
    notes: NoteType[]
}

export type HandleActionType = (
    id: string, 
    text: string, 
    caption: string, 
    status: StatusEnum ) => void

export const Content: React.FC<PropsType> = ({ notes }) => {
    const [isCreate, setIsCreate] = useState(false)
    const dispatch = useAppDispatch()

    const handleAction: HandleActionType = (id, text, caption, status) => { 
            if (status === StatusEnum.Add) {
                if (text.trim().length | caption.trim().length) {
                    dispatch(addNote({ caption, text }))
                }
            } else if(status === StatusEnum.Edit){
                if(!text.trim().length && !caption.trim().length) {
                    dispatch(removeNote({ id }))
                } else {
                    dispatch(editNote({ id, caption, text }))
                }
            }
        
        setIsCreate(false)
    }

    return (
        <Box
            as='main' p='8' 
            pl='20' pr='20'
            w='full' h='full'
            bg='gray.50'
        >
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
                        onClick={() => setIsCreate(true)}
                    />
                    <Button _focus={{}}>Add Note</Button>
                </ButtonGroup>
            </Flex>

            <Notes notes={notes} handleAction={handleAction} setIsCreate={setIsCreate}/>
            {isCreate && 
                <Note 
                    note={initialNote}
                    status={StatusEnum.Add}
                    handleAction={handleAction}
                    setIsCreate={setIsCreate}
                />
            }
        </Box>
    )
}
