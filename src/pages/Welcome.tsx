import { Box, Text, Flex, Button, Link, Image } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import welcome from '../assets/welcome.svg'

interface PropsType {
  notesLength: number
  groupsLength: number
}

type DesctiptionArrType = {
  name: string
  amount: number
  url: string
}

export const Welcome: React.FC<PropsType> = ({ notesLength, groupsLength }) => {
  const descriptionArr: DesctiptionArrType[] = [
    {
      name: 'Notes',
      amount: notesLength,
      url: '/notes',
    },
    {
      name: 'Groups',
      amount: groupsLength,
      url: '/groups',
    },
  ]

  return (
    <Flex
      m="2.5%"
      mt={['5%', '5%', '5%', '2.5%']}
      justify={['center', 'center', 'center', 'space-around']}
      align={['center', 'center', 'center', 'initial']}
      direction={['column', 'column', 'column', 'row']}
    >
      <Flex mb="4%" w={['90%', '85%', '80%', '50%']} align={['center', 'initial']} direction="column">
        <Box p="6" bg="#3563E9" color="white" borderRadius="8">
          <Text mb={['2', '4']} fontFamily="Inter" fontSize={['12px', '20px', '24px']}>
            Welcome to Notes
          </Text>
          <Text fontSize={['10px', '10px', '14px']}>
            In this app you can <b>save</b> your notes and <b>group</b> them Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Sint <b>natus</b> impedit, aliquid provident tempora dolor molestiae delectus iste cum ut
            quis
          </Text>
        </Box>

        <Image
          src={welcome}
          pos="absolute"
          left="25%"
          top="40%"
          w={[0, 0, '45%', '40%', '35%']}
          display={['none', 'none', 'none', 'initial']}
        />
      </Flex>

      <Box w={['90%', '85%', '80%', '45%']}>
        {descriptionArr.map((el) => {
          return (
            <Box key={el.name}>
              <Box mt={['12%', '0']} w="100%" h="1.5vh" bg="#3563E9" borderTopRadius="8"></Box>
              <Box
                p={['2', '4']}
                pl={['6', '12']}
                pr={['6', '12']}
                mb={['10%', '5%']}
                bg="white"
                textAlign="start"
                h="auto"
                borderBottomRadius="8"
                boxShadow="0px 24px 38px rgba(47, 53, 57, 0.03), 
                        0px 9px 46px rgba(71, 116, 138, 0.02), 
                        0px 11px 15px rgba(95, 137, 158, 0.04)"
              >
                <Flex mt="4" mb="6" fontFamily="Inter" alignItems="center">
                  <Text mr="4" color="black" fontSize={['10px', '22px']}>
                    Your {el.name}
                  </Text>
                  <Text p="1" pl="3" pr="3" bg="#3563E9" color="white" borderRadius="6" fontSize={['8px', '16px']}>
                    {el.amount}
                  </Text>
                </Flex>

                <Box>
                  <Text mb="8" color="#596780" fontSize={['12px', '12px', '14px', '18px']}>
                    Details about {el.name}. You can Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Necessitatibus quibusdam tenetur quam maxime sapiente!
                  </Text>

                  <Flex justifyContent="flex-end">
                    <Link as={RouterLink} to={el.url} w={['45%', '65%', '50%']} _hover={{}}>
                      <Button
                        pt="2"
                        pb="2"
                        w="100%"
                        bg="#3563E9"
                        color="white"
                        border="2px solid white"
                        fontSize={['12px', '14px', '16px', '18px']}
                        borderRadius={['4', '8']}
                        _hover={{ bg: 'white', color: '#3563E9', border: '2px solid #3563E9' }}
                      >
                        Go there
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Flex>
  )
}
