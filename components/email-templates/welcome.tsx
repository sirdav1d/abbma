/** @format */

import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import * as React from 'react';

interface KoalaWelcomeEmailProps {
	userFirstname: string;
}

const baseUrl = 'https://abbma.vercel.app';

export const KoalaWelcomeEmail = ({
	userFirstname,
}: KoalaWelcomeEmailProps) => (
	<Html>
		<Head />
		<Preview>
			The sales intelligence platform that helps you uncover qualified leads.
		</Preview>
		<Body style={main}>
			<Container style={container}>
				<Img
					src={`${baseUrl}/logo-principal.png`}
					width='170'
					height='50'
					alt='logo abbma'
					style={logo}
				/>
				<Text style={paragraph}>olá {userFirstname},</Text>
				<Text style={paragraph}>
					Bem vindo a ABBMA, nosso compromisso é proporcionar aos associados e
					dependentes, acesso a uma ampla gama de benefícios, através de
					parcerias privadas, que visam facilitar o bem-estar, educação e saúde,
					além de oferecer vantagens financeiras, através de descontos e
					gratuidades.
				</Text>
				<Section style={btnContainer}>
					<Button
						style={button}
						href='https://abbma.vercel.app/login'>
						Faça Login
					</Button>
				</Section>
				<Text style={paragraph}>
					Aproveite seus benefícios,
					<br />
					Time ABBMA
				</Text>
				<Hr style={hr} />
				<Text style={footer}>
					2024 © Associação Brasileira de Benefícios para Militares e Autônomos
					- ABBMA. Todos os direitos reservados
				</Text>
			</Container>
		</Body>
	</Html>
);

KoalaWelcomeEmail.PreviewProps = {
	userFirstname: 'Alan',
} as KoalaWelcomeEmailProps;

export default KoalaWelcomeEmail;

const main = {
	backgroundColor: '#f8fafc',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
};

const logo = {
	margin: '0 auto',
};

const paragraph = {
	fontSize: '16px',
	lineHeight: '26px',
};

const btnContainer = {
	textAlign: 'center' as const,
};

const button = {
	backgroundColor: '#1d4ed8',
	borderRadius: '3px',
	color: '#fff',
	fontSize: '16px',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'block',
	padding: '12px',
};

const hr = {
	borderColor: '#cccccc',
	margin: '20px 0',
};

const footer = {
	color: '#8898aa',
	fontSize: '12px',
};
