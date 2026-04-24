import Button from './Button.jsx';

const ProductCard = ({ product, index }) => {
  return (
    <article className="group relative rounded-3xl border-2 border-emerald-900 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-emerald-900 bg-emerald-50">
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-full border-2 border-emerald-900 bg-emerald-100 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-900">
            {product.stock}
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
            {product.category}
          </p>
          <span className="text-[10px] font-bold text-emerald-900/30">
            #{String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="text-xl font-black leading-tight text-emerald-950">
          {product.title}
        </h3>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-emerald-700">{product.price}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40">/ unit</span>
        </div>

        {/* Failsafe added here */}
        <p className="line-clamp-2 text-sm leading-relaxed text-emerald-800/70">
          {product?.content?.[0] || "Fresh local produce."}
        </p>

        <Button 
          to={`/products/${product.name}`} 
          className="mt-4 w-full border-emerald-900 bg-emerald-600 py-4 text-xs font-black text-white hover:bg-emerald-700"
        >
          View Harvest
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;