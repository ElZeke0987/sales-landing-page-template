import { parse } from 'cookie';

export async function GET(request) {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);//dada una cookie parseada, devuelve un objeto, con la info de la sesion del admin del negocio
    if (cookies.shop_admin === 'true') {
        return new Response(JSON.stringify({ authenticated: true }));
    }
    return new Response(JSON.stringify({ authenticated: false }));
}