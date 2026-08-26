import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/Button.jsx";
import products from "../../assets/product-content.js";

const images = import.meta.glob("../../assets/img/*", {
  eager: true,
  import: "default",
});

const img = Object.fromEntries(
  Object.entries(images).map(([path, value]) => {
    const name = path.split("/").pop();
    return [name, value];
  }),
);

function ProductPage() {
  const { name } = useParams();
  const product = products.find((p) => p.name === name);

  useEffect(() => {
    window.scrollTo({
      top: 20,
      behavior: "smooth",
    });
  }, [name]);

  if (!product) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center bg-linear-to-b from-[#070546] to-[#0b0b2e] text-[#d4af37] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#d4af37]/20 bg-[#0b0b2e]/80 p-8 text-center shadow-2xl backdrop-blur-md">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37]/10">
            <span className="text-2xl">⚠️</span>
          </div>

          <h1 className="text-2xl font-bold tracking-wide">
            Product not found
          </h1>

          <p className="mt-2 text-sm text-[#d4af37]/70">
            The product you’re looking for doesn’t exist or may have been
            removed.
          </p>

          <Button
            to="/products"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[#d4af37] px-4 py-2 font-semibold text-[#070546] transition hover:scale-[1.02] hover:shadow-lg active:scale-95"
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col bg-[#070546] text-[#d4af37] min-h-screen">
      <section className="px-6 py-4 sm:px-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/60 p-4">
            {product.category}
          </p>

          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-2 flex gap-4 text-xs text-[#f5d98b]">
            <span className="font-bold text-[#d4af37]">{product.price}</span>
            <span>{product.stock}</span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto max-w-87.5 overflow-hidden rounded-xl bg-[#0b0a2f]">
            <img
              src={img[product.image]}
              alt={product.title}
              className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="mt-5 space-y-3">
            {product.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm leading-6 text-[#f5d98b]/80 whitespace-pre-wrap"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-6 flex gap-3 border-t border-[#d4af37]/20 pt-4">
            <Button onClick={() => alert(`${product.title} added to cart!`)} className="flex-1 bg-[#d4af37] text-[#070546] hover:bg-[#f5d98b]">
              Add to Cart
            </Button>

            <Button
              to="/products"
              className="flex-1 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#070546]"
            >
              Back to Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
