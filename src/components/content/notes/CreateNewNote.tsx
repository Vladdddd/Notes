import { AddButton } from "../buttons/AddButton"
import { VariantsType } from "../Content"
import { Text } from "@chakra-ui/layout"
import { AnimatePresence } from "framer-motion"
import { Note } from "./Note"
import { StatusEnum } from "../../../store/noteSlice"
import { HandleActionType } from "./Notes"

const initialNote = {
    id: '',
    text: '',
    caption: ''
}

interface PropsType {
    variants: VariantsType
    isCreate: boolean
    isExist: boolean
    handleSubmit: () => void
    handleAction: HandleActionType
    handleRemove: (id: string) => void
    setIsCreate: (isCreate: boolean) => void
}

export const CreateNewNote: React.FC<PropsType> = (
    { variants, isCreate, isExist, handleSubmit, handleAction, handleRemove, setIsCreate }
) => {
    return (
        <>
            <AddButton addMethod={handleSubmit} text={'Add Note'} />
            {isExist && <Text>Notes did not exist</Text>}
            {isCreate &&
                <AnimatePresence exitBeforeEnter><Note
                    variants={variants}
                    note={initialNote}
                    status={StatusEnum.Add}
                    handleAction={handleAction}
                    setIsCreate={setIsCreate}
                    handleRemove={handleRemove}
                /></AnimatePresence>
            }
        </>
    )
}