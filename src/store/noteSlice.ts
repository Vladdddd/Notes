import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type NoteType = {
  id: string
  caption: string
  text: string
  groupId: string | string[]
  isFavorite: boolean
}

export type NotesState = {
  notes: NoteType[]
  filteredNotes: NoteType[] | []
  groupNotes: NoteType[]
  searchTab: string
}

export enum StatusEnum {
  Add = 'add',
  Edit = 'edit',
}

const initialState: NotesState = {
  notes: [],
  filteredNotes: [],
  groupNotes: [],
  searchTab: '',
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<{ text: string; caption: string; isFavorite: boolean; groupId?: string }>) {
      state.notes.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        caption: action.payload.caption,
        groupId: action.payload.groupId ? action.payload.groupId : '',
        isFavorite: action.payload.isFavorite,
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
      state.groupNotes = state.notes.filter((note: NoteType) => note.groupId === action.payload.id)
    },
    setSearchTab(state, action: PayloadAction<{ term: string }>) {
      state.searchTab = action.payload.term
    },
    editFavorite(state, action: PayloadAction<{ id: string; isFavorite: boolean }>) {
      const payload = action.payload
      const index = state.notes.findIndex((note: NoteType) => note.id === payload.id)

      if (index !== -1) {
        state.notes[index].isFavorite = payload.isFavorite
      }
    },
  },
})

export const {
  addNote,
  editNote,
  removeNote,
  setFilteredNotes,
  editGroupId,
  setFolderNotes,
  setSearchTab,
  editFavorite,
} = noteSlice.actions

export default noteSlice.reducer
