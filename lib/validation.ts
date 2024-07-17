import { z } from 'zod';

export const UserFormValidation = z.object({
	name: z
		.string()
		.min(2, 'El nombre debe ser de al menos 2 carácteres')
		.max(50, 'El nombre no puede ser más de 50 carácteres'),
	email: z.string().email('Correo electrónico inválido'),
	phone: z
		.string()
		.refine(phone => /^\+\d{10,15}$/.test(phone), 'Número inválido'),
});
