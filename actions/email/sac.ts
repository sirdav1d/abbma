/** @format */

'use server';

interface sendSupportEmailActionProps {
	email: string;
	name: string;
	subject: string;
	message: string;
}

export default async function sendSupportEmailAction({
	email,
	name,
	subject,
	message,
}: sendSupportEmailActionProps) {
	const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

	try {
		const response = await fetch(`${API_ENDPOINT}/api/email/sac`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				name,
				subject,
				message,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			return { success: false, message: `Erro: ${error.message}` };
		} else {
			return { success: true, message: 'Email enviado com sucesso!' };
		}
	} catch (error) {
		return { success: false, message: `Erro: ${error}` };
	}
}
