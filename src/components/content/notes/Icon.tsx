import { Box } from "@chakra-ui/layout"
import { Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { NoteType } from "../../../store/noteSlice"
import { RemoveButton } from "../buttons/RemoveButton"
import { motion } from "framer-motion"
import { VariantsType } from "../Content"

interface PropsType {
    note: NoteType
    variants: VariantsType
    handleRemove: (id: string) => void 
}

export const Icon: React.FC<PropsType> = ({ note, variants, handleRemove }) => {
    
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
                >{note.caption}</Text>

                <Text 
                    h={['60%', '70%', '78%']} 
                    fontSize='20px'
                    overflow='hidden'
                >{note.text}</Text>
            </Box></Link>
            <RemoveButton id={note.id} removeMethod={handleRemove}/>
        </Box>
    )
}