import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import groupSlice from './groupSlice'
import noteReducer from './noteSlice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['notes', 'groups'],
}

const notesPersistConfig = {
  key: 'notes',
  storage: storage,
  blacklist: ['filteredNotes', 'folderNotes', 'searchTab'],
}

const groupsPersistConfig = {
  key: 'groups',
  storage: storage,
  blacklist: ['currentGroup'],
}

const rootReducer = combineReducers({
  notes: persistReducer(notesPersistConfig, noteReducer),
  groups: persistReducer(groupsPersistConfig, groupSlice),
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
