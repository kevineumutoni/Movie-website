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
        const requestUrl = `${baseUrl}/movie/latest?api_key=${apiKey}`;
        const req = await fetch(requestUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!req.ok) {
            throw new Error(`Request failed with status ${req.status}`);
        }
        const responseJson = await req.json();
        return new Response(JSON.stringify(responseJson), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) errorMessage = error.message;
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}