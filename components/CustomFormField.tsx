'use client';

import Image from 'next/image';
import { Control } from 'react-hook-form';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { FormFieldTypes } from './forms/PatientForm';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from "libphonenumber-js/core";


interface Props {
	control: Control<any>;
	fieldType: FormFieldTypes;
	name: string;
	label?: string;
	placeholder?: string;
	iconSrc?: string;
	iconAlt?: string;
	disabled?: boolean;
	dateFormat?: string;
	showTimeSelect?: boolean;
	children?: React.ReactNode;
	renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
	field,
	props,
}: {
	field: any;
	props: Props;
}) => {
	const { fieldType, iconAlt, iconSrc, placeholder } = props;

	switch (fieldType) {
		case FormFieldTypes.INPUT:
			return (
				<div className='flex rounded-md border border-dark-500 bg-dark-400'>
					{iconSrc && (
						<Image
							src={iconSrc}
							alt={iconAlt || 'icon'}
							height={24}
							width={24}
							className='ml-2'
						/>
					)}
					<FormControl>
						<Input
							{...field}
							className='shad-input border-0'
							placeholder={placeholder}
						/>
					</FormControl>
				</div>
			);
		case FormFieldTypes.PHONE_INPUT:
			return (
				<FormControl>
					<PhoneInput
						defaultCountry='EC'
						placeholder={placeholder}
						international
						withCountryCallingCode
						value={field.value as E164Number | undefined}
						onChange={field.onChange}
                        className='input-phone'
					/>
				</FormControl>
			);

		default:
			break;
	}
};

export const CustomFormField = (props: Props) => {
	const { control, fieldType, name, label } = props;

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex-1'>
					{fieldType !== FormFieldTypes.CHECKBOX && label && (
						<FormLabel>{label}</FormLabel>
					)}

					<RenderField field={field} props={props} />

					<FormMessage className='shad-error' />
				</FormItem>
			)}
		/>
	);
};
