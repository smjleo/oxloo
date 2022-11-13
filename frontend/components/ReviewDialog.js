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
import Rating from '@mui/material/Rating';
import ReviewCard from './ReviewCard';


export default function ReviewDialog( {toilet, isOpen, onOpen, onClose, wallet, contractId }) {
    async function getReviews() {  
        let newReviews = await wallet.viewMethod( {contractId, method: 'get_reviews_by_id', args: { id: toilet.id }});
        setReviews(newReviews);
    }

    const [reviews, setReviews] = React.useState([]);

    React.useEffect(() => {
        getReviews();
        setRating(0);
        setReviewText("");
        setLoading(false);
    }, [isOpen]);

    const [average, setAverage] = React.useState(0);
    const [ratingCount, setRatingCount] = React.useState([0, 0, 0, 0, 0]);

    React.useEffect(() => {
        let sum = reviews.reduce((prev, review) => prev + review.rate, 0);
        setAverage(reviews.length !== 0 ? Number((sum / reviews.length).toFixed(1)) : 0);

        let newCount = reviews.reduce((prev, review) => [0, 1, 2, 3, 4].map(i => prev[i] + (review.rate === (i+1))), [0, 0, 0, 0, 0]);
        console.log(newCount);
        setRatingCount(newCount);
    }, [reviews]);

    const [rating, setRating] = React.useState(0);
    const [reviewText, setReviewText] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    async function submitReview() {
        setLoading(true);
        await wallet.callMethod({ method: 'add_review', contractId, args: { id: toilet.id, text: reviewText, rate: rating, date: new Date().toLocaleString() }});
        setLoading(false);
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{toilet.name}</ModalHeader>
                    <ModalCloseButton />
                    <Box px={6}>
                        <Box display='flex'>
                            <Box p={3} bgColor='#BEE3F8' rounded='md' width='150px'>
                                <Stat mb={1}>
                                    <StatLabel color='#2C5282'>Average rating</StatLabel>
                                    <StatNumber color='#2C5282'>{average}/5</StatNumber>
                                </Stat>
                                <Rating readOnly precision={0.5} value={average} size='small' />
                            </Box>
                            <Box ml={7} >
                                {
                                    [5, 4, 3, 2, 1].map(e => (
                                        <Box display='flex' height={6} alignItems='center'>
                                            <Rating readOnly value={e} size='small' />
                                            <Progress ml={5} width='300px' value={reviews.length !== 0 ? (ratingCount[e-1] / reviews.length)*100 : 0} rounded={4}/>
                                            <Text fontSize='sm' ml={4}>{ratingCount[e-1]} review{ratingCount[e-1] !== 1 && 's'}</Text>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Box>
                        <Box mt={8}>
                            <Heading size='sm' fontWeight={600} mb={2}>Leave a review</Heading>
                            <Box display='flex' alignItems='center'>
                                <Rating value={rating} onChange={e => setRating(e.target.value)} />
                                <Input ml={4} size='sm' rounded={6} value={reviewText} onChange={e => setReviewText(e.target.value)} />
                                <Button size='sm' ml={4} fontWeight={600} isLoading={loading} onClick={submitReview} >Submit</Button>
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

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}