'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';

import { UserCreateFormSchema } from '@/models/FormSchemas';
import { createUser } from '@/actions/auth';

import { FormCardWrapper } from '@/components/form/FormCardWrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormButton } from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { FormSuccess } from '@/components/form/FormSuccess';
import { FormError } from '@/components/form/FormError';

const FormCol = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='space-y-1'>
      <h4 className='text-lg font-semibold'>{title}</h4>
      <div className='space-y-3'>{children}</div>
    </div>
  );
};

export const UserCreateForm = () => {
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof UserCreateFormSchema>>({
    resolver: zodResolver(UserCreateFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      degree: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
    criteriaMode: 'all',
  });

  const onSubmit = async (values: z.infer<typeof UserCreateFormSchema>) => {
    const result = await createUser(values);

    if (result.success) {
      form.reset();
      setSuccess(result.success);
      setError(undefined);
      setTimeout(() => {
        setSuccess(undefined);
      }, 3000);
    } else {
      setError(result.error);
    }
  };

  return (
    <FormCardWrapper title='Create a user'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <FormCol title='User details'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <FormInput field={field} placeholder='Enter username' />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <FormInput
                        field={field}
                        placeholder='Enter password'
                        type='password'
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <FormInput
                        field={field}
                        placeholder='Re-enter password'
                        type='password'
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </FormCol>
            <FormCol title='Personal details'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <FormInput field={field} placeholder='Enter first name' />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <FormInput field={field} placeholder='Enter last name' />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='degree'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <FormInput field={field} placeholder='Enter degree' />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </FormCol>
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <FormButton>Create</FormButton>
        </form>
      </Form>
    </FormCardWrapper>
  );
};
