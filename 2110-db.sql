CREATE TABLE products( 
    id SERIAL PRIMARY KEY,
    name_id VARCHAR(100),
    name VARCHAR(100),
    price INTEGER,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    stock INTEGER,
    description TEXT,
    thumbnail_url TEXT,
    outstanding BOOLEAN DEFAULT FALSE
);

CREATE TABLE products_extra_images (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    url TEXT NOT NULL,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name_id VARCHAR(100),
    name VARCHAR(100)
);

INSERT INTO products(name_id, name, price, stock, description, thumbnail_url, category_id)
VALUES ('', '', 0, 0, '', '', 1)

INSERT INTO categories(name_id, name)
VALUES ('', '')


# Categorias #
1 - cadenas
2 - rings
3 - earrings
