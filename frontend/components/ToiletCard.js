import React from 'react';
import {
    Box,
    Heading, 
    Text,
    SlideFade,
} from '@chakra-ui/react';
import Rating from '@mui/material/Rating';


export default function ToiletCard({ toilet, show, rating, onClick }) {
    return (
        <SlideFade in={show === 1} style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Box 
                w='40%' 
                minW='400px'
                boxShadow='xl'
                bg='white' 
                rounded='md' 
                p={5} 
                _hover={{
                    boxShadow: "2xl",
                    cursor: "pointer",
                }}
                transition="0.3s"
                onClick={onClick}
            >
                <Heading size='md' fontWeight={600}>{toilet.name}</Heading>
                <Heading mt={1} fontSize='15px' fontWeight={500}>{toilet.address}</Heading>
                <Heading fontSize='15px' fontWeight={500}>{toilet.postcode}</Heading>

                <Rating style={{marginTop: 15}} readOnly precision={0.5} defaultValue={rating}/>
            </Box>
        </SlideFade>
        // TODO: https://www.producthunt.com/products/chakra-ui/reviews
        // https://mui.com/material-ui/react-rating/

    )
}