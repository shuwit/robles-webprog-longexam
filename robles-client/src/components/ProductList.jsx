import ProductCard from './ProductCard.jsx';

const ProductList = ({ products }) => {
  // Failsafe if products array is missing
  if (!products || !Array.isArray(products)) {
    return <p className="text-emerald-900 font-bold">Loading harvests...</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.name} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductList;