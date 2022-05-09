import { Box, Flex } from "@chakra-ui/layout"
import { Route, Routes } from "react-router"
import { NoteType, StatusEnum } from "../../store/noteSlice"
import { Note } from "./Note"
import { NoteIcon } from "./NoteIcon"

interface PropsType {
    notes: NoteType[]
    handleAction: (id: string, text: string, caption: string, status: StatusEnum) => void
    setIsCreate: (isCreate: boolean) => void 
}

export const Notes: React.FC<PropsType> = ({ notes, handleAction, setIsCreate }) => {

    return (
        <Flex justifyContent='flex-start' flexWrap='wrap' mt='5'>
            {notes.map((note: NoteType) => (
                <Box w='30%' h='40' mr='8' mb='8' key={note.id}>
                    <NoteIcon note={note}  />
                    <Routes>
                        <Route
                            path={note.id}
                            element={<Note
                                handleAction={handleAction}
                                note={note}
                                status={StatusEnum.Edit}
                                setIsCreate={setIsCreate}
                            />}>
                        </Route>
                    </Routes>
                </Box>
            ))}
        </Flex>
    )
}
