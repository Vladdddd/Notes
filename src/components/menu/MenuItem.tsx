import { Text, Flex, IconButton, Box, ComponentWithAs, IconProps } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface PropsType {
    caption: string
    isOpen: boolean
    Icon: ComponentWithAs<"svg", IconProps>
    path: string
}

const variants: any = {
    open: { 
        width: 'max-content',
        height: '40px',
        opacity: '1',
        transition: {
            duration: 0.2
        }
    },
    closed: {
        width: '0px',
        height: '0px',
        opacity: '0',
        transition: {
            duration: 0.2
        }
    }
}

export const MenuItem: React.FC<PropsType> = ({ caption, isOpen, Icon, path }) => {

    return (
            <Flex
                align='center'
                color='white'
                mb='3'
            >
                <Link to={path}><IconButton
                    aria-label={caption}
                    bg='white'
                    size='md'
                    color='cyan.500'
                    _focus={{}}
                    icon={<Icon />}
                /></Link>

                <Box
                    as={motion.div}
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    variants={variants}
                    overflow='hidden'
                >
                    <Text as={motion.p} pl='4' fontSize='25px' fontWeight='600'>{caption}</Text>
                </Box>
            </Flex>
    )
}
