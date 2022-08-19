import { ChakraProvider, extendTheme, Flex } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Content } from './components/content/Content'
import { Header } from './components/header/Header'
import Menu from './components/menu/Menu'
import { useAppSelector } from './hooks/redux'
import '@fontsource/inter/700.css'
import { Welcome } from './pages/Welcome'

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Segoe UI, sans-serif',
  },
})
//#F6F7F9
function App() {
  const notes = useAppSelector((state) => state.notes.notes)
  const groups = useAppSelector((state) => state.groups.groups)
  const searchTab = useAppSelector((state) => state.notes.searchTab)

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Flex minH="100vh" h="100%" w="100%" bg="#F1F4F9" direction={['column', 'row']}>
          <Menu />
          <Flex direction="column" w="100%" bg="#F1F4F9">
            <Header notes={notes} searchTab={searchTab} />
            <Routes>
              <Route path="/" element={<Welcome notesLength={notes.length} groupsLength={groups.length}/>}></Route>
              <Route path="*" element={<Content notes={notes} searchTab={searchTab} groups={groups}/>}></Route>
            </Routes>
          </Flex>
        </Flex>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
