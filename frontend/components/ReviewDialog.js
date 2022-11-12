import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stat,
    StatLabel,
    StatNumber,
    Box,
    Progress,
    Text,
    Heading,
    Input,
    VStack,
} from '@chakra-ui/react';
import Rating, { ratingClasses } from '@mui/material/Rating';
import ReviewCard from './ReviewCard';


export default function ReviewDialog( { toilet, isOpen, onOpen, onClose }) {
    const [reviews, setReviews] = React.useState([
        {
            text: "Irure minim eu nulla sint dolore aliquip veniam aliquip sunt tempor esse nisi. Excepteur nisi reprehenderit minim ex id consequat labore qui Lorem et. Nisi enim quis incididunt irure pariatur pariatur anim aliqua duis. Aute est labore dolor ex. Adipisicing dolore cupidatat consequat fugiat amet. Deserunt eiusmod sit sunt ut cillum et labore nisi et exercitation.",
            date: "19:04, Sat 12 Nov 2022",
            rate: 5
        },
       
    ]);

    const [average, setAverage] = React.useState(0);
    const [ratingCount, setRatingCount] = React.useState([0, 0, 0, 0, 0]);

    React.useEffect(() => {
        let sum = reviews.reduce((prev, review) => prev + review.rate, 0);
        setAverage(Number((sum / reviews.length).toFixed(1)));

        let newCount = reviews.reduce((prev, review) => [0, 1, 2, 3, 4].map(i => prev[i] + (review.rate === (i+1))), [0, 0, 0, 0, 0]);
        console.log(newCount);
        setRatingCount(newCount);
    }, [reviews]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{toilet.name}</ModalHeader>
                    <Box px={6}>
                        <Box display='flex'>
                            <Box p={3} bgColor='#BEE3F8' rounded='md' width='150px'>
                                <Stat mb={1}>
                                    <StatLabel color='#2C5282'>Average rating</StatLabel>
                                    <StatNumber color='#2C5282'>{average}/5</StatNumber>
                                </Stat>
                                <Rating readOnly precision={0.5} defaultValue={average} size='small' />
                            </Box>
                            <Box ml={7} >
                                {
                                    [5, 4, 3, 2, 1].map(e => (
                                        <Box display='flex' height={6} alignItems='center'>
                                            <Rating readOnly defaultValue={e} size='small' />
                                            <Progress ml={5} width='300px' value={(ratingCount[e-1] / reviews.length)*100} rounded={4}/>
                                            <Text fontSize='sm' ml={4}>{ratingCount[e-1]} review{ratingCount[e-1] !== 1 && 's'}</Text>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Box>
                        <Box mt={8}>
                            <Heading size='sm' fontWeight={600} mb={2}>Leave a review</Heading>
                            <Box display='flex' alignItems='center'>
                                <Rating />
                                <Input ml={4} size='sm' rounded={6} />
                                <Button size='sm' ml={4} fontWeight={600}>Submit</Button>
                            </Box>
                        </Box>
                        <Box mt={8}>
                            <Heading size='md' fontWeight={600}>{reviews.length} review{reviews.length !== 1 && 's'}</Heading>
                            <VStack mt={4} spacing={4}>
                                {
                                    reviews.map((review, i) => <ReviewCard review={review} key={i} />)
                                }
                            </VStack>
                        </Box>
                    </Box>
                    

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}