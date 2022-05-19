import { IconButton, Box } from "@chakra-ui/react"
import { AttachmentIcon, CheckCircleIcon, EmailIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useState } from "react"
import { NoteType } from "../../store/noteSlice"
import { MenuItem } from "./MenuItem"
interface PropsType {
    notes: NoteType[]
}

export const Menu: React.FC<PropsType> = ({ notes }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Box 
            pl='6' pr='6' 
            bg='cyan.500' 
            color='white' 
            pos='sticky' 
            top='0'
            height='100vh'
        >
            <IconButton
                mb='8' mt='6'
                aria-label='Hide Menu'
                bg='white'
                width='10'
                color='cyan.500'
                _focus={{}}
                icon={<HamburgerIcon />}
                onClick={() => { setIsOpen(!isOpen) }}
            />

            <MenuItem caption='All notes' isOpen={isOpen} Icon={EmailIcon} path={'/notes'}/>
            <MenuItem caption='Folders' isOpen={isOpen} Icon={AttachmentIcon} path={'/folders'}/>
            <MenuItem caption='Favorite notes' isOpen={isOpen} Icon={CheckCircleIcon} path={'/'}/>
        </Box>
    )
}
