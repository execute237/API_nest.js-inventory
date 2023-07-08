export interface AuthPayload {
	name: string;
	email: string;
}

export interface DecodedPayload extends AuthPayload {
	iat: number;
	exp: number;
}
