/** @format */

import { NextResponse } from 'next/server';
import { KoalaWelcomeEmail } from '../../../components/email-templates/welcome';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	try {
		const { data, error } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: ['ddavid.diniz@gmail.com'],
			subject: 'Bem Vindo a  ABBMA',
			react: KoalaWelcomeEmail({ userFirstname: 'david' }),
		});

		if (error) {
			return NextResponse.json({ error }, { status: 500 });
		}

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
