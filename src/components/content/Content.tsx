import { Box, Button, ButtonGroup, Flex, IconButton } from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'
import { addNote, editNote, NoteType, removeNote, StatusEnum } from "../../store/noteSlice"
import { Notes } from "./Notes";
import { useState } from "react";
import { Note } from "./Note";
import { useAppDispatch } from "../../hooks/redux"
import { AnimatePresence } from "framer-motion";

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
    status: StatusEnum) => void

const variants = {
    hidden: {
        opacity: 0,
        transition: { duration: 0.2 }
    },
    visible: {
        opacity: 1,
        transition: { duration: 0.2 }
    },
}

export type VariantsType = typeof variants

export const Content: React.FC<PropsType> = ({ notes }) => {
    const [isCreate, setIsCreate] = useState(false)
    const dispatch = useAppDispatch()

    const handleAction: HandleActionType = (id, text, caption, status) => {
        if (status === StatusEnum.Add) {
            if (text.trim().length | caption.trim().length) {
                dispatch(addNote({ caption, text }))
            }
        } else if (status === StatusEnum.Edit) {
            if (!text.trim().length && !caption.trim().length) {
                dispatch(removeNote({ id }))
            } else {
                dispatch(editNote({ id, caption, text }))
            }
        }

        setIsCreate(false)
    }

    return (
        <Box
            as='main' pt='8'
            pl='20' pr='20' pb='20'
            w='100%'
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

            <Notes notes={notes} variants={variants} handleAction={handleAction} setIsCreate={setIsCreate} />
            {isCreate &&
                <AnimatePresence exitBeforeEnter><Note
                    variants={variants}
                    note={initialNote}
                    status={StatusEnum.Add}
                    handleAction={handleAction}
                    setIsCreate={setIsCreate}
                /></AnimatePresence>
            }
        </Box>
    )
}
