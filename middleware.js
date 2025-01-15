import { NextResponse } from 'next/server'
import { createClient } from '@vercel/kv';

export async function middleware(request) {
    const kv = createClient({
        url: process.env.KV_Redirects_REST_API_URL,
        token: process.env.KV_Redirects_REST_API_TOKEN,
    });

    const pathname = request.nextUrl.pathname;
    const redirectData = await kv.get(pathname);
    
    if (redirectData) {
        return NextResponse.redirect(request.nextUrl.origin+redirectData, 308)
    }
 
    return NextResponse.next()
}
