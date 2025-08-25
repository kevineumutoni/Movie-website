const baseUrl = process.env.BASE_URL;
const apiKey = process.env.MOVIEDB_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    if (!baseUrl) {
        return new Response("Movie base URL not found", { status: 404 });
    }
    if (!apiKey) {
        return new Response("Movie API key not found", { status: 400 });
    }
    try {
        const req = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`, {
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
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}