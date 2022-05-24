import { Box, Flex, Text } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { Link, Route, Routes } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { addFolder, editFolder, FolderType, removeFolder } from "../../../store/folderSlice"
import { setFolderNotes } from "../../../store/noteSlice"
import { RemoveButton } from "../buttons/RemoveButton"
import { VariantsType } from "../Content"
import { Notes } from "../notes/Notes"

interface PropsType {
    folder: FolderType
    variants: VariantsType
}

export const FolderIcon: React.FC<PropsType> = ({ folder, variants }) => {
    const dispatch = useAppDispatch()

    const handleChange = (title: string) => {
        dispatch(editFolder({ id: folder.id, title }))
    }

    const handleRemove = (id: string) => {
        dispatch(removeFolder({ id }))
    }

    useEffect(() => {
        dispatch(setFolderNotes({ name: folder.title }))
    }, [])

    return (
        <>
            <Box 
                w='20%' h='28' 
                pos='relative'
                border='1px solid #CBD5E0' 
                borderRadius='5'
            >
                <Link to={'/' + folder.id}>
                    <Box
                        w='full' h='full'
                        pos='absolute'
                        zIndex='1'
                    >
                    </Box>
                </Link>

                <Box
                    as={motion.div}
                    variants={variants}
                    initial={'hidden'}
                    animate={'visible'}
                    exit={'hidden'}
                    w='full' h='max-content'
                    pos='relative'
                    zIndex='1'
                >
                    <Textarea
                        color='black'
                        minH='12'
                        mt='2' pb='0'
                        border='0' focusBorderColor='0'
                        resize='none'
                        placeholder='Title'
                        fontSize='21px'
                        value={folder.title}
                        zIndex='99'
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <RemoveButton id={folder.id} removeMethod={handleRemove} />
                </Box>

            </Box>
        </>
    )
}