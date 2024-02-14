import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Custom React component for the contact form
const ContactForm = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    telephone: Yup.string().matches(/^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/, 'Invalid UK phone number').required('Telephone is required'),
  });

  // Initial values for the form fields
  const initialValues = {
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
  };

  // Handling form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate sending data to a server
      console.log('Submitting', values);
      // Simulated response from a server
      alert('Form submitted successfully!');
      resetForm();
    } catch (error) {
      // Handle submission error
      console.error('Submission error', error);
      alert('Submission failed!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Dropdown for title */}
            <label htmlFor="title">Title</label>
            <Field name="title" as="select">
              <option value="">Select a title</option>
              <option value="mr">Mr</option>
              <option value="mrs">Mrs</option>
              <option value="ms">Ms</option>
              <option value="miss">Miss</option>
              <option value="dr">Dr</option>
            </Field>
            <ErrorMessage name="title" component="div" />

            {/* First name input */}
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" component="div" />

            {/* Last name input */}
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" component="div" />

            {/* Email input */}
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />

            {/* Telephone input */}
            <label htmlFor="telephone">Telephone</label>
            <Field name="telephone" type="text" />
            <ErrorMessage name="telephone" component="div" />

            {/* Submit button */}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
