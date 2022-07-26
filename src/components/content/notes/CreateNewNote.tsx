import { AnimatePresence } from 'framer-motion'

import { StatusEnum } from '../../../store/noteSlice'
import { AddButton } from '../buttons/AddButton'
import { VariantsType } from '../Content'

import { HandleActionType } from './NotesList'
import { Note } from './Note'

const initialNote = {
  id: '',
  text: '',
  caption: '',
  groupId: '',
  isFavorite: false,
}

interface PropsType {
  path: string
  variants: VariantsType
  isCreate: boolean
  groupId: string
  handleSubmit: () => void
  handleAction: HandleActionType
  handleRemove: (id: string) => void
  setIsCreate: (isCreate: boolean) => void
}

export const CreateNewNote: React.FC<PropsType> = ({
  path,
  variants,
  isCreate,
  groupId,
  handleSubmit,
  handleAction,
  handleRemove,
  setIsCreate,
}) => {
  return (
    <>
      {isCreate && (
        <AnimatePresence exitBeforeEnter>
          <Note
            path={path}
            variants={variants}
            note={initialNote}
            groupId={groupId ? groupId : ''}
            status={StatusEnum.Add}
            handleAction={handleAction}
            setIsCreate={setIsCreate}
            handleRemove={handleRemove}
          />
        </AnimatePresence>
      )}
      <AddButton addMethod={handleSubmit} text={'Add Note'} />
    </>
  )
}
