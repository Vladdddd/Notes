import { useEffect, useState } from 'react'

import { useAppSelector } from '../../../../hooks/redux'
import { NoteType } from '../../../../store/noteSlice'
import { VariantsType } from '../../Content'
import { GroupType } from '../../../../store/groupSlice'

import { NotesList } from '../NotesList'

interface PropsType {
  notes: NoteType[]
  variants: VariantsType
  groups: GroupType[]
  searchTab: string
  groupId?: string
}

const emptyArray: NoteType[] = []
const caption = 'All Notes'
const path = '/notes'

const AllNotes: React.FC<PropsType> = ({ groups, notes, variants, searchTab, groupId }) => {
  const filteredNotes = useAppSelector(searchTab ? (state) => state.notes.filteredNotes : () => emptyArray)
  const [componentNotes, setNotes] = useState(() => notes)

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
  
  return (
    <NotesList
      caption={caption}
      path={path}
      notes={componentNotes}
      groups={groups}
      variants={variants}
      groupId={groupId ? groupId : ''}
    />
  )
}

export default AllNotes
