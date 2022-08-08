import { Box } from '@chakra-ui/layout'
import { IconButton, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { StarIcon } from '@chakra-ui/icons'
import { useEffect, useMemo, useState } from 'react'

import { editFavorite, editGroupId, NoteType } from '../../../store/noteSlice'
import { useAppDispatch } from '../../../hooks/redux'
import { GroupType } from '../../../store/groupSlice'
import { RemoveButton } from '../buttons/RemoveButton'
import { VariantsType } from '../Content'

import GroupsMenuList from './GroupsMenuList'

interface PropsType {
  note: NoteType
  variants: VariantsType
  groups: GroupType[]
  handleRemove: (id: string) => void
}

const emptyGroup: GroupType = {
  id: '',
  title: '',
}

const findGroup = (note: NoteType, groups: GroupType[]) => {
  return note.groupId ? groups.find((group: GroupType) => group.id === note.groupId) : emptyGroup
}

const calculateCaption = (caption: string) => {
  return caption.length > 15 ? caption.slice(0, 15) : caption
}

export const Icon: React.FC<PropsType> = ({ groups, note, variants, handleRemove }) => {
  const dispatch = useAppDispatch()
  const [group, setGroup] = useState(emptyGroup)
  const findedGroup = useMemo(() => findGroup(note, groups), [note, groups])
  const caption = useMemo(() => calculateCaption(note.caption), [note.caption])
  const groupTitle = useMemo(() => calculateCaption(group ? group.title : ''), [group])

  useEffect(() => {
    setGroup(findedGroup!)
  }, [findedGroup])

  const handleChange = (value: string | string[]) => {
    dispatch(editGroupId({ id: note.id, groupId: value }))
  }

  const setFavorite = () => dispatch(editFavorite({ id: note.id, isFavorite: !note.isFavorite }))

  return (
    <Box
      as={motion.div}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      w="100%"
      h="100%"
      pos="relative"
    >
      <Link to={note.id}>
        <Box p="6" pt="4" pb="16" w="100%" h="100%" border="1px solid #CBD5E0" borderRadius="5" bg="white">
          <Text
            h={['40%', '30%', '22%']}
            fontFamily="SFMono-Regular,Menlo,Monaco,Consolas,monospace"
            fontSize="17px"
            color="gray.800"
            overflow="hidden"
          >
            {caption} {group && group.title.length ? '- ' + groupTitle : ''}
          </Text>

          <Text h={['60%', '70%', '78%']} fontSize="20px" overflow="hidden">
            {note.text}
          </Text>
        </Box>
      </Link>
      <RemoveButton id={note.id} removeMethod={handleRemove} />
      <Box bottom="5%" left="2%" pos="absolute" opacity="0.9" aria-label="Remove" zIndex="99">
        <GroupsMenuList
          groups={groups}
          groupTitle={groupTitle}
          handleChange={handleChange}
          calculateCaption={calculateCaption}
        />

        <IconButton
          ml="2"
          icon={<StarIcon />}
          aria-label="Set Favorite"
          onClick={setFavorite}
          color={note.isFavorite ? 'gold' : 'white'}
          background="#080721"
          _focus={{}}
          _hover={{}}
        />
      </Box>
    </Box>
  )
}
