import { z, ZodType } from 'zod';

export interface User {
    email: string;
    yearsOfExperience: number;
    password: string;
    confirmPassword: string;
}

export const UserSchema: ZodType<User> = z
    .object({
        email: z
            .string({
                required_error: 'Please enter your email.',
            })
            .email({
                message: 'Please enter valid email.',
            }),
        yearsOfExperience: z
            .number({
                required_error: 'Please enter your years of experience.',
                invalid_type_error: 'Years of Experience must be a number.',
            })
            .min(1)
            .max(10),
        password: z
            .string({
                required_error: 'Please enter your password.',
            })
            .min(8, { message: 'Password is too short.' })
            .max(20, 'Password is too long.'),
        confirmPassword: z.string({
            required_error: 'Please enter this field.',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match.',
        path: ['confirmPassword'],
    });
