CREATE policy "SuperAdmins can manage all products"
on products
for all
using (
  exists (
    select 1 from public.admins
    where id = auth.uid() and role = 'superadmin'
  )
)
with check (
  exists (
    select 1 from public.admins
    where id = auth.uid() and role = 'superadmin'
  )
);
