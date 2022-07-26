import { Box, Flex, Input } from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/redux'
import { NoteType, setFilteredNotes, setSearchTab } from '../../store/noteSlice'

interface PropsType {
  notes: NoteType[]
  searchTab: string
}

export const Header: React.FC<PropsType> = ({ notes, searchTab }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const debouncedSearch = useRef(
    debounce((searchTab) => {
      dispatch(setFilteredNotes({ searchTab }))
    }, 300),
  ).current

  useEffect(() => {
    debouncedSearch(searchTab)
    return () => {
      debouncedSearch.cancel()
    }
  }, [notes, searchTab, debouncedSearch])

  return (
    <Box
      as="header"
      mb={2}
      p={3}
      w="100%"
      h="68px"
      bg="white"
      boxShadow="0px 24px 38px rgba(47, 53, 57, 0.03), 
            0px 9px 46px rgba(71, 116, 138, 0.02), 
            0px 11px 15px rgba(95, 137, 158, 0.04)"
    >
      <Flex w="100%" justify="center" alignItems="center">
        <Input
          w="90%"
          h="44px"
          variant="filled"
          placeholder="Search your note"
          _focus={{}}
          value={searchTab}
          onChange={(e) => dispatch(setSearchTab({ term: e.target.value }))}
          disabled={location.pathname === '/notes' ? false : true}
        />
      </Flex>
    </Box>
  )
}
