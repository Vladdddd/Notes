import { IconButton, Box, Image, Flex } from '@chakra-ui/react'
import { AttachmentIcon, StarIcon, EmailIcon, HamburgerIcon, ChatIcon } from '@chakra-ui/icons'
import { memo, useState } from 'react'

import notes_icon from '../../assets/notes_icon.svg'

import { MenuItem } from './MenuItem'

interface PropsType {}

const Menu: React.FC<PropsType> = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Box pl={['0', '5']} pr={['0', '5']} bg="white" pos={['initial', 'sticky']} top="0" height={['1%', '100vh']}>
      <Flex
        display={['none', 'flex']}
        width={isOpen ? '220px' : 'min-content'}
        justifyContent="flex-start"
        gap="8%"
        mb="10"
        mt="6"
      >
        <IconButton
          aria-label="Hide Menu"
          bg="white"
          color="#90A3BF"
          _focus={{}}
          icon={<HamburgerIcon />}
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        />

        <Image src={notes_icon} width={isOpen ? '75%' : '0%'} />
      </Flex>

      <Box display={['flex', 'block']} justifyContent="space-around" pt={['3', '0']} pb={['3', '0']}>
        <MenuItem caption="Home" isOpen={isOpen} Icon={ChatIcon} path={'/'} />
        <MenuItem caption="Notes" isOpen={isOpen} Icon={EmailIcon} path={'/notes'} />
        <MenuItem caption="Groups" isOpen={isOpen} Icon={AttachmentIcon} path={'/groups'} />
        <MenuItem caption="Favorites" isOpen={isOpen} Icon={StarIcon} path={'/favorites'} />
      </Box>
    </Box>
  )
}

export default memo(Menu)
