import Button from '../../components/Button.jsx';
import ProductList from '../../components/ProductList.jsx';
import products from '../../assets/product-content.js';

const ProductListPage = () => {
  return (
    <div className="flex w-full flex-col gap-12 bg-zinc-50 pb-20">
      <section className="border-y-2 border-emerald-900 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-[12px] font-black uppercase tracking-[0.4em] text-emerald-600">
            Our Market
          </p>
          <h1 className="max-w-2xl text-4xl font-black leading-tight text-emerald-950 sm:text-5xl">
            Fresh harvests directly from local farms.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-emerald-800/80">
            Browse seasonal vegetables, fresh fruits, and daily staples sourced responsibly from our partner communities.
          </p>
          <div className="mt-8">
            <Button to="/" variant="secondary" className="border-emerald-900 text-emerald-900 hover:bg-emerald-50">
              Back Home
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center sm:text-left">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600">
              Featured Harvest
            </p>
            <h2 className="mt-2 text-3xl font-black text-emerald-950">Market Catalog</h2>
          </div>

          <ProductList products={products} />
        </div>
      </section>
    </div>
  );
}

export default ProductListPage;