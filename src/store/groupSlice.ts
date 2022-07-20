import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export type GroupType = {
  id: string
  title: string
}

export type GroupsState = {
  groups: GroupType[],
}

const initialState: GroupsState = {
  groups: [],
}

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup(state, action: PayloadAction<{ title: string }>) {
      state.groups.push({
        id: uuidv4(),
        title: action.payload.title,
      })
    },
    editGroup(state, action: PayloadAction<{ id: string; title: string }>) {
      const payload = action.payload
      const index = state.groups.findIndex((folder: GroupType) => folder.id === payload.id)

      if (index !== -1) {
        state.groups[index].title = payload.title
      }
    },
    removeGroup(state, action: PayloadAction<{ id: string }>) {
      state.groups = state.groups.filter((folder: GroupType) => folder.id !== action.payload.id)
    },
  },
})

export const { addGroup, editGroup, removeGroup } = groupSlice.actions

export default groupSlice.reducer
