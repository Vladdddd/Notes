import { Box, Flex } from "@chakra-ui/layout"
import { Route, Routes } from "react-router"
import { NoteType, StatusEnum } from "../../store/noteSlice"
import { Note } from "./Note"
import { Icon } from "./Icon"
import { useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { VariantsType } from "./Content"

interface PropsType {
    notes: NoteType[]
    variants: VariantsType
    handleAction: (id: string, text: string, caption: string, status: StatusEnum) => void
    setIsCreate: (isCreate: boolean) => void
}




export const Notes: React.FC<PropsType> = ({ notes, variants, handleAction, setIsCreate }) => {
    const location = useLocation();

    return (
        <Flex justifyContent='flex-start' flexWrap='wrap' mt='5' gap='8'>
            {notes.map((note: NoteType) => (
                <Box w='31%' h='40' key={note.id}>
                    <Icon note={note} variants={variants} />
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
                                />}>
                            </Route>
                        </Routes>
                    </AnimatePresence>
                </Box>
            ))}
        </Flex>
    )
}
