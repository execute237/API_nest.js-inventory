import { Role } from '@prisma/client';

export interface AuthPayload {
	name: string;
	email: string;
	role: Role;
}

export interface DecodedPayload extends AuthPayload {
	iat: number;
	exp: number;
}
