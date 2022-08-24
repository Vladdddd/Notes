import { Box, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
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
      p={4}
      w="100%"
      h="80px"
      bg="white"
      boxShadow="0px 24px 38px rgba(47, 53, 57, 0.01), 
            0px 9px 46px rgba(71, 116, 138, 0.01), 
            0px 11px 15px rgba(95, 137, 158, 0.01)"
    >
      <Flex w="100%" justify={['center', 'flex-start']} alignItems="center">
        <InputGroup>
          <InputLeftElement pointerEvents="none" h="44px" children={<SearchIcon color="gray.500" />} />
          <Input
            w={['100%', '100%', '55%']}
            h="44px"
            bg="gray.100"
            color="gray.900"
            border="2px solid"
            borderColor="gray.300"
            borderRadius="70px"
            variant="filled"
            placeholder="Search your note"
            _focus={{}}
            value={searchTab}
            onChange={(e) => dispatch(setSearchTab({ term: e.target.value }))}
            disabled={location.pathname === '/notes' ? false : true}
          />
        </InputGroup>
      </Flex>
    </Box>
  )
}
