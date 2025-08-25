const baseUrl = process.env.BASE_URL;
const apiKey = process.env.MOVIEDB_API_KEY;

export async function GET() {
    if (!baseUrl) {
        console.error('Missing BASE_URL env var');
        return new Response("Movie base URL not found", { status: 404 });
    }
    if (!apiKey) {
        console.error('Missing MOVIEDB_API_KEY env var');
        return new Response("Movie API key not found", { status: 400 });
    }
    try {
        const today = new Date().toISOString().slice(0, 10);
        const requestUrl = `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=release_date.asc&primary_release_date.gte=${today}`;
        const req = await fetch(requestUrl, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        if (!req.ok) {
            const errorText = await req.text();
            console.error(`TMDB API error: ${req.status} ${errorText}`);
            return new Response(errorText, { status: req.status });
        }
        const responseJson = await req.json();
        return new Response(JSON.stringify(responseJson), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) errorMessage = error.message;
        console.error('API handler error:', errorMessage);
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}