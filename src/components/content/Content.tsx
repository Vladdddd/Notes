import { Route, Routes } from 'react-router-dom'
import { Box, Text } from '@chakra-ui/react'
import { lazy, Suspense } from 'react'

import { NoteType } from '../../store/noteSlice'
import { GroupType } from '../../store/groupSlice'

import FavNotes from './notes/pages/FavNotes'

const AllNotes = lazy(() => import('./notes/pages/AllNotes'))
const Groups = lazy(() => import('./groups/Groups'))
const GroupIcons = lazy(() => import('./groups/GroupIcons'))

const variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
}

export type VariantsType = typeof variants

interface PropsType {
  notes: NoteType[]
  searchTab: string
  groups: GroupType[]
}

export const Content: React.FC<PropsType> = ({ notes, searchTab, groups }) => {
  return (
    <Box as="main" w="100%" pt="6" pl={['0', '14']} pr={['0', '14']} pb="24">
      <Suspense fallback={<Text ml="1%" mt="4%" fontSize="20px" fontWeight="600">loading...</Text>}>
        <Routes>
          <Route
            path="/notes/*"
            element={<AllNotes searchTab={searchTab} groups={groups} notes={notes} variants={variants} />}
          ></Route>
          <Route path="/groups/*" element={<GroupIcons groups={groups} variants={variants} />}></Route>
          <Route path="/favorites/*" element={<FavNotes notes={notes} groups={groups} variants={variants} />}></Route>
        </Routes>
        <Groups notes={notes} groups={groups} variants={variants} />
      </Suspense>
    </Box>
  )
}
