/** @format */

'use server';

interface WelcomeEmailActionProps {
	email?: string;
	name?: string;
	password?: string;
}

export default async function WelcomeEmailAction({
	email,
	name,
	password,
}: WelcomeEmailActionProps) {
	const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

	const response = await fetch(`${API_ENDPOINT}/api/welcome-route`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email,
			name,
			password,
		}),
	});

	if (!response.ok) {
		const error = await response.json();
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
