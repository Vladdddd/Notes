import { Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { lazy, Suspense } from 'react'

import { NoteType } from '../../store/noteSlice'
import { useAppSelector } from '../../hooks/redux'

const Notes = lazy(() => import('./notes/Notes'))
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
}

export const Content: React.FC<PropsType> = ({ notes, searchTab }) => {
  const groups = useAppSelector((state) => state.groups.groups)
  return (
    <Box as="main" w="100%" pt="8" pl={['0', '20']} pr={['0', '20']} pb="24">
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route
            path="/notes/*"
            element={<Notes searchTab={searchTab} groups={groups} notes={notes} variants={variants} />}
          ></Route>
          <Route path="/groups/*" element={<GroupIcons groups={groups} variants={variants} />}></Route>
        </Routes>
        <Groups notes={notes} groups={groups} variants={variants} searchTab={searchTab} />
      </Suspense>
    </Box>
  )
}
