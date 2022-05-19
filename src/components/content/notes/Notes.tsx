import { Box, Flex, Text } from "@chakra-ui/layout"
import { Route, Routes } from "react-router"
import { addNote, editNote, NoteType, removeNote, StatusEnum } from "../../../store/noteSlice"
import { Note } from "./Note"
import { Icon } from "./Icon"
import { useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { useEffect, useState } from "react"
import { AddButton } from "../buttons/AddButton"
import { VariantsType } from "../Content"

const initialNote = {
    id: '',
    text: '',
    caption: ''
}

export type HandleActionType = (
    id: string,
    text: string,
    caption: string,
    status: StatusEnum) => void

interface PropsType {
    notes: NoteType[]
    variants: VariantsType    
}

export const Notes: React.FC<PropsType> = ({ notes, variants }) => {
    const location = useLocation();
    const filtered = useAppSelector(state => state.notes.filteredNotes)
    const isString = typeof filtered === 'string'
    const [filteredNotes, setNotes] = useState(notes)

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

    const handleSubmit = () => {
        setIsCreate(true)
    }

    const handleRemove = (id: string) => {
        dispatch(removeNote({id}))
    }

    useEffect(() => {
        if (!isString) {
            setNotes(filtered)
        }
    }, [filtered, isString])

    if (isString) {
        return <Text>{filtered}</Text>
    }

    return (
        <>
            <AddButton addMethod={handleSubmit} text={'Add Note'} />
            <Flex justifyContent='flex-start' flexWrap='wrap' mt='5' gap='8'>
                {filteredNotes.map((note: NoteType) => (
                    <Box w='31%' h='40' key={note.id}>
                        <Icon note={note} variants={variants} handleRemove={handleRemove}/>
                        <AnimatePresence exitBeforeEnter>
                            <Routes location={location} key={location.pathname}>
                                <Route
                                    path={note.id}
                                    element={<Note
                                        note={note}
                                        status={StatusEnum.Edit}
                                        variants={variants}
                                        setIsCreate={setIsCreate}
                                        handleAction={handleAction}
                                        handleRemove={handleRemove}
                                    />}>
                                </Route>
                            </Routes>
                        </AnimatePresence>
                    </Box>
                ))}
            </Flex>
            {isCreate &&
                <AnimatePresence exitBeforeEnter><Note
                    variants={variants}
                    note={initialNote}
                    status={StatusEnum.Add}
                    handleAction={handleAction}
                    setIsCreate={setIsCreate}
                    handleRemove={handleRemove}
                /></AnimatePresence>
            }
        </>
    )
}
