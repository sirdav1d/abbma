/** @format */

import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { email, name, password } = body;

		if (!email || !name || !password) {
			return NextResponse.json(
				{ error: 'Parâmetros inválidos.' },
				{ status: 400 },
			);
		}

		const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
		if (!apiKey) {
			return new NextResponse(
				JSON.stringify({ message: 'Chave de API do Brevo não configurada.' }),
				{ status: 500 },
			);
		}

		const htmlContent = `
    <html>
      <body>
        <p>Olá ${name},</p>
        <p>Você solicitou a recuperação de senha. Sua nova senha é: <strong>${password}</strong></p>
        <p>Se você não solicitou essa alteração, por favor, ignore este e-mail.</p>
      </body>
    </html>
  `;

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
				to: [{ email }],
				subject: 'Recuperação de Senha',
				htmlContent,
				// Parâmetros para substituir no template
				// Substituir no template {{NAME}}
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			return NextResponse.json(
				{ error: error.message || 'Erro ao enviar o e-mail.' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		console.log(data);
		return NextResponse.json({ success: true, data });
	} catch (error) {
		return NextResponse.json(
			{ error: `Erro interno no servidor. - ${error}` },
			{ status: 500 },
		);
	}
}
