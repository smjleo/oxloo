import React from 'react';
import {
    Box, 
    Heading,
    Text, 
    Button,
    SlideFade,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react';

import Logo from './components/Logo';

export function SignInPrompt({ greeting, onClick }) {
    return (
        <SlideFade in>
            <Box h='100vh' w='100vw' display='flex' justifyContent='center' >
                <Box w='50vw' mt={20}>
                    <Logo />
                    <Text fontSize='sm' fontWeight={500}>
                        Democratising Oxford's toilets.
                    </Text>

                    <Heading size='xl' fontWeight={900} mt={4}>Welcome!</Heading>

                    

                    <Text mt={2}>
                        Please log in with your NEAR Wallet to view, create or vote on toilet reviews.
                    </Text>
                    <Button onClick={onClick} colorScheme='blue' size='sm' mt='30px'>Sign in with NEAR Wallet</Button>

                    <Stat mt={8}>
                        <StatLabel>Registered users</StatLabel>
                        <StatNumber>2</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase' />
                            200% (today)
                        </StatHelpText>
                    </Stat>
                </Box>
            </Box>
        </SlideFade>
    );
}

export function SignOutButton({ accountId, onClick }) {
    return (
        <Button style={{ float: 'right' }} onClick={onClick}>
            Sign out {accountId}
        </Button>
    );
}

export function EducationalText() {
    return (
        <>
            <p>
                Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:
            </p>
            <ol>
                <li>
                    Look in <code>frontend/App.js</code> - you'll see <code>getGreeting</code> and <code>setGreeting</code> being called on <code>contract</code>. What's this?
                </li>
                <li>
                    Ultimately, this <code>contract</code> code is defined in <code>./contract</code> – this is the source code for your <a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/develop/contracts/overview">smart contract</a>.</li>
                <li>
                    When you run <code>npm run deploy</code>, the code in <code>./contract</code> gets deployed to the NEAR testnet. You can see how this happens by looking in <code>package.json</code>.</li>
            </ol>
            <hr />
            <p>
                To keep learning, check out <a target="_blank" rel="noreferrer" href="https://docs.near.org">the NEAR docs</a> or look through some <a target="_blank" rel="noreferrer" href="https://examples.near.org">example apps</a>.
            </p>
        </>
    );
}
