import { NoteType } from '../../../../store/noteSlice'
import { VariantsType } from '../../Content'
import { GroupType } from '../../../../store/groupSlice'

import { NotesList } from '../NotesList'

interface PropsType {
  notes: NoteType[]
  variants: VariantsType
  groups: GroupType[]
  groupId?: string
}

const caption = 'Favorites'
const path = '/favorites'

const FavNotes: React.FC<PropsType> = ({ notes, groups, variants, groupId }) => {
  const componentNotes = notes.filter((note: NoteType) => note.isFavorite === true)

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

export default FavNotes