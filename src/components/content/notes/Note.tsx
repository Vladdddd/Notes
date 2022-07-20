import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Box, Flex, Text } from '@chakra-ui/layout'
import { Button, Textarea } from '@chakra-ui/react'

import { NoteType, StatusEnum } from '../../../store/noteSlice'
import { RemoveButton } from '../buttons/RemoveButton'
import { VariantsType } from '../Content'

import { HandleActionType } from './Notes'

interface PropsType {
  note: NoteType
  status: StatusEnum
  variants: VariantsType
  path: string
  groupId: string | undefined
  handleAction: HandleActionType
  setIsCreate: (isCreate: boolean) => void
  handleRemove: (id: string) => void
}

export const Note: React.FC<PropsType> = ({
  note,
  status,
  variants,
  path,
  groupId,
  handleAction,
  setIsCreate,
  handleRemove,
}) => {
  const [text, setText] = useState(note.text)
  const [caption, setCaption] = useState(note.caption)
  const creationDate = note.id.length
    ? 'Created: ' + note.id.slice(0, 10) + ', ' + note.id.slice(11, note.id.length - 5)
    : ''

  const onFocusText = (e: { target: { value: string } }) => {
    const value = e.target.value
    e.target.value = ''
    e.target.value = value
  }

  return (
    <Box>
      <Link to={path}>
        <Box
          w="100%"
          h="100%"
          pos="absolute"
          top="0"
          left="0"
          bg="gray.500"
          opacity="0.55"
          zIndex="100"
          onClick={() => setIsCreate(false)}
        ></Box>
      </Link>
      <Box
        as={motion.div}
        variants={variants}
        initial={'hidden'}
        animate={'visible'}
        exit={'hidden'}
        w={['85%', '40%']}
        pos="absolute"
        top={['10%', '24%']}
        left={['7.5%', '30%']}
        borderTopRadius="8"
        bg="white"
        zIndex="100"
      >
        <Textarea
          color="black"
          minH="12"
          mt="2"
          pb="0"
          border="0"
          focusBorderColor="0"
          resize="none"
          placeholder="Caption"
          fontSize="21px"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Link to={path}>
          <RemoveButton id={note.id} removeMethod={handleRemove} />
        </Link>
        <Textarea
          color="black"
          minH="48"
          mb="2"
          pt="0"
          border="0"
          borderRadius="0"
          focusBorderColor="0"
          resize="none"
          placeholder="Body"
          fontSize="17px"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          onFocus={onFocusText}
        />
        <Flex
          width="full"
          justify="space-between"
          align="center"
          pos="absolute"
          zIndex="100"
          bg="white"
          borderBottomRadius="8"
        >
          <Text align="center" ml="2" color="gray.800" fontSize="13px">
            {creationDate}
          </Text>
          <Link to={path}>
            <Button
              fontSize="15px"
              border="0"
              _focus={{}}
              onClick={() => handleAction(note.id, text, caption, status, groupId ? groupId : '')}
            >
              Submit
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  )
}
