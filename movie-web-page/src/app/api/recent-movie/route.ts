const baseUrl = process.env.BASE_URL;
const apiKey = process.env.MOVIEDB_API_KEY;

export async function GET() {
    if (!baseUrl) {
        return new Response("Movie base URL not found", { status: 404 });
    }
    if (!apiKey) {
        return new Response("Movie API key not found", { status: 400 });
    }
    try {
        const requestUrl = `${baseUrl}/discover/movie?sort_by=vote_average.desc&api_key=${apiKey}&primary_release_date.gte=2021-01-01&primary_release_date.lte=2023-12-31&page=1`;
        const req = await fetch(requestUrl, {
            method: "GET",
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
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) errorMessage = error.message;
        console.error(errorMessage);
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}