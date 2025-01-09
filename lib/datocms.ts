import { gql, GraphQLClient } from 'graphql-request';

interface RequestProps {
	query: string;
	variables?: unknown;
	revalidate: number;
}

export function request({ query, variables, revalidate }: RequestProps) {
	const endpoint = process.env.NEXT_DATOCMS_ENDPOINT || '';
	const token = process.env.NEXT_DATOCMS_TOKEN;
	const graphQLClient = new GraphQLClient(endpoint, {
		method: 'POST',
		next: { revalidate: revalidate },
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	return graphQLClient.request(query, variables);
}

export const query = `query MyQuery {
  abbmaDatabase {
    videoHero {
      url
    }
    videoHeroThumb {
      url
    }
  }
}`


export interface AbbmaDatabaseProps {
  abbmaDatabase: {
    videoHero: {
		  url: string;
	  };
	  videoHeroThumb: {
		  url: string;
	  };
  }	
}