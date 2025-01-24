/** @format */

'use server';

interface SendEmailActionProps {
	email?: string;
	subject?: string;
	htmlContent?: string;
}

export default async function SendEmailAction({
	email,
	subject,
	htmlContent,
}: SendEmailActionProps) {
	const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
	if (!apiKey) {
		return {
			success: false,
			message: `Algo deu errado - Sem API Key`,
			user: null,
		};
	}

	const response = await fetch('https://api.brevo.com/v3/smtp/email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'api-key': apiKey,
		} as HeadersInit, // Casting explícito para HeadersInit
		body: JSON.stringify({
			sender: {
				email: process.env.BREVO_SENDER_EMAIL,
				name: process.env.BREVO_SENDER_NAME,
			},
			to: [{ email: email }],
			subject: subject,
			htmlContent: htmlContent,
		}),
	});

	if (!response.ok) {
		const error = await response.json();
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
