
-- Función que verifica si un UID es superadmin
CREATE OR REPLACE FUNCTION is_super_admin(uid uuid) RETURNS boolean
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


-- Admins normales pueden insertar/actualizar/borrar según permisos
CREATE POLICY "Admins can insert categories"
ON public.categories
FOR INSERT
WITH CHECK (has_permission(auth.uid(),'insert'));

CREATE POLICY "Admins can update categories"
ON public.categories
FOR UPDATE
USING (has_permission(auth.uid(),'update'))
WITH CHECK (has_permission(auth.uid(),'update'));

CREATE POLICY "Admins can delete categories"
ON public.categories
FOR DELETE
USING (has_permission(auth.uid(),'delete'));

CREATE POLICY "SuperAdmins manage categories"
ON public.categories
FOR ALL
USING (is_super_admin(auth.uid()));

