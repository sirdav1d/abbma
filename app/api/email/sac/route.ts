/** @format */

import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { email, name, subject, message } = body;

		if (!email || !name) {
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
        <h1>Nova mensagem de suporte</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
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
				to: [{ email: 'sac@abbma.org.br' }],
				subject: subject,
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
