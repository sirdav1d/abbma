/** @format */

'use server';

interface RecoveryPassActionProps {
	email: string;
	link: string;
	name: string;
	message?: string;
	sub?: string;
}

export default async function SendInvoiceLinkAction({
	email,
	link,
	name,
	sub,
	message,
}: RecoveryPassActionProps) {
	const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
	try {
		const resp = await fetch(`${API_ENDPOINT}/api/invoice-link-route`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				name,
				link,
				sub,
				message,
			}),
		});
		return resp.json();
	} catch (error) {
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
