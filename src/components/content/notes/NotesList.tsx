import { Box, Flex } from '@chakra-ui/layout'
import { Route, Routes } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

import { VariantsType } from '../Content'
import { GroupType } from '../../../store/groupSlice'
import { NoteType, StatusEnum, addNote, editNote, removeNote } from '../../../store/noteSlice'
import { useAppDispatch } from '../../../hooks/redux'

import { Icon } from './Icon'
import { Note } from './Note'
import { CreationPanel } from './CreationPanel'

export type HandleActionType = (
  id: string,
  text: string,
  caption: string,
  status: StatusEnum,
  isFavorite: boolean,
  groupId?: string,
) => void

interface PropsType {
  caption: string
  path: string
  notes: NoteType[]
  variants: VariantsType
  groups: GroupType[]
  groupId?: string
}

export const NotesList: React.FC<PropsType> = ({ caption, path, notes, groups, variants, groupId }) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [isCreate, setIsCreate] = useState(false)

  const handleSubmit = () => {
    setIsCreate(true)
  }

  const handleAction: HandleActionType = (id, text, caption, status, isFavorite, groupId) => {
    if (status === StatusEnum.Add) {
      if (text.trim().length | caption.trim().length) {
        dispatch(addNote({ caption, text, groupId, isFavorite }))
      }
    }
    if (status === StatusEnum.Edit) {
      if (!text.trim().length && !caption.trim().length) {
        dispatch(removeNote({ id }))
      } else {
        dispatch(editNote({ id, caption, text }))
      }
    }
    setIsCreate(false)
  }

  const handleRemove = (id: string) => {
    dispatch(removeNote({ id }))
  }

  return (
    <Box w="100%">
      <CreationPanel
        path={path}
        caption={caption}
        notes={notes}
        variants={variants}
        groupId={groupId ? groupId : ''}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        handleSubmit={handleSubmit}
        handleAction={handleAction}
        handleRemove={handleRemove}
      />
      <Flex w="100%" flexWrap="wrap" mt="5" justify={['center', 'start', 'start']}>
        {notes.length
          ? notes.map((note: NoteType) => (
            <Box w={['85%', '45%', '30.3%']} mb="3%" mr="3%" h="40" key={note.id}>
              <Icon groups={groups} note={note} variants={variants} handleRemove={handleRemove} />
              <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                  <Route
                    path={note.id}
                    element={
                      <Note
                        groupId={groupId ? groupId : ''}
                        path={path}
                        note={note}
                        status={StatusEnum.Edit}
                        variants={variants}
                        setIsCreate={setIsCreate}
                        handleAction={handleAction}
                        handleRemove={handleRemove}
                      />
                    }
                  ></Route>
                </Routes>
              </AnimatePresence>
            </Box>
          ))
          : ''}
      </Flex>
    </Box>
  )
}
