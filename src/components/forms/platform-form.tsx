"use client"
// setting up react hook form with zod 

import { Platform } from '@prisma/client';
import  React,{useState, useEffect} from 'react';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { AlertDialog } from '../ui/alert-dialog';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { zodResolver } from '@hookform/resolvers/zod'

import * as z from 'zod';
import {useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

type Props = {
  data?: Partial<Platform> // Type for props, expecting partial Platform data
}

// Defining form schema using Zod, taking input values from Prisma schema
const FormSchema = z.object({
  name: z.string().min(2, { message: 'Platform name must be at least 2 characters.' }),
  companyEmail: z.string().min(1),
  companyPhone: z.string().min(1),
  whiteLabel: z.boolean(),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  platformLogo: z.string().min(1),
})

const PlatformDetails = ({data}: Props) => {
  // Custom hook to display toasts
  const { toast } = useToast();
  const router = useRouter(); // Next.js router hook

  const [platformDeleting, setPLatformDeleting] = useState(false); // State for managing platform deletion

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange', // Form validation mode
    resolver: zodResolver(FormSchema), // Setting Zod resolver for form validation
    defaultValues: { // Setting default form values from passed data
      name: data?.name,
      companyEmail: data?.companyEmail,
      companyPhone: data?.companyPhone,
      whiteLabel: data?.whiteLabel || false,
      address: data?.address,
      city: data?.city,
      zipCode: data?.zipCode,
      state: data?.state,
      country: data?.country,
      platformLogo: data?.platformLogo,
    },
  })

  const isLoading = form.formState.isSubmitting; // Checking if form is submitting

  useEffect(() => {
    // Resetting form with new data when data prop changes
    if (data) {
      form.reset(data);
    }
  }, [data])

  // Handling form submission
  const handleSubmit = async () => {
    
  }

    return (
        <AlertDialog>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Platform Info</CardTitle>
              <CardDescription>
                Let's build a platform for your business. You'll have the flexibility to fine-tune and 
                optimize your platform settings later on from the settings tab, ensuring it aligns perfectly with your evolving requirements.
              </CardDescription>
            </CardHeader>
          </Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="platformLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform Logo</FormLabel>
                    <FormControl>
                      {/* Here will add FIle Upload */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </AlertDialog>
      )
      
}

export default PlatformDetails;
