/** @format */

export function generateSlug(nome: string): string {
	// Converte para minúsculas
	let slug = nome.toLowerCase();

	// Remove caracteres especiais (mantém apenas letras, números e espaços)
	slug = slug.replace(/[^a-z0-9\s-]/g, '');

	// Substitui espaços por hífens
	slug = slug.replace(/\s+/g, '-');

	// Remove hífens duplicados
	slug = slug.replace(/-+/g, '-');

	// Remove hífens no início e no final
	slug = slug.replace(/^-+|-+$/g, '');

	return slug;
}
