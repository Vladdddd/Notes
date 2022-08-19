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

const calculateWords = (text: string) => {
  return text.split(' ').filter((word) => word !== '' && word !== '\n').length
}

export const Icon: React.FC<PropsType> = ({ groups, note, variants, handleRemove }) => {
  const dispatch = useAppDispatch()
  const [group, setGroup] = useState(emptyGroup)

  const findedGroup = useMemo(() => findGroup(note, groups), [note, groups])
  const caption = useMemo(() => calculateCaption(note.caption), [note.caption])
  const groupTitle = useMemo(() => calculateCaption(group ? group.title : ''), [group])
  const words = useMemo(() => calculateWords(note.text ? note.text : ''), [note.text])

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
      boxShadow="rgba(149, 157, 165, 0.01) 0px 8px 24px"
    >
      <Link to={note.id}>
        <Box p="6" pt="4" pb="16" w="100%" h="100%" borderRadius="5" bg="white">
          <Text
            h="max-content"
            fontSize={['17px', '19px', '21px', '23px']}
            fontWeight="600"
            letterSpacing="0.03em"
            color="gray.900"
            overflow="hidden"
          >
            {caption}
          </Text>
          {group && group.title.length ? (
            <Text color="#90A3BF" fontSize={['11px', '13px', '15px', '17px']}>
              {groupTitle}
            </Text>
          ) : (
            ''
          )}
        </Box>
      </Link>
      <RemoveButton id={note.id} removeMethod={handleRemove} />
      <Box pos="absolute" bottom="9%" left="5%">
        <Text fontWeight="700" color="#1A202C" fontSize={['11px', '13px', '16px']}>
          {words} word{words > 1 ? 's' : ''}
        </Text>
      </Box>
      <Box pos="absolute" bottom="6.5%" right="4%" opacity="0.9" aria-label="Bottom Panel" zIndex="100">
        <GroupsMenuList
          groups={groups}
          groupTitle={groupTitle}
          handleChange={handleChange}
          calculateCaption={calculateCaption}
        />

        <IconButton
          ml="2"
          size="sm"
          icon={<StarIcon />}
          aria-label="Set Favorite"
          onClick={setFavorite}
          color={note.isFavorite ? 'gold' : 'white'}
          background="#3563E9"
          _focus={{}}
          _hover={{}}
        />
      </Box>
    </Box>
  )
}
