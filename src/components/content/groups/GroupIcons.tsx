import { Box, Flex, Text } from '@chakra-ui/layout'
import { Route, Routes } from 'react-router-dom'

import { useAppDispatch } from '../../../hooks/redux'
import { addGroup, GroupType } from '../../../store/groupSlice'
import { AddButton } from '../buttons/AddButton'
import { VariantsType } from '../Content'

import { GroupIcon } from './GroupIcon'

interface PropsType {
  variants: VariantsType
  groups: GroupType[]
}

const GroupIcons: React.FC<PropsType> = ({ groups, variants }) => {
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    dispatch(addGroup({ title: 'New Group' }))
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Box>
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
                  Groups
                </Text>
                <AddButton text={'Add Group'} addMethod={handleSubmit} />
              </Flex>
              {!groups.length ? <Text ml="1%" mt="4%" fontSize="20px" fontWeight="600">Groups don't exist</Text> : ''}
              <Flex justifyContent={['center', 'flex-start' ,'flex-start']} flexWrap="wrap" mt="5" gap="8">
                {groups.map((group) => (
                  <GroupIcon group={group} variants={variants} key={group.id} />
                ))}
              </Flex>
            </Box>
          }
        ></Route>
      </Routes>
    </>
  )
}

export default GroupIcons
