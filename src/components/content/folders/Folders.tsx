import { Flex, Text } from "@chakra-ui/layout"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { addFolder } from "../../../store/folderSlice"
import { AddButton } from "../buttons/AddButton"
import { VariantsType } from "../Content"
import { Folder } from "./Folder"

interface PropsType {
    variants: VariantsType
}

export const Folders: React.FC<PropsType> = ({ variants }) => {
    const dispatch = useAppDispatch()
    const folders = useAppSelector(state => state.folders.folders)

    const handleSubmit = () => {
        dispatch(addFolder({title: 'New Folder'}))
    }

    return (
        <>
            <AddButton text={"Add Folder"} addMethod={handleSubmit} />
            {!folders.length && <Text>Folders did not exist</Text>}
            <Flex justifyContent='flex-start' flexWrap='wrap' mt='5' gap='8'>
                {
                    folders.map((folder) => {
                        return <Folder variants={variants} folder={folder} key={folder.id}/>
                    })
                }
            </Flex>
        </>
    )
}
