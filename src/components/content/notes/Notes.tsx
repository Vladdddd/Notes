import { Box, Flex } from "@chakra-ui/layout"
import { Route, Routes } from "react-router"
import { addNote, editNote, NoteType, removeNote, StatusEnum } from "../../../store/noteSlice"
import { Note } from "./Note"
import { Icon } from "./Icon"
import { useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { useEffect, useState } from "react"
import { VariantsType } from "../Content"
import { FolderType } from "../../../store/folderSlice"
import { CreateNewNote } from "./CreateNewNote"



export type HandleActionType = (
    id: string,
    text: string,
    caption: string,
    status: StatusEnum
) => void

interface PropsType {
    notes: NoteType[]
    variants: VariantsType
    folders: FolderType[]
    searchTab: string
}

export const Notes: React.FC<PropsType> = ({ folders, notes, variants, searchTab }) => {
    const location = useLocation();

    const filtered = useAppSelector(searchTab ? state => state.notes.filteredNotes : () => ([]))
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
        dispatch(removeNote({ id }))
    }

    useEffect(() => {
        if (!isString && filtered.length) {
            setNotes(filtered)
        }
    }, [filtered, isString])

    useEffect(() => {
        setNotes(notes)
    }, [notes]) 

    if (isString) {
        return (
            <> 
                <CreateNewNote 
                    variants={variants}
                    isCreate={isCreate}
                    isExist={isString}
                    handleSubmit={handleSubmit}
                    handleAction={handleAction}
                    handleRemove={handleRemove}
                    setIsCreate={setIsCreate}
                />
            </>
        )
    }

    return (
        <>
            <CreateNewNote 
                    variants={variants}
                    isCreate={isCreate}
                    isExist={!filteredNotes.length ? true : false}
                    handleSubmit={handleSubmit}
                    handleAction={handleAction}
                    handleRemove={handleRemove}
                    setIsCreate={setIsCreate}
            />
            <Flex justifyContent='flex-start' flexWrap='wrap' mt='5' gap='8'>
                {filteredNotes.map((note: NoteType) => (
                    <Box w='31%' h='40' key={note.id}>
                        <Icon folders={folders} note={note} variants={variants} handleRemove={handleRemove} />
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
        </>
    )
}
