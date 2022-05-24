import { Box } from "@chakra-ui/layout"
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { editFolderForNote, NoteType } from "../../../store/noteSlice"
import { RemoveButton } from "../buttons/RemoveButton"
import { motion } from "framer-motion"
import { VariantsType } from "../Content"
import { UpDownIcon } from "@chakra-ui/icons"
import { useAppDispatch } from "../../../hooks/redux"
import { FolderType } from "../../../store/folderSlice"

interface PropsType {
    note: NoteType
    variants: VariantsType
    folders: FolderType[]
    handleRemove: (id: string) => void
}

export const Icon: React.FC<PropsType> = ({ folders, note, variants, handleRemove }) => {
    const dispatch = useAppDispatch()
    const handleChange = (value: string | string[]) => {
        console.log(value)
        dispatch(editFolderForNote({id: note.id, folder: value}))
    }
    return (
        <Box
            as={motion.div}
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            w='full' h='full'
            pos='relative'
            zIndex='1'
        >
            <Link to={note.id}><Box
                p='5' pt='3'
                w='full' h='full'
                border='1px solid #CBD5E0' borderRadius='5'
                bg='white'
            >
                <Text
                    h={['40%', '30%', '22%']}
                    fontFamily='SFMono-Regular,Menlo,Monaco,Consolas,monospace'
                    fontSize='17px'
                    color='gray.800'
                    overflow='hidden'
                >{note.caption} - {note.folder}</Text>

                <Text
                    h={['60%', '70%', '78%']}
                    fontSize='20px'
                    overflow='hidden'
                >{note.text}</Text>
            </Box></Link>
            <RemoveButton id={note.id} removeMethod={handleRemove} />

            <Box
                bottom='5%'
                right='2%'
                pos='absolute'
                opacity='0.8'
                aria-label='Remove'
                zIndex='99'
            >
                <Menu closeOnSelect={false}>
                    <MenuButton as={Button} colorScheme='blue' _focus={{}}>
                        <UpDownIcon/>
                    </MenuButton>
                    <MenuList minW='240px'>
                        <MenuOptionGroup defaultValue={note.folder} title='Folders' type='radio' onChange={(value: string | string[]) => handleChange(value)}>
                            {folders.map((folder: FolderType) => {
                                return <MenuItemOption value={folder.title} key={folder.id}>{folder.title}</MenuItemOption>
                            })}
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
            </Box>
        </Box>
    )
}
