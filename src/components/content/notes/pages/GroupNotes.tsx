import { NoteType } from '../../../../store/noteSlice'
import { VariantsType } from '../../Content'
import { GroupType } from '../../../../store/groupSlice'

import { NotesList } from '../NotesList'

interface PropsType {
  notes: NoteType[]
  variants: VariantsType
  groups: GroupType[]
  groupId: string
  groupTitle: string
}

const GroupNotes: React.FC<PropsType> = ({ groups, notes, variants, groupId, groupTitle }) => {
  const caption = groupTitle + ' notes'
  const path = '/' + groupId

  return (
    <NotesList
      caption={caption}
      path={path}
      notes={notes}
      groups={groups}
      variants={variants}
      groupId={groupId}
    />
  )
}

export default GroupNotes