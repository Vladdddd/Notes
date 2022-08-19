import { Text, Flex, IconButton, Box, ComponentWithAs, IconProps } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

interface PropsType {
  caption: string
  isOpen: boolean
  Icon: ComponentWithAs<'svg', IconProps>
  path: string
}

const variants: any = {
  open: {
    width: 'max-content',
    height: '40px',
    opacity: '1',
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    width: '0px',
    height: '0px',
    opacity: '0',
    transition: {
      duration: 0.2,
    },
  },
}

export const MenuItem: React.FC<PropsType> = ({ caption, isOpen, Icon, path }) => {
  const { pathname } = useLocation()
  const isPath = pathname === path

  return (
    <Box bg={isPath ? '#3563E9' : ''} color={isPath ? 'white' : '#90A3BF'} borderRadius={'8'} mb={['0', '3']} p={'1'}>
      <Link to={path}>
        <Flex>
          <IconButton
            aria-label={caption}
            bg="inherit"
            color="inherit"
            _focus={{}}
            _hover={{}}
            _active={{}}
            icon={<Icon />}
          />

          <Box
            as={motion.div}
            initial={false}
            display={['none' ,'initial']}
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
            overflow="hidden"
          >
            <Text as={motion.p} pl="3" pr="12" lineHeight="10" fontSize="20px" fontWeight="600">
              {caption}
            </Text>
          </Box>
        </Flex>
      </Link>
    </Box>
  )
}
