/** @format */

'use server';

const endpoint = process.env.NEXT_DATOCMS_ENDPOINT || '';
const token = process.env.NEXT_DATOCMS_TOKEN;

export async function datoRequestAction() {
	const response = await fetch(endpoint, {
		method: 'POST',
		next: { revalidate: 3600 },
		headers: {
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			query: `
        query MyQuery {
  				allAbbmaDatabases {
    				videoHero {
     					url
    				}
    				videoHeroThumb {
      				url
    				}
 					}
				}
      `,
		}),
	});

	const data = await response.json();
	if (data) {
		return { ok: true, data: data.data.allAbbmaDatabases[0] };
	} else {
		return { ok: false, data: null };
	}
}

export interface AbbmaDatabaseProps {
	abbmaDatabase: {
		videoHero: {
			url: string;
		};
		videoHeroThumb: {
			url: string;
		};
	};
}
