import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export type FolderType = {
    id: string
    title: string
}

export type FoldersState = {
    folders: FolderType[]
}

const initialState: FoldersState = {
    folders: []
}

const folderSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        addFolder(state, action: PayloadAction<{title: string}>) {  
            state.folders.push({
                id: uuidv4(),
                title: action.payload.title
            })
        },
        editFolder(state, action: PayloadAction<{id: string, title: string}>) {
            const payload = action.payload
            const index = state.folders.findIndex((folder: FolderType) => folder.id === payload.id)

            if(index !== -1) {
                state.folders[index].title = payload.title
            }
        },
        removeFolder(state, action: PayloadAction<{id: string}>) {
            state.folders = state.folders.filter((folder: FolderType) => folder.id !== action.payload.id)
        },
    }
})

export const { addFolder, editFolder, removeFolder } = folderSlice.actions

export default folderSlice.reducer

