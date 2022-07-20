import { AnimatePresence } from 'framer-motion'

import { StatusEnum } from '../../../store/noteSlice'
import { AddButton } from '../buttons/AddButton'
import { VariantsType } from '../Content'

import { HandleActionType } from './Notes'
import { Note } from './Note'

const initialNote = {
  id: '',
  text: '',
  caption: '',
  groupId: '',
}

interface PropsType {
  variants: VariantsType
  isCreate: boolean
  groupId: string
  handleSubmit: () => void
  handleAction: HandleActionType
  handleRemove: (id: string) => void
  setIsCreate: (isCreate: boolean) => void
}

export const CreateNewNote: React.FC<PropsType> = ({
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
            path={groupId ? '/' + groupId : '/notes'}
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
