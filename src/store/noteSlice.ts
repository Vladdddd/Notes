import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NoteType = {
    id: string
    caption: string
    text: string
}

export type NotesState = {
    notes: NoteType[]
}

export enum StatusEnum {
    Add = 'add', 
    Edit = 'edit'
}

const initialState: NotesState = {
    notes: []
}

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote(state, action: PayloadAction<{text: string, caption: string}>) {
            state.notes.push({
                id: new Date().toISOString(),
                text: action.payload.text,
                caption: action.payload.caption
            })
        },
        editNote(state, action: PayloadAction<{id: string, text: string, caption: string}>) {
            const payload = action.payload
            const index = state.notes.findIndex((note: NoteType) => note.id === payload.id)

            if(index !== -1) {
                state.notes[index].text = payload.text
                state.notes[index].caption = payload.caption
            }
        },
        removeNote(state, action: PayloadAction<{id: string}>) {
            state.notes = state.notes.filter((note: NoteType) => note.id !== action.payload.id)
        }
    }
})

export const { addNote, editNote, removeNote } = noteSlice.actions

export default noteSlice.reducer