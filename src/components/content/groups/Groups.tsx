import { Route, Routes } from 'react-router-dom'

import { GroupType } from '../../../store/groupSlice'
import { NoteType } from '../../../store/noteSlice'
import { VariantsType } from '../Content'

import { Group } from './Group'

interface PropsType {
  notes: NoteType[]
  groups: GroupType[]
  variants: VariantsType
  searchTab: string
}

const Groups: React.FC<PropsType> = ({ notes, groups, variants, searchTab }) => {
  return (
    <Routes>
      {groups.map((group) => (
        <Route
          path={group.id + '/*'}
          key={group.id}
          element={<Group notes={notes} searchTab={searchTab} groups={groups} group={group} variants={variants} />}
        ></Route>
      ))}
    </Routes>
  )
}

export default Groups
