import { Box, Flex, Text } from '@chakra-ui/layout'

import { VariantsType } from '../Content'
import { NoteType } from '../../../store/noteSlice'

import { CreateNewNote } from './CreateNewNote'
import { HandleActionType } from './NotesList'

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
  if (!notes.length) {
    return (
      <>
        <Flex fontFamily="Inter" justify="space-between" mb="10" fontWeight="500">
          <Text fontSize={['20px', '32px']} lineHeight="10" pl={['6', '0', '0']}>
            {caption}
          </Text>
          <CreateNewNote
            path={path}
            groupId={groupId ? groupId : ''}
            variants={variants}
            isCreate={isCreate}
            handleSubmit={handleSubmit}
            handleAction={handleAction}
            handleRemove={handleRemove}
            setIsCreate={setIsCreate}
          />
        </Flex>
        <Text>Notes do not exist</Text>
      </>
    )
  }

  return (
    <Box w="100%">
      <Flex justify="space-between" mb="10">
        <Text
          pl={['6', '0', '0']}
          fontFamily="Inter"
          fontWeight="500"
          fontSize={['20px', '32px']}
          letterSpacing="-0.24px"
          lineHeight="10"
        >
          {caption}
        </Text>
        <CreateNewNote
          path={path}
          groupId={groupId ? groupId : ''}
          variants={variants}
          isCreate={isCreate}
          handleSubmit={handleSubmit}
          handleAction={handleAction}
          handleRemove={handleRemove}
          setIsCreate={setIsCreate}
        />
      </Flex>
    </Box>
  )
}
