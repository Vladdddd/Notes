import { Box, Flex, Text } from '@chakra-ui/layout'
import { AnimatePresence } from 'framer-motion'

import { VariantsType } from '../Content'
import { NoteType } from '../../../store/noteSlice'
import { StatusEnum } from '../../../store/noteSlice'
import { AddButton } from '../buttons/AddButton'

import { HandleActionType } from './NotesList'
import { Note } from './Note'


interface PropsType {
  path: string
  caption: string
  notes: NoteType[]
  variants: VariantsType
  groupId?: string
  isCreate: boolean
  setIsCreate: (value: boolean) => void
  handleSubmit: () => void
  handleAction: HandleActionType
  handleRemove: (id: string) => void
}

const initialNote = {
  id: '',
  text: '',
  caption: '',
  groupId: '',
  isFavorite: false,
}

export const CreationPanel: React.FC<PropsType> = ({
  path,
  notes,
  variants,
  groupId,
  isCreate,
  caption,
  setIsCreate,
  handleSubmit,
  handleAction,
  handleRemove,
}) => {
  return (
    <Box w="100%">
      <Flex justify="space-between" mb="10" w="100%" p="6" bg="#3563E9" borderRadius="8">
        <Text
          pl={['4', '0', '0']}
          fontFamily="Inter"
          fontWeight="500"
          fontSize={['16px', '28px']}
          letterSpacing="-0.24px"
          lineHeight="10"
          color="white"
        >
          {caption}
        </Text>
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
      </Flex>
      {!notes.length ? <Text ml="1%" mt="4%" fontSize="20px" fontWeight="600">Notes don't exist</Text> : ''}
    </Box>
  )
}
