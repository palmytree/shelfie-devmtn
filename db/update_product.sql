UPDATE products
SET name = $2,
    price = $3,
    img = $4
WHERE id = $1;

SELECT * FROM products
ORDER BY id DESC;