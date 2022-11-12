import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    useBreakpointValue,
    useColorModeValue,
    Text,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiMenu } from 'react-icons/fi'
import Logo from './Logo'

export default Navbar = ({ signOut, accountId }) => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    return (
        <Box as="section" pb={{ base: '6', md: '12' }}>
            <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
                <Container py={{ base: '4', lg: '5' }} maxWidth='95%'>
                    <HStack spacing="10" justify="space-between">
                        <Logo />
                        {isDesktop ? (
                            <Flex justify="space-between" flex="1">
                                <ButtonGroup variant="link" spacing="8">
                                    {['Home', 'Why?', 'Support'].map((item) => (
                                        <Button key={item}>{item}</Button>
                                    ))}
                                </ButtonGroup>
                                <HStack spacing="3">
                                    <Text fontSize='sm' mr={2}>Signed in as {accountId}</Text>
                                    <Button colorScheme='blue' size='sm' onClick={signOut}>Sign out</Button>
                                </HStack>
                            </Flex>
                        ) : (
                            <IconButton
                                variant="ghost"
                                icon={<FiMenu fontSize="1.25rem" />}
                                aria-label="Open Menu"
                            />
                        )}
                    </HStack>
                </Container>
            </Box>
        </Box>
    )
}