import { Box, Flex, Input } from "@chakra-ui/react"
import { useAppDispatch } from "../../hooks/redux"
import { NoteType, setFilteredNotes, setSearchTab } from "../../store/noteSlice"
import {debounce} from 'lodash'
import { useEffect, useRef } from "react"

interface PropsType {
    notes: NoteType[]
    searchTab: string
}

export const Header: React.FC<PropsType> = ({notes, searchTab}) => {
    const dispatch = useAppDispatch()

    const debouncedSearch = useRef(
        debounce((searchTab) => {
            dispatch(setFilteredNotes({ searchTab }))
        }, 300)
    ).current

    useEffect(() => {
        debouncedSearch(searchTab)
        return () => {
            debouncedSearch.cancel()
        };
    }, [notes, searchTab, debouncedSearch])

    return (
        <Flex mb={2} p={3} w='full' justify='center' bg='white'>
            <Box as='header' w='3xl'>
                <Input 
                    h='12' 
                    variant='filled' 
                    placeholder='Search your note' 
                    _focus={{}}
                    value={searchTab}
                    onChange={(e) => dispatch(setSearchTab({term: e.target.value}))}
                    />
            </Box>
        </Flex>
    )
}

