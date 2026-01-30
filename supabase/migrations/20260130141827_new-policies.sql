CREATE policy "All users cand read products"
ON products
FOR SELECT
USING (true);

CREATE policy "All users cand read categories"
ON categories
FOR SELECT
USING (true);

CREATE policy "All users cand read products_extra_images"
ON products_extra_images
FOR SELECT
USING (true);