import { ChakraProvider, Flex } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import { Content } from './components/content/Content'
import { Header } from './components/header/Header'
import { Menu } from './components/menu/Menu'
import { useAppSelector } from './hooks/redux';



function App() {
    const notes = useAppSelector(state => state.notes.notes)
    
    return (
        <BrowserRouter>
            <ChakraProvider>
                <Flex h='100vh'>
                    <Menu notes={notes}/>
                    <Flex direction='column' w='full'>
                        <Header />
                        <Content notes={notes}/>
                    </Flex>
                </Flex>
            </ChakraProvider>
        </BrowserRouter>
    )
}

export default App
