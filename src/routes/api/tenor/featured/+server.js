import { TENOR_API_KEY } from '$env/static/private';

export async function GET() {
	const link = `https://tenor.googleapis.com/v2/featured?key=${TENOR_API_KEY}&client_key=my_test_app`;
	const response = await fetch(link);
	const data = await response.json();

	return new Response(JSON.stringify(data.results));
}
