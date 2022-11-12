import 'regenerator-runtime/runtime';
import React from 'react';

import {
    Box,
    Heading,
    Text,
    SlideFade,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';

import {
    SearchIcon
} from '@chakra-ui/icons';

import { 
    EducationalText, 
    SignInPrompt, 
    SignOutButton 
} from './ui-components';

import './assets/global.css';

import Navbar from './components/Navbar';
import ToiletCard from './components/ToiletCard';
import allToilets from './assets/toilets.json';

export default function App({ isSignedIn, contractId, wallet }) {
    const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

    const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

    // Get blockchian state once on component load
    React.useEffect(() => {
        getGreeting()
            .then(setValueFromBlockchain)
            .catch(alert)
            .finally(() => {
                setUiPleaseWait(false);
            });
    }
        , []);

    /// If user not signed-in with wallet - show prompt
    if (!isSignedIn) {
        // Sign-in flow will reload the page later
        return <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn()} />;
    }

    function changeGreeting(e) {
        e.preventDefault();
        setUiPleaseWait(true);
        const { greetingInput } = e.target.elements;

        // use the wallet to send the greeting to the contract
        wallet.callMethod({ method: 'set_greeting', args: { message: greetingInput.value }, contractId })
            .then(async () => { return getGreeting(); })
            .then(setValueFromBlockchain)
            .finally(() => {
                setUiPleaseWait(false);
            });
    }

    function getGreeting() {
        // use the wallet to query the contract's greeting
        return wallet.viewMethod({ method: 'get_greeting', contractId })
    }

    const [search, setSearch] = React.useState("");
    const handleChange = (event) => {
        setSearch(event.target.value);
        // handle toilet search
    }

    const [toilets, setToilets] = React.useState(allToilets);

    return (
        <>
            <Navbar signOut = {() => wallet.signOut()} accountId={wallet.accountId} />
            <Box>
                <SlideFade in>
                    <Box display='flex' flexDir='column' alignItems='center'>
                        <Heading size='lg' mb='30px'>Search for your favourite toilet</Heading>
                        <InputGroup w='40%' minW='400px'>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<SearchIcon />}
                            />
                            <Input 
                                value={search}
                                onChange={handleChange}
                                placeholder='Search for the building, postcode, address or ID...' 
                            />

                        </InputGroup>

                        {
                            toilets.map(toilet => (
                                <ToiletCard toilet={toilet} />
                            ))
                        }
                    </Box>
                </SlideFade>
                
            </Box>
            <main className={uiPleaseWait ? 'please-wait' : ''}>
                <h1>
                    The contract says: <span className="greeting">{valueFromBlockchain}</span>
                </h1>
                <form onSubmit={changeGreeting} className="change">
                    <label>Change greeting:</label>
                    <div>
                        <input
                            autoComplete="off"
                            defaultValue={valueFromBlockchain}
                            id="greetingInput"
                        />
                        <button>
                            <span>Save</span>
                            <div className="loader"></div>
                        </button>
                    </div>
                </form>
                <EducationalText />
            </main>
        </>
    );
}