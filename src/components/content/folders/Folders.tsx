import { Route, Routes } from "react-router-dom"
import { FolderType } from "../../../store/folderSlice"
import { NoteType } from "../../../store/noteSlice"
import { VariantsType } from "../Content"
import { Folder } from "./Folder"

interface PropsType {
    notes: NoteType[]
    folders: FolderType[]
    variants: VariantsType
    searchTab: string
}

export const Folders: React.FC<PropsType> = ({ notes, folders, variants, searchTab }) => {

    return (
        <Routes>
            {folders.map((folder) => (
                <Route
                    path={folder.id + '/*'}
                    key={folder.id}
                    element={<Folder
                        notes={notes}
                        searchTab={searchTab}
                        folders={folders}
                        folder={folder}
                        variants={variants}
                    />}>
                </Route>
            ))}
        </Routes>
    )
}

