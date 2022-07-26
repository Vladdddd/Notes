import { Box, Text, Flex, Button, Link, Image } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import group from '../assets/group.svg'
import welcome from '../assets/welcome.svg'
import notes from '../assets/notes.svg'

interface PropsType {
  notesLength: number
  groupsLength: number
}

export const Welcome: React.FC<PropsType> = ({ notesLength, groupsLength }) => {
  return (
    <Flex
      m="4%"
      mt={['10%', '10%', '10%', '5%']}
      justify={['center', 'center', 'space-around']}
      align={['center', 'center', 'initial']}
      direction={['column', 'column', 'row']}
    >
      <Flex w={['85%', '85%', '35%', '30%']} mb="4%" direction="column" align={['center', 'initial']}>
        <Text mb={['2', '4']} fontFamily="Inter" fontSize={['18px', '26px', '30px']}>
          Welcome to Notes
        </Text>
        <Text fontSize={['12px', '16px']}>
          In this app you can <b>save</b> your notes and <b>group</b> they
        </Text>
        <Image
          src={welcome}
          pos="absolute"
          left={[0, 0, '2%', '2%', '5%']}
          top={[0, 0, '35%', '32%']}
          w={[0, 0, '55%', '50%', '40%']}
          display={['none', 'none', 'initial']}
        />
      </Flex>
      <Box
        bg="white"
        textAlign="center"
        w={['90%', '90%', '50%', '60%']}
        h={['60vh', '60vh', '55vh', '70vh']}
        p={['2', '4']}
        mt={['12%', '0']}
        borderRadius="12"
        boxShadow="0px 24px 38px rgba(47, 53, 57, 0.03), 
        0px 9px 46px rgba(71, 116, 138, 0.02), 
        0px 11px 15px rgba(95, 137, 158, 0.04)"
      >
        <Text fontFamily="Inter" fontSize={['16px', '26px']} mt="4" mb="0">
          Your Items
        </Text>
        <Flex pt="6" justify="space-around" align="center" h="85%" direction={['column', 'column', 'row']}>
          <Link as={RouterLink} to="/notes" w={['95%', '95%', '47%']} h="100%" mb={['15%', '10%', '0']} _hover={{}}>
            <Button
              w="100%"
              h="100%"
              fontSize={['16px', '18px', '20px', '24px']}
              borderRadius="0"
              _hover={{ bg: '#E2E8F0', bgImage: notes, bgSize: '25%', bgRepeat: 'repeat' }}
            >
              Your Notes: {notesLength}
            </Button>
          </Link>
          <Link as={RouterLink} to="/groups" w={['95%', '95%', '47%']} h="100%" _hover={{}}>
            <Button
              w="100%"
              h="100%"
              fontSize={['16px', '18px', '20px', '24px']}
              borderRadius="0"
              _hover={{ bg: '#E2E8F0', bgImage: group, bgSize: '25%', bgRepeat: 'repeat' }}
            >
              Your Groups: {groupsLength}
            </Button>
          </Link>
        </Flex>
      </Box>
    </Flex>
  )
}
