/** @format */

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const homepageLinks = [
	{ href: `${baseURL}/homepage#club`, label: 'Clube de Vantagens' },
	{ href: `${baseURL}/homepage#tele`, label: 'Telemedicina' },
	{ href: `${baseURL}/homepage#seg`, label: 'Saúde e Seguros' },
	{ href: `${baseURL}/homepage#price`, label: 'Preços' },
];

export const telemedicinaLinks = [
	{ href: `${baseURL}/telemedicina#home`, label: 'Home' },
	{ href: `${baseURL}/telemedicina#about`, label: 'Sobre Nós' },
	{ href: `${baseURL}/telemedicina#espec`, label: 'Especialidades' },
	{ href: `${baseURL}/telemedicina#plans`, label: 'Planos' },
];
