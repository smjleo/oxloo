import React from "react";

import {
    Box,
    Heading,
    Text,
    IconButton,
} from '@chakra-ui/react';

import {
    FiThumbsUp,
    FiThumbsDown,
} from 'react-icons/fi';

import Rating from '@mui/material/Rating';

export default function ReviewCard({ review }) {
    return (
        <Box borderWidth='1px' borderRadius='lg' width='100%' p={3}>
            <Box display='flex' justifyContent='space-between'>
                <Box>
                    <Rating readOnly value={review.rate} />
                    <Heading fontSize='13px' fontWeight={600}>{review.date}</Heading>
                </Box>
                <Box display='flex'>
                    <IconButton mr={2} icon={<FiThumbsUp />} />
                    <IconButton icon={<FiThumbsDown />} />
                </Box>
            </Box>  
            
            <Text mt={3} fontSize='16px'>{review.text}</Text>
        </Box>
    )
}