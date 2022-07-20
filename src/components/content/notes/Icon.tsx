import { Box } from '@chakra-ui/layout'
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UpDownIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'

import { editGroupId, NoteType } from '../../../store/noteSlice'
import { useAppDispatch } from '../../../hooks/redux'
import { GroupType } from '../../../store/groupSlice'
import { RemoveButton } from '../buttons/RemoveButton'
import { VariantsType } from '../Content'

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

export const Icon: React.FC<PropsType> = ({ groups, note, variants, handleRemove }) => {
  const dispatch = useAppDispatch()
  const [group, setGroup] = useState(emptyGroup)
  const findedGroup = note.groupId ? groups.find((group: GroupType) => group.id === note.groupId) : emptyGroup
  //useMemo

  useEffect(() => {
    setGroup(findedGroup!)
  }, [findedGroup])

  const handleChange = (value: string | string[]) => {
    dispatch(editGroupId({ id: note.id, groupId: value }))
  }

  return (
    <Box
      as={motion.div}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      w="full"
      h="full"
      pos="relative"
    >
      <Link to={note.id}>
        <Box p="5" pt="3" w="full" h="full" border="1px solid #CBD5E0" borderRadius="5" bg="white">
          <Text
            h={['40%', '30%', '22%']}
            fontFamily="SFMono-Regular,Menlo,Monaco,Consolas,monospace"
            fontSize="17px"
            color="gray.800"
            overflow="hidden"
          >
            {note.caption} {group.title.length ? '- ' + group.title : ''}
          </Text>

          <Text h={['60%', '70%', '78%']} fontSize="20px" overflow="hidden">
            {note.text}
          </Text>
        </Box>
      </Link>
      <RemoveButton id={note.id} removeMethod={handleRemove} />

      <Box bottom="5%" left="2%" pos="absolute" opacity="0.9" aria-label="Remove" zIndex="99">
        <Menu closeOnSelect={true}>
          <MenuButton as={Button} bg="#080721" color="white" _focus={{}} _hover={{}}>
            <UpDownIcon />
          </MenuButton>

          <MenuList ml="25%">
            <MenuOptionGroup
              defaultValue={group ? group.title : ''}
              title="Groups"
              type="radio"
              onChange={(value: string | string[]) => handleChange(value)}
            >
              {groups.map((group: GroupType) => {
                return (
                  <MenuItemOption value={group.id} key={group.id}>
                    {group.title}
                  </MenuItemOption>
                )
              })}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  )
}
