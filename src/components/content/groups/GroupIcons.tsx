import { Flex, Text } from '@chakra-ui/layout'
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
            <>
              <Flex justify="space-between" mb="10">
                <Text
                  pl={['6', '0', '0']}
                  fontFamily="Inter"
                  fontWeight="500"
                  fontSize={['20px', '32px']}
                  letterSpacing="-0.24px"
                  lineHeight="10"
                >
                  Groups
                </Text>
                <AddButton text={'Add Group'} addMethod={handleSubmit} />
              </Flex>
              {!groups.length ? <Text>Groups do not exist</Text> : ''}
              <Flex justifyContent={['center', 'flex-start' ,'flex-start']} flexWrap="wrap" mt="5" gap="8">
                {groups.map((group) => (
                  <GroupIcon group={group} variants={variants} key={group.id} />
                ))}
              </Flex>
            </>
          }
        ></Route>
      </Routes>
    </>
  )
}

export default GroupIcons
