import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path') || '';
  
  try {
    const response = await fetch(`http://192.168.199.249/${path}`, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'User-Agent': request.headers.get('user-agent') || '',
      },
      redirect: 'manual',
    });

    // Get the response as text first
    const html = await response.text();
    
    // Create a new response with the HTML
    const newResponse = new NextResponse(html, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'text/html',
        'Cache-Control': 'no-store, max-age=0',
      },
    });

    // Remove X-Frame-Options header if it exists
    newResponse.headers.delete('x-frame-options');
    newResponse.headers.delete('X-Frame-Options');
    
    // Add CSP header to allow embedding
    newResponse.headers.set('Content-Security-Policy', "frame-ancestors 'self' *");
    
    return newResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Proxy error', { status: 500 });
  }
}
