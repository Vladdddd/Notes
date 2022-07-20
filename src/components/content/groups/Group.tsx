import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { GroupType } from '../../../store/groupSlice'
import { NoteType, setFolderNotes } from '../../../store/noteSlice'
import { VariantsType } from '../Content'
import Notes from '../notes/Notes'

interface PropsType {
  notes: NoteType[]
  groups: GroupType[]
  group: GroupType
  variants: VariantsType
  searchTab: string
}

export const Group: React.FC<PropsType> = ({ notes, groups, group, variants, searchTab }) => {
  const dispatch = useAppDispatch()
  const folderNotes = useAppSelector((state) => state.notes.folderNotes)

  useEffect(() => {
    dispatch(setFolderNotes({ id: group.id }))
  }, [dispatch, group, notes])

  return (
    <Notes
      searchTab={searchTab}
      groups={groups}
      groupId={group.id}
      notes={folderNotes}
      variants={variants}
    />
  )
}
