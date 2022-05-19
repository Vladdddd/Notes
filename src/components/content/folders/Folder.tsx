import { Box } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useAppDispatch } from "../../../hooks/redux"
import { editFolder, FolderType, removeFolder } from "../../../store/folderSlice"
import { RemoveButton } from "../buttons/RemoveButton"
import { VariantsType } from "../Content"

interface PropsType {
    folder: FolderType
    variants: VariantsType
}

export const Folder: React.FC<PropsType> = ({ folder, variants }) => {
    const dispatch = useAppDispatch()

    const handleChange = (title: string) => {
        dispatch(editFolder({ id: folder.id, title }))
    }

    const handleRemove = (id: string) => {
        dispatch(removeFolder({ id }))
    }

    return (
        <Box
            as={motion.div}
            variants={variants}
            initial={'hidden'}
            animate={'visible'}
            exit={'hidden'}
            w='21%' h='28'
            border='1px solid #CBD5E0' borderRadius='5'
            pos='relative'

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
                onChange={(e) => handleChange(e.target.value)}
            />
            <RemoveButton id={folder.id} removeMethod={handleRemove} />
        </Box>
    )
}