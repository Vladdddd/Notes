import { Box } from "@chakra-ui/react"
import { NoteType } from "../../store/noteSlice"
import { Notes } from "./notes/Notes";
import { Route, Routes } from "react-router-dom";
import { Folders } from "./folders/Folders";

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

interface PropsType {
    notes: NoteType[]
}

export const Content: React.FC<PropsType> = ({ notes }) => {
    return (
        <Box
            as='main' pt='8'
            pl='20' pr='20' pb='20'
            w='100%'
        >            
            <Routes>
                <Route
                    path='/notes/*'
                    element={<Notes 
                        notes={notes} 
                        variants={variants}
                        />}>
                </Route>
                <Route
                    path='/folders/*'
                    element={<Folders 
                            variants={variants} 
                        />}>
                </Route>
            </Routes>            
        </Box>
    )
}
