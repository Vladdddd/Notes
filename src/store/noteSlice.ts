import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type NoteType = {
  id: string
  caption: string
  text: string
  groupId: string | string[]
}

export type NotesState = {
  notes: NoteType[]
  filteredNotes: NoteType[] | []
  folderNotes: NoteType[]
  searchTab: string
}

export enum StatusEnum {
  Add = 'add',
  Edit = 'edit',
}

const initialState: NotesState = {
  notes: [],
  filteredNotes: [],
  folderNotes: [],
  searchTab: '',
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<{ text: string; caption: string, groupId?: string }>) {
      state.notes.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        caption: action.payload.caption,
        groupId: action.payload.groupId ? action.payload.groupId : '',
      })
    },
    editNote(state, action: PayloadAction<{ id: string; text: string; caption: string }>) {
      const payload = action.payload
      const index = state.notes.findIndex((note: NoteType) => note.id === payload.id)

      if (index !== -1) {
        state.notes[index].text = payload.text
        state.notes[index].caption = payload.caption
      }
    },
    removeNote(state, action: PayloadAction<{ id: string }>) {
      state.notes = state.notes.filter((note: NoteType) => note.id !== action.payload.id)
    },
    setFilteredNotes(state, action: PayloadAction<{ searchTab: string }>) {
      let filtered: NoteType[] = []
      if (action.payload.searchTab) {
        filtered = state.notes.filter((note: NoteType) =>
          note.caption.toLowerCase().includes(action.payload.searchTab.toLowerCase()),
        )
      }
      state.filteredNotes = filtered
    },
    editGroupId(state, action: PayloadAction<{ id: string; groupId: string | string[] }>) {
      const payload = action.payload
      const index = state.notes.findIndex((note: NoteType) => note.id === payload.id)
      if (index !== -1) {
        state.notes[index].groupId = payload.groupId
      }
    },
    setFolderNotes(state, action: PayloadAction<{ id: string }>) {
      state.folderNotes = state.notes.filter((note: NoteType) => note.groupId === action.payload.id)
    },
    setSearchTab(state, action: PayloadAction<{ term: string }>) {
      state.searchTab = action.payload.term
    },
  },
})

export const { addNote, editNote, removeNote, setFilteredNotes, editGroupId, setFolderNotes, setSearchTab } =
  noteSlice.actions

export default noteSlice.reducer
