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
    VStack,
    useDisclosure,
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
import ReviewDialog from './components/ReviewDialog';

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

    const [search, setSearch] = React.useState('');

    const handleChange = (event) => {
        setSearch(event.target.value);

        let newToilets = [...toilets];
        for (let i in allToilets) {
            if (similar(allToilets[i], event.target.value)) newToilets[i] = 1;
            else newToilets[i] = 0;
        }

        console.log(newToilets);
        setToilets(newToilets);
    }

    function similar(toilet, search) {
        if (search === '') return true;
        let combinedString = (toilet.name + ' ' + toilet.address + ' ' + toilet.postcode).toLowerCase();
        if (combinedString.includes(search.toLowerCase())) return true;
        return false;
    }

    const [toilets, setToilets] = React.useState([...Array(allToilets.length)].map(_ => 1));
    const [index, setIndex] = React.useState(0);
    const [rating, setRating] = React.useState([...Array(allToilets.length)].map(_ => 3.5))

    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <>
            <ReviewDialog toilet={allToilets[index]} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            <Navbar signOut = {() => wallet.signOut()} accountId={wallet.accountId} />
            <Box>
                <SlideFade in>
                    <Box display='flex' flexDir='column' alignItems='center'>
                        <Heading size='lg' mb='30px' fontWeight={600}>Search for your favourite toilet!</Heading>
                        <InputGroup w='40%' minW='400px'>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<SearchIcon />}
                            />
                            <Input 
                                value={search}
                                onChange={handleChange}
                                placeholder='Search for the building, postcode, or address...' 
                            />

                        </InputGroup>
                        <VStack spacing='20px' mt='30px' w='100%'>
                            {
                                allToilets.map((toilet, i) => (
                                    toilets[i] === 1 && 
                                        <ToiletCard 
                                            key={i} 
                                            toilet={toilet} 
                                            show={toilets[i]} 
                                            rating={rating[i]}
                                            onClick={onOpen}
                                        />
                                ))
                            }
                        </VStack>
                        
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