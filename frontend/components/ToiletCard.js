import React from 'react';
import {
    Box,
    Heading, 
    Text,
} from '@chakra-ui/react';

export default function ToiletCard({ toilet }) {
    return (
        <Box w='60%' boxShadow='2xl' bg='white' rounded='md' p={4}>
            <Heading size='xs'>{toilet.name}</Heading>
        </Box>
    )
}