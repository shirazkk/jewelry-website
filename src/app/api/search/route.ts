import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  try {
    const products = await client.fetch(`
      *[_type == "product" && name match $query + "*"] {
        _id,
        name,
        price,
        "slug": slug.current,
        "image": image.asset->url
      }
    `, { query });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 });
  }
} 