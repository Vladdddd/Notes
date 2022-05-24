import { ChakraProvider, extendTheme, Flex } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Content } from './components/content/Content'
import { Header } from './components/header/Header'
import { Menu } from './components/menu/Menu'
import { useAppSelector } from './hooks/redux';
import '@fontsource/inter/700.css'

const theme = extendTheme({
    fonts: {
        heading: 'Inter, sans-serif',
        body: 'Segoe UI, sans-serif',
    },
})

function App() {
    const notes = useAppSelector(state => state.notes.notes)
    const searchTab = useAppSelector(state => state.notes.searchTab)

    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <Flex minH='100vh' h='100%' bg='gray.50'>
                    <Menu notes={notes} />
                    <Flex direction='column' w='full'>
                        <Header notes={notes} searchTab={searchTab}/>
                        <Routes>
                            <Route
                                path='*'
                                element={<Content notes={notes} searchTab={searchTab}/>}>
                            </Route>
                        </Routes>
                    </Flex>
                </Flex>
            </ChakraProvider>
        </BrowserRouter>
    )
}

export default App
