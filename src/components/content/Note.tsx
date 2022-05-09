import { Box } from "@chakra-ui/layout"
import { Button, Input, Textarea } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { NoteType, StatusEnum } from "../../store/noteSlice"
import { HandleActionType } from "./Content"

interface PropsType {
    note: NoteType
    status: StatusEnum
    handleAction: HandleActionType
    setIsCreate: (isCreate: boolean) => void
}

export const Note: React.FC<PropsType> = ({note, status, handleAction, setIsCreate}) => {
    const [text, setText] = useState(note.text)
    const [caption, setCaption] = useState(note.caption)

    const onFocusText = (e: { target: { value: string } }) => {
        const value = e.target.value
        e.target.value = ''
        e.target.value = value
    }

    return (
        <Box>
            <Link to='/'><Box 
                w='full' h='full' 
                pos='absolute' 
                top='0' left='0'
                bg='gray.500'
                opacity='0.5'
                zIndex='99'
                onClick={() => setIsCreate(false)}
            ></Box></Link>

            <Box 
                w='sm' h='xs' 
                pos='absolute' 
                top='24%' left='37%' 
                borderRadius='0'
                bg='white' zIndex='99'
            >
                <Input 
                    border='0' focusBorderColor='0' 
                    placeholder='Caption'
                    fontSize='18px'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}/>
                <Textarea 
                    h='full' 
                    border='0' 
                    borderRadius='0'  
                    focusBorderColor='0' 
                    resize='none' 
                    placeholder='Body' 
                    fontSize='20px'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    autoFocus
                    onFocus={onFocusText}
                />
                <Box width='full' pos='absolute' zIndex='5' bg='white'>
                    <Link to='/'><Button 
                        border='0'
                        float='right' 
                        _focus={{}} 
                        onClick={() => handleAction(note.id, text, caption, status)}
                    >Submit</Button></Link>
                </Box>
            </Box>
        </Box>
    )
}