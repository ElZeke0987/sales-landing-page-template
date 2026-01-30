
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function authenticateAdmin(){


    const cookiesStore = await cookies();
    const token = JSON.parse(cookiesStore.get("dev_auth")?.value || "{}").token;
    console.log("THIS IS THE TOKEN: ", token)
    if (!token) {
        throw new Error('Unauthorized: no JWT');
    }

    // Crear cliente Supabase con JWT
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // anon key
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`, // token del usuario
                },
            },
        }
    );

    // Obtener info del usuario autenticado
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log("getting user: ", await supabase.auth.getUser());
    if (error || !user) throw new Error('Unauthorized: JWT inválido');

    // Verificar rol usando tu tabla admins
    const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('role')
        .eq('id', user.id)
        .single();

    if (adminError || !adminData) throw new Error('Forbidden: no admin');
    if (adminData.role !== 'admin' && adminData.role !== 'superadmin') 
        throw new Error('Forbidden: solo admins');

    return { user, role: adminData.role, supabase };
}