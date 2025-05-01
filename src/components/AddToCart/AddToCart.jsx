"use client";

function AddToCart({ product }) {
  const handleAddCart = async () => {
    const results = await JSON.parse(localStorage.getItem("products"));
    if (results === null) {
      localStorage.setItem(
        "products",
        JSON.stringify([{ product: product, count: 1 }])
      );
    } else {
      const index = results.findIndex((item) => item.product.id === product.id);

      if (index > -1) {
        results[index].count++;
      } else {
        results.push({ product: product, count: 1 });
      }

      localStorage.setItem("products", JSON.stringify([...results]));
    }
  };

  return <button onClick={handleAddCart}>Add to Cart</button>;
}

export default AddToCart;
