import React, { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';

type FormValues = {
  userEmail: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.userEmail ? values : {},
    errors: !values.userEmail
      ? {
          userEmail: {
            type: 'required',
            message: 'Email is required.',
          },
        }
      : {},
  };
};

export function SubscriptionForm() {
  const [formSubmissionStatus, setFormStatus] = useState({ status: false, message: null });
  const [loadingStatus, setLoadingStatus] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful} } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit((data) => {
    setLoadingStatus(true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };

    fetch('https://localhost:7246/subscribers/AddSubscriberToDb', options)
      .then(response => response.json())
      .then(data => {
        setFormStatus({ status: data.status, message: data.message });
        setLoadingStatus(false);
      })
      .catch(error => console.error(error));
    });

  function ToggleForm() {
    if (!formSubmissionStatus.status && !formSubmissionStatus.message) {
      return (      
        <form onSubmit={onSubmit} className='subscription-form'>
          <div className=''> 
              <input {...register("userEmail")} placeholder="Enter your email address" disabled={isSubmitting || isSubmitSuccessful} className='subscription-form-inp' required/>
              {/* <p className="text-danger">{errors?.userEmail && errors.userEmail.message}</p> */}
          </div>
          <div className=''>
              <input type="submit" value= {loadingStatus ? "Processing..." : "Subscribe to our newsletter"} disabled={loadingStatus} className='subscription-form-btn'/>
          </div>
        </form>
    );
    } 
    
    if (!formSubmissionStatus.status) {
      return (
        <p className='text-warning'>{formSubmissionStatus.message}</p>
      );
    } 
    
    if (formSubmissionStatus.status) {
      return (
        <p className='text-success'>{formSubmissionStatus.message}</p>
      );
    }
    
  }   

  return (      
      <ToggleForm />
  );
}