import { Box, Flex, Text } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { addNote, editNote, NoteType, removeNote, StatusEnum } from '../../../store/noteSlice'
import { VariantsType } from '../Content'
import { GroupType } from '../../../store/groupSlice'

import { CreateNewNote } from './CreateNewNote'
import { NotesList } from './NotesList'

export type HandleActionType = (id: string, text: string, caption: string, status: StatusEnum, groupId?: string) => void

interface PropsType {
  notes: NoteType[]
  variants: VariantsType
  groups: GroupType[]
  searchTab: string
  groupId?: string
}

const emptyArray: NoteType[] = []

const Notes: React.FC<PropsType> = ({ groups, notes, variants, searchTab, groupId }) => {
  const filteredNotes = useAppSelector(searchTab ? (state) => state.notes.filteredNotes : () => emptyArray)
  //const filteredNotes: NoteType[] = []
  
  const [componentNotes, setNotes] = useState(notes)
  const [isCreate, setIsCreate] = useState(false)
  const dispatch = useAppDispatch()

  const handleAction: HandleActionType = (id, text, caption, status, groupId) => {
    if (status === StatusEnum.Add) {
      if (text.trim().length | caption.trim().length) {
        dispatch(addNote({ caption, text, groupId }))
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

  const handleSubmit = () => {
    setIsCreate(true)
  }

  const handleRemove = (id: string) => {
    dispatch(removeNote({ id }))
  }
  
  useEffect(() => {
    if (!!searchTab) {
      setNotes(filteredNotes)
    }
    if (componentNotes.length !== notes.length && !searchTab) {
      setNotes(notes)
    }
  }, [searchTab, filteredNotes, componentNotes.length, notes])
  
  useEffect(() => {
    setNotes(notes)
  }, [notes])

  if (!componentNotes.length) {
    return (
      <>
        <Flex fontFamily="Inter" justify="space-between" mb="8" fontWeight="500">
          <Text fontSize={['20px', '32px']} lineHeight="10" pl={['6', '0', '0']}>
            Notes
          </Text>
          <CreateNewNote
            groupId={groupId ? groupId : ''}
            variants={variants}
            isCreate={isCreate}
            handleSubmit={handleSubmit}
            handleAction={handleAction}
            handleRemove={handleRemove}
            setIsCreate={setIsCreate}
          />
        </Flex>
        <Text>Notes did not exist</Text>
      </>
    )
  }

  return (
    <Box w="100%">
      <Flex justify="space-between" mb="10">
        <Text
          pl={['6', '0', '0']}
          fontFamily="Inter"
          fontWeight="500"
          fontSize={['20px', '32px']}
          letterSpacing="-0.24px"
          lineHeight="10"
        >
          Notes
        </Text>
        <CreateNewNote
          groupId={groupId ? groupId : ''}
          variants={variants}
          isCreate={isCreate}
          handleSubmit={handleSubmit}
          handleAction={handleAction}
          handleRemove={handleRemove}
          setIsCreate={setIsCreate}
        />
      </Flex>
      <NotesList
        componentNotes={componentNotes}
        groups={groups}
        variants={variants}
        groupId={groupId ? groupId : ''}
        setIsCreate={setIsCreate}
        handleRemove={handleRemove}
        handleAction={handleAction}
      />
    </Box>
  )
}

export default Notes