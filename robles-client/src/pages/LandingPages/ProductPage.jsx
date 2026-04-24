import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import products from '../../assets/product-content.js';

function ProductPage() {
  const { name } = useParams();
  const product = products.find(product => product.name === name);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-zinc-50 px-4">
        <h1 className="text-4xl font-black text-emerald-900">Harvest not found</h1>
        <Button to="/products" className="mt-6 border-emerald-900 bg-emerald-600 text-white hover:bg-emerald-700">
          Back to Market
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-12 bg-zinc-50 pb-20 pt-8">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          
          <div className="mb-8">
            <Button to="/products" className="border-none bg-transparent text-xs font-bold uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 hover:text-emerald-900">
              ← Back to Harvests
            </Button>
          </div>
          
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border-2 border-emerald-900 bg-emerald-50 shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]">
              <img 
                src={product.image} 
                alt={product.title} 
                className="h-full w-full object-cover" 
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-4 text-[12px] font-black uppercase tracking-[0.4em] text-emerald-600">
                {product.category}
              </p>
              <h1 className="text-4xl font-black leading-tight text-emerald-950 sm:text-5xl">
                {product.title}
              </h1>
              
              <div className="mt-6 flex items-center gap-4">
                <span className="text-4xl font-black text-emerald-700">{product.price}</span>
                <span className="rounded-full border-2 border-emerald-900 bg-emerald-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-900">
                  {product.stock}
                </span>
              </div>

              <div className="mt-8 space-y-6 text-base leading-relaxed text-emerald-800/80">
                {/* Failsafe mapping */}
                {product.content?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4 border-t-2 border-emerald-900/10 pt-8">
                <Button 
                  variant="primary" 
                  className="border-emerald-900 bg-emerald-600 px-8 py-4 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(6,78,59,1)] transition-all hover:translate-y-1 hover:translate-x-1 hover:bg-emerald-700 hover:shadow-none"
                >
                  Add to Basket
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;