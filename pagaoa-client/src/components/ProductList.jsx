import ProductCard from "./ProductCard";

const ProductList = ({ products, onAdded }) => {
  if (!products.length) {
    return <p className="muted">No products available yet.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onAdded={onAdded} />
      ))}
    </div>
  );
};

export default ProductList;
