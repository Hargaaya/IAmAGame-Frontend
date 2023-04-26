import { error } from '@sveltejs/kit';
import { TENOR_API_KEY } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const queryText = url.searchParams.get('q');

	if (!queryText) {
		throw error(400, 'Missing query parameter');
	}

	const link = `https://tenor.googleapis.com/v2/search?q=${queryText}&key=${TENOR_API_KEY}&client_key=my_test_app&limit=15`;
	const response = await fetch(link);
	const data = await response.json();

	return new Response(JSON.stringify(data.results));
}
