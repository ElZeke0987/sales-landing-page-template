-- Función que verifica si un UID es superadmin
CREATE OR REPLACE FUNCTION is_superadmin(uid uuid) RETURNS boolean
AS $$
DECLARE
  r boolean;
BEGIN
  SELECT role = 'superadmin' INTO r FROM public.admins WHERE id = uid;
  RETURN coalesce(r, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función que revisa permisos de admin normal (insert, update, delete)
CREATE OR REPLACE FUNCTION has_permission(uid uuid, perm text) RETURNS boolean
AS $$
DECLARE
  r boolean;
BEGIN
  IF perm NOT IN ('insert','update','delete') THEN
    RETURN false;
  END IF;

  SELECT 
    CASE perm
      WHEN 'insert' THEN can_insert
      WHEN 'update' THEN can_update
      WHEN 'delete' THEN can_delete
    END
  INTO r
  FROM public.admins
  WHERE id = uid;

  RETURN coalesce(r,false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Superadmins pueden hacer todo
DROP POLICY IF EXISTS "SuperAdmins can manage all products" ON public.products;
CREATE POLICY "SuperAdmins can manage all products"
ON public.products
FOR ALL
USING (is_superadmin(auth.uid()))
WITH CHECK (is_superadmin(auth.uid()));

-- Admins normales pueden insertar/actualizar/borrar según permisos
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
CREATE POLICY "Admins can insert products"
ON public.products
FOR INSERT
WITH CHECK (has_permission(auth.uid(),'insert'));

DROP POLICY IF EXISTS "Admins can update products" ON public.products;
CREATE POLICY "Admins can update products"
ON public.products
FOR UPDATE
USING (has_permission(auth.uid(),'update'))
WITH CHECK (has_permission(auth.uid(),'update'));

DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
CREATE POLICY "Admins can delete products"
ON public.products
FOR DELETE
USING (has_permission(auth.uid(),'delete'));

-- Lectura de admins solo para superadmins
DROP POLICY IF EXISTS "SuperAdmins can view all admins" ON public.admins;
CREATE POLICY "SuperAdmins can view all admins"
ON public.admins
FOR SELECT
USING (is_superadmin(auth.uid()));

-- Auto-update/delete solo para el mismo admin
DROP POLICY IF EXISTS "Admins can update themselves" ON public.admins;
CREATE POLICY "Admins can update themselves"
ON public.admins
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can delete themselves" ON public.admins;
CREATE POLICY "Admins can delete themselves"
ON public.admins
FOR DELETE
USING (auth.uid() = id);

-- Superadmins pueden actualizar/eliminar cualquier admin
DROP POLICY IF EXISTS "SuperAdmins can delete all admins" ON public.admins;
CREATE POLICY "SuperAdmins can delete all admins"
ON public.admins
FOR DELETE
USING (is_superadmin(auth.uid()));

DROP POLICY IF EXISTS "SuperAdmins can update all admins" ON public.admins;
CREATE POLICY "SuperAdmins can update all admins"
ON public.admins
FOR UPDATE
USING (is_superadmin(auth.uid()))
WITH CHECK (is_superadmin(auth.uid()));

-- Evitar que admins normales cambien su role
DROP POLICY IF EXISTS "Admins cannot change their role" ON public.admins;
CREATE POLICY "Admins cannot change their role"
ON public.admins
FOR UPDATE
USING (
    auth.uid() = id OR is_superadmin(auth.uid())
)
WITH CHECK (
    is_superadmin(auth.uid()) OR role = (
        SELECT role FROM public.admins WHERE id = auth.uid()
    )
);
