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
    Button,
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
    /// If user not signed-in with wallet - show prompt
    if (!isSignedIn) {
        // Sign-in flow will reload the page later
        return <SignInPrompt onClick={() => wallet.signIn()} />;
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
    const [rating, setRating] = React.useState([...Array(allToilets.length)].map(_ => 0));

    async function updateRating() {
        let newRating = [];
        for (let toilet of allToilets) {
            const rating = await wallet.viewMethod({ method: 'get_average_rating', contractId , args: { id: toilet.id }});
            console.log(rating);
            newRating.push(rating);
        }

        console.log(newRating);

        setRating(newRating);
    }

    React.useEffect(() => {
        updateRating();
    },[toilets]);

    React.useEffect(() => {
        updateRating();
        printReviews();
    }, [])

    async function printReviews() {
        console.log('hi?????');
        let reviews = await wallet.viewMethod({ contractId, method: 'get_reviews' });
        console.log(reviews);
    }

    async function clearReviews() {
        await wallet.callMethod({ contractId, method: 'clear_reviews' });
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [debug, setDebug] = React.useState(false);

    return (
        <>
            {debug && <Button onClick={clearReviews}>clear reviews lol</Button>}
            <ReviewDialog toilet={allToilets[index]} isOpen={isOpen} onOpen={onOpen} onClose={onClose} wallet={wallet} contractId={contractId} />
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
                                            onClick={() => {onOpen(); setIndex(i)}}
                                        />
                                ))
                            }
                        </VStack>
                        
                    </Box>
                </SlideFade>
                
            </Box>
        </>
    );
}