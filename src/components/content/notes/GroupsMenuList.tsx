import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import { UpDownIcon } from '@chakra-ui/icons'

import { GroupType } from '../../../store/groupSlice'

interface PropsType {
  groups: GroupType[]
  groupTitle?: string
  handleChange: (value: string | string[]) => void
  calculateCaption: (caption: string) => string
}

const GroupsMenuList: React.FC<PropsType> = ({ groups, groupTitle, handleChange, calculateCaption }) => {
  return (
    <Menu closeOnSelect={true}>
      <MenuButton as={Button} bg="#080721" color="white" _focus={{}} _hover={{}}>
        <UpDownIcon />
      </MenuButton>

      <MenuList ml="25%">
        <MenuOptionGroup
          defaultValue={groupTitle ? groupTitle : ''}
          title="Groups"
          type="radio"
          onChange={(value: string | string[]) => handleChange(value)}
        >
          {groups.map((group: GroupType) => {
            return (
              <MenuItemOption value={group.id} key={group.id}>
                {calculateCaption(group.title)}
              </MenuItemOption>
            )
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default GroupsMenuList
