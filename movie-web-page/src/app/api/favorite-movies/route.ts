const favorites: { userId: string, movieId: string }[] = [];

export async function POST(request: Request) {
    try {
        const { userId, movieId } = await request.json() as { userId?: string; movieId?: string };
        if (!userId || !movieId) {
            return new Response("Missing userId or movieId", { status: 400 });
        }
        favorites.push({ userId, movieId });
        return new Response(JSON.stringify({ success: true, favorites }), {
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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
        return new Response("Missing userId parameter", { status: 400 });
    }
    const userFavorites = favorites.filter(fav => fav.userId === userId);
    return new Response(JSON.stringify(userFavorites), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}