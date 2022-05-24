import { Box } from "@chakra-ui/react"
import { NoteType } from "../../store/noteSlice"
import { Notes } from "./notes/Notes";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { Folders} from "./folders/Folders";
import { FolderIcons } from "./folders/FolderIcons";

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
    searchTab: string
}

export const Content: React.FC<PropsType> = ({ notes, searchTab }) => {
    const folders = useAppSelector(state => state.folders.folders)
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
                        searchTab={searchTab}
                        folders={folders}
                        notes={notes}
                        variants={variants}
                    />}>
                </Route>
                <Route
                    path='/folders/*'
                    element={<FolderIcons
                        folders={folders}
                        variants={variants}
                    />}>
                </Route>
            </Routes>
            <Folders notes={notes} folders={folders} variants={variants} searchTab={searchTab}/>
        </Box>
    )
}
