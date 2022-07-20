import { Box, Flex } from '@chakra-ui/layout'
import { Route, Routes } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import { VariantsType } from '../Content'
import { GroupType } from '../../../store/groupSlice'
import { NoteType, StatusEnum } from '../../../store/noteSlice'

import { Icon } from './Icon'
import { Note } from './Note'
import { HandleActionType } from './Notes'

interface PropsType {
  componentNotes: NoteType[]
  variants: VariantsType
  groups: GroupType[]
  groupId?: string
  setIsCreate: (isCreate: boolean) => void
  handleRemove: (id: string) => void
  handleAction: HandleActionType
}

export const NotesList: React.FC<PropsType> = ({
  componentNotes,
  groups,
  variants,
  groupId,
  setIsCreate, 
  handleRemove,
  handleAction,
}) => {
  const location = useLocation()
  
  return (
    <Flex w="100%" flexWrap="wrap" mt="5" justify={['center', 'start', 'start']}>
      {componentNotes.map((note: NoteType) => (
        <Box w={['85%', '45%', '30.3%']} mb="3%" mr="3%" h="40" key={note.id}>
          <Icon groups={groups} note={note} variants={variants} handleRemove={handleRemove}/>
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
              <Route
                path={note.id}
                element={
                  <Note
                    groupId={groupId ? groupId : ''}
                    path={groupId ? '/' + groupId : '/notes'}
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
      ))}
    </Flex>
  )
}
