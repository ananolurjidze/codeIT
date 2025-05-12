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

  return <button onClick={handleAddCart} 
   style={{
        border:"1px solid black",
        borderRadius:"10px",
        background:"grey",
        width:"81px",
        height:"30px",
        marginTop:"20px",
   }}
  >Add to Cart</button>;
}

export default AddToCart;
