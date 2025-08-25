const baseUrl = process.env.BASE_URL;
const apiKey = process.env.MOVIEDB_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const movie_id = searchParams.get("movie_id");

    if (!apiKey) {
        return new Response("No MOVIEDB_API_KEY found", { status: 404 });
    }
    if (!baseUrl) {
        return new Response("No BASE_URL found", { status: 404 });
    }
    if (!movie_id) {
        return new Response("Missing movie_id parameter", { status: 400 });
    }

    try {
        const response = await fetch(`${baseUrl}/movie/${movie_id}?api_key=${apiKey}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const result = await response.json();
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) errorMessage = error.message;
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
    }
}