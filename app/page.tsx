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
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  withFormik,
  FormikErrors,
} from 'formik';

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  creditCard: number;
  expiryDate: number;
  CVC: number;
}

 // Shape of form values
 interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  creditCard: number;
  expiryDate: number;
  CVC: number;
}

interface OtherProps {
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <Form>
      <h1>{message}</h1>
      <Field type="email" name="email" />
      {touched.email && errors.email && <div>{errors.email}</div>}

      <Field type="firstName" name="firstName" />
      {touched.firstName && errors.firstName && <div>{errors.firstName}</div>}
      <Field type="firstName" name="firstName" />
      {touched.firstName && errors.firstName && <div>{errors.firstName}</div>}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

 // The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}
 // Wrap our form with the withFormik HoC
 const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      email: props.initialEmail || '',
      password: '',
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  },

  handleSubmit: values => {
    // do submitting things
  },
})(InnerForm);

// Use <MyForm /> wherevs
const Basic = () => (
  <div>
    <h1>My App</h1>
    <p>This can be anywhere in your application</p>
    <MyForm message="Sign up" />
  </div>
);

const MyApp: React.FC<{}> = () => {
  const initialValues: MyFormValues = { 
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: undefined,
    creditCard: '',
    expiryDate: '',
    CVC: ''
    
  
  };
  return (
    <div>
      <h1>My Example</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="First Name" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

function Home() {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const cardError = cardNumber.length !== 16;
  const cvvError = cvv.length !== 3;
  const expiryError = expiry.length !== 5;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    console.log('Submitting payment...');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
        <FormControl>
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
        <Button colorScheme='teal' variant='outline'>
          Submit
        </Button>
      
    </main>
  )
}

export default MyApp;