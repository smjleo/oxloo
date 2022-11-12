import React from "react";

import {
    Box,
    Heading,
    Text,
} from '@chakra-ui/react';

import Rating from '@mui/material/Rating';

export default function ReviewCard({ review }) {
    return (
        <Box borderWidth='1px' borderRadius='lg' width='100%' p={3}>
            <Rating readOnly defaultValue={review.rate} />
            <Heading fontSize='13px' fontWeight={600}>{review.date}</Heading>
            <Text mt={3} fontSize='16px'>{review.text}</Text>
        </Box>
    )
}