/** @format */

'use server';

export default async function WelcomeEmailAction() {
	try {
		const resp = await fetch('http://localhost:3000/api/welcome', {
			method: 'POST',
		});
		console.log(resp);
	} catch (error) {
		console.log(error);
	}
}
