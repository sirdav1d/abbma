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
	const response = await fetch(`http://localhost:3000/api/welcome-route`, {
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
		throw new Error(`Erro ao enviar e-mail: ${error.message}`);
	}
}
