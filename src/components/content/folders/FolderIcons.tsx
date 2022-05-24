import { Flex, Text } from "@chakra-ui/layout"
import { Route, Routes } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { addFolder, FolderType } from "../../../store/folderSlice"
import { AddButton } from "../buttons/AddButton"
import { VariantsType } from "../Content"
import { FolderIcon } from "./FolderIcon"

interface PropsType {
    variants: VariantsType
    folders: FolderType[]
}

export const FolderIcons: React.FC<PropsType> = ({ folders, variants }) => {
    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        dispatch(addFolder({ title: 'New Folder' }))
    }

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<>
                        <AddButton text={"Add Folder"} addMethod={handleSubmit} />
                        {!folders.length && <Text>Folders did not exist</Text>}
                        <Flex justifyContent='flex-start' flexWrap='wrap' mt='5' gap='8'>
                            {
                                folders.map((folder) => (
                                    <FolderIcon folder={folder} variants={variants} key={folder.id} />
                                ))
                            }
                        </Flex>
                    </>}
                >
                </Route>
            </Routes>
        </>
    )
}

