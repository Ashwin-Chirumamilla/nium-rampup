'use client'

import React from 'react';
import { useState } from 'react';
import {
  Box,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Icon,
} from '@chakra-ui/react';
import { FaCreditCard } from 'react-icons/fa';

export default function Home() {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const cardError = cardNumber.length !== 16;
  const cvvError = cvv.length !== 3;
  const expiryError = expiry.length !== 5;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implement validation logic if needed
    setCardNumber(e.target.value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implement validation logic if needed
    setExpiry(e.target.value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implement validation logic if needed
    setCvv(e.target.value);
  };

  const handleSubmit = () => {
    // Implement your payment submission logic here
    console.log('Submitting payment...');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
        <FormControl isInvalid={cardError}>
          <FormLabel>Card Number</FormLabel>
          <Input
            type="text"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={16}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Expiration Date</FormLabel>
          <Input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={handleExpiryChange}
            maxLength={5}
          />
        </FormControl>
        <FormControl>
          <FormLabel>CVV</FormLabel>
          <Input
            type="text"
            placeholder="Enter CVV"
            value={cvv}
            onChange={handleCvvChange}
            maxLength={3}
          />
        </FormControl>
      
    </main>
  )
}
