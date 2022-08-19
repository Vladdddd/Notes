import { Box } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../../hooks/redux'
import { editGroup, GroupType, removeGroup } from '../../../store/groupSlice'
import { setFolderNotes } from '../../../store/noteSlice'
import { RemoveButton } from '../buttons/RemoveButton'
import { VariantsType } from '../Content'

interface PropsType {
  group: GroupType
  variants: VariantsType
}

export const GroupIcon: React.FC<PropsType> = ({ group, variants }) => {
  const dispatch = useAppDispatch()

  const handleChange = (title: string) => {
    dispatch(editGroup({ id: group.id, title }))
  }

  const handleRemove = (id: string) => {
    dispatch(removeGroup({ id }))
  }

  useEffect(() => {
    dispatch(setFolderNotes({ id: group.id }))
  }, [])

  return (
    <>
      <Box w={['85%', '20%', '20%']} h="28" pos="relative" bg="white" borderRadius="12">
        <Box
          as={motion.div}
          variants={variants}
          initial={'hidden'}
          animate={'visible'}
          exit={'hidden'}
          w="100%"
          h="100%"
          pos="relative"
          zIndex="1"
        >
          <Box height="50%" bg="#3563E9" borderTopLeftRadius="12" borderTopRightRadius="12">
            <Textarea
              textAlign="center"
              color="white"
              minH="12"
              mt="2"
              pb="0"
              border="0"
              focusBorderColor="0"
              resize="none"
              placeholder="Title"
              fontSize="21px"
              value={group.title}
              zIndex="99"
              onChange={(e) => handleChange(e.target.value)}
            />
            <RemoveButton id={group.id} removeMethod={handleRemove} />
          </Box>
          <Link to={'/' + group.id}><Box width="100%" height="50%"></Box></Link>
        </Box>
      </Box>
    </>
  )
}
