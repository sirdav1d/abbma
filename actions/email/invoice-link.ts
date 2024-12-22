/** @format */

'use server';

interface RecoveryPassActionProps {
	email: string;
	link: string;
	name: string;
}

export default async function SendInvoiceLinkAction({
	email,
	link,
	name,
}: RecoveryPassActionProps) {
	try {
		const resp = await fetch('http://localhost:3000/api/invoice-link-route', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				name,
				link,
			}),
		});
		return resp.json();
	} catch (error) {
		console.log(error);
	}
}
