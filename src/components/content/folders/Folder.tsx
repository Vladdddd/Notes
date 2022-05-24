import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { FolderType } from "../../../store/folderSlice"
import { NoteType, setFolderNotes } from "../../../store/noteSlice"
import { VariantsType } from "../Content"
import { Notes } from "../notes/Notes"

interface PropsType {
    notes: NoteType[]
    folders: FolderType[]
    folder: FolderType
    variants: VariantsType
    searchTab: string
}

export const Folder: React.FC<PropsType> = ({ notes, folders, folder, variants, searchTab }) => {
    const dispatch = useAppDispatch()
    const folderNotes = useAppSelector(state => state.notes.folderNotes)

    useEffect(() => {
        dispatch(setFolderNotes({ name: folder.title }))
    }, [folder, notes])

    return (
        <Notes
            searchTab={searchTab}
            folders={folders}
            notes={folderNotes}
            variants={variants}
        />
    )
}