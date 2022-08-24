import { Button, Flex, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Text } from '@chakra-ui/react'
import { UpDownIcon } from '@chakra-ui/icons'

import { GroupType } from '../../../store/groupSlice'

interface PropsType {
  groups: GroupType[]
  groupTitle?: string
  handleChange: (value: string | string[]) => void
  cutText: (caption: string, value: number) => string
}

const GroupsMenuList: React.FC<PropsType> = ({ groups, groupTitle, handleChange, cutText }) => {
  return (
    <Menu closeOnSelect={true}>
      <MenuButton as={Button} size="sm" bg="#3563E9" color="white" _focus={{}} _hover={{}}>
        <Flex alignItems="center">
          <UpDownIcon />
          <Text ml="1" fontSize={['12px', '16px']}>Group</Text>
        </Flex>
      </MenuButton>

      <MenuList ml="10%">
        <MenuOptionGroup
          defaultValue={groupTitle ? groupTitle : ''}
          title="Groups"
          type="radio"
          onChange={(value: string | string[]) => handleChange(value)}
        >
          {groups.map((group: GroupType) => {
            return (
              <MenuItemOption value={group.id} key={group.id}>
                {cutText(group.title, 15)}
              </MenuItemOption>
            )
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default GroupsMenuList
