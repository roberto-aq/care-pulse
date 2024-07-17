import { ReactNode } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

interface Props {
	isLoading: boolean;
	className?: string;
	children: ReactNode;
}

export const SubmitButton = ({
	isLoading,
	className,
	children,
}: Props) => {
	return (
		<Button
			type='submit'
			disabled={isLoading}
			className={className ?? 'shad-primary-btn w-full'}
		>
			{isLoading ? (
				<div className='flex items-center gap-4'>
					<Image
						src='/assets/icons/loader.svg'
						alt='icon loader'
						width={24}
						height={24}
						className='animate-spin'
					/>
					cargando...
				</div>
			) : (
				children
			)}
		</Button>
	);
};
