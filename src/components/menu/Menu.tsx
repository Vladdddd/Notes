import { IconButton, Box } from '@chakra-ui/react'
import { AttachmentIcon, CheckCircleIcon, EmailIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useState } from 'react'

import { NoteType } from '../../store/noteSlice'

import { MenuItem } from './MenuItem'

interface PropsType {
  notes: NoteType[]
}

export const Menu: React.FC<PropsType> = ({ notes }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box pl="5" pr="5" bg="#080721" color="white" pos={['initial', 'sticky']} top="0" height={['1%', '100vh']}>
      <IconButton
        display={['none', 'block']}
        mb="8"
        mt="6"
        aria-label="Hide Menu"
        bg="white"
        width="8"
        color="#080721"
        _focus={{}}
        icon={<HamburgerIcon />}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      />
      <Box
        display={['flex', 'block']}
        justifyContent="space-between"
        pt={['3', '0']}
        pb={['3', '0']}
      >
        <MenuItem caption="All notes" isOpen={isOpen} Icon={EmailIcon} path={'/notes'} />
        <MenuItem caption="Folders" isOpen={isOpen} Icon={AttachmentIcon} path={'/groups'} />
        <MenuItem caption="Favorite notes" isOpen={isOpen} Icon={CheckCircleIcon} path={'/'} />
      </Box>
    </Box>
  )
}
