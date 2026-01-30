
alter table public.admins
add column can_insert boolean default true,
add column can_update boolean default true,
add column can_delete boolean default false;

create policy "Admins can insert products"
on products
for insert
with check (
  exists (
    select 1 from public.admins
    where id = auth.uid() and can_insert = true
  )
);

create policy "Admins can update products"
on products
for update
using (
  exists (
    select 1 from public.admins
    where id = auth.uid() and can_update = true
  )
);

create policy "Admins can delete products"
on products
for delete
using (
  exists (
    select 1 from public.admins
    where id = auth.uid() and can_delete = true
  )
);

create policy "SuperAdmins can view all admins"
on public.admins
for select
using (
  exists (
    select 1 from public.admins
    where id = auth.uid() and role='superadmin'
  )
);

create policy "Admins can update themselves"
on public.admins
for update
using (auth.uid() = id);

create policy "Admins can delete themselves"
on public.admins
for delete
using (auth.uid() = id);

create policy "SuperAdmins can delete all admins"
on public.admins
for delete
using (
  exists (
    select 1 from public.admins
    where id = auth.uid() and role='superadmin'
  )
);

create policy "SuperAdmins can update all admins"
on public.admins
for update
using (
  exists (
    select 1 from public.admins
    where id = auth.uid() and role='superadmin'
  )
);

create policy "Admins cannot change their role"
on public.admins
for update
using (
  -- Solo puede actualizar su propio registro
  auth.uid() = id
  -- O es un superadmin (puede actualizar cualquier admin)
  or exists (
    select 1 from public.admins 
    where id = auth.uid() 
    and role = 'superadmin'
  )
)
with check (
  -- Si es superadmin, puede cambiar cualquier cosa (incluyendo roles)
  exists (
    select 1 from public.admins 
    where id = auth.uid() 
    and role = 'superadmin'
  )
  -- Si no es superadmin, el role no puede cambiar
  or role = (
    select role from public.admins where id = admins.id
  )
);
