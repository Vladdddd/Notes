import { Text, Flex, IconButton, Box } from "@chakra-ui/react"
import { EmailIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useState } from "react"
import { NoteType } from "../../store/noteSlice"

interface PropsType {
    notes: NoteType[]
}

export const Menu: React.FC<PropsType> = ({ notes }) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <Box boxShadow='base'>
            <Flex
                as='nav' p='4'
                w={isOpen ? '2xs' : '100%'}
                justify={isOpen ? 'center' : 'flex-start'}
                direction={isOpen ? 'row' : 'column'}
            >
                <IconButton
                    mb='2'
                    aria-label='My Notes'
                    colorScheme='cyan'
                    size='md'
                    color='white'
                    _focus={{}}
                    icon={<EmailIcon />}
                />

                {isOpen && <Text pl='1.5' w='full' h='max-content' fontSize='2xl'>My Notes</Text>}
                <IconButton
                    aria-label='Hide Menu'
                    size='md'
                    _focus={{}}
                    icon={<HamburgerIcon />}
                    onClick={() => { setIsOpen(!isOpen) }}
                />
            </Flex>
            
            {/*<Box pl='4'>
                {notes.map((note: any) => <Text key={note.id}>{ isOpen ? note.caption : note.caption.slice(0, 1)}</Text>)}
            </Box>*/}
        </Box>

    )
}
