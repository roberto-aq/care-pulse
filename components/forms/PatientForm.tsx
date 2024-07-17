'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CustomFormField } from '../CustomFormField';
import { SubmitButton } from '../SubmitButton';
import { useState } from 'react';
import { UserFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';

export enum FormFieldTypes {
	INPUT = 'input',
	TEXTAREA = 'textarea',
	PHONE_INPUT = 'phoneInput',
	CHECKBOX = 'checkbox',
	DATE_PICKER = 'datePicker',
	SELECT = 'select',
	SKELETON = 'skeleton',
}

export const PatientForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// 1. Define your form.
	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
		},
	});

	// 2. Define a submit handler.
	function onSubmit({
		name,
		email,
		phone,
	}: z.infer<typeof UserFormValidation>) {
		setIsLoading(true);

		try {
			// const userData = {
			// 	name,
			// 	email,
			// 	phone,
			// };
			// const user = await createUser(userData);
			// if (user) router.push(`/patients/${user.id}/register`);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6 flex-1'
			>
				<section className='mb-12 space-y-4'>
					<h1 className='header'>Hola ✋</h1>
					<p className='text-dark-700'>Programa tu primera cita</p>
				</section>

				<CustomFormField
					control={form.control}
					fieldType={FormFieldTypes.INPUT}
					name='name'
					label='Nombre Completo'
					placeholder='Juan Perez'
					iconSrc='/assets/icons/user.svg'
					iconAlt='user'
				/>
				<CustomFormField
					control={form.control}
					fieldType={FormFieldTypes.INPUT}
					name='email'
					label='Correo Electrónico'
					placeholder='Juanperez@gmail.com'
					iconSrc='/assets/icons/email.svg'
					iconAlt='email'
				/>

				<CustomFormField
					control={form.control}
					fieldType={FormFieldTypes.PHONE_INPUT}
					name='phone'
					label='Número celular'
					placeholder='+593 994435355'
				/>

				<SubmitButton isLoading={isLoading}>Empezar</SubmitButton>
			</form>
		</Form>
	);
};
