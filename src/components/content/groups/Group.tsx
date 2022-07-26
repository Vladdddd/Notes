import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { GroupType } from '../../../store/groupSlice'
import { NoteType, setFolderNotes } from '../../../store/noteSlice'
import { VariantsType } from '../Content'
import GroupNotes from '../notes/pages/GroupNotes'

interface PropsType {
  notes: NoteType[]
  groups: GroupType[]
  group: GroupType
  variants: VariantsType
}

export const Group: React.FC<PropsType> = ({ notes, groups, group, variants }) => {
  const dispatch = useAppDispatch()
  const groupNotes = useAppSelector((state) => state.notes.groupNotes)

  useEffect(() => {
    dispatch(setFolderNotes({ id: group.id }))
  }, [dispatch, group, notes])

  return (
    <GroupNotes
      groupTitle={group.title}
      groups={groups}
      groupId={group.id}
      notes={groupNotes}
      variants={variants}
    />
  )
}
