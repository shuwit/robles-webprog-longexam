import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-white px-4 text-center">
      <div className="relative mb-8">
        {/* Large Decorative 404 */}
        <h1 className="text-[12rem] font-black leading-none text-emerald-50/50 sm:text-[16rem]">
          404
        </h1>
        {/* Farmer Themed Message */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="mb-2 text-4xl">👨‍🌾</span>
          <h2 className="text-3xl font-bold text-emerald-900 sm:text-4xl">Lost in the fields?</h2>
        </div>
      </div>

      <div className="max-w-md">
        <p className="text-base leading-7 text-emerald-700">
          It looks like the crop you are looking for hasn't been planted yet, or the page has moved to a different farm.
        </p>
        
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button to="/" variant="primary" className="bg-emerald-600 border-emerald-900 hover:bg-emerald-700">
            Back to Marketplace
          </Button>
          <Button to="/products" className="border-emerald-900 text-emerald-900 hover:bg-emerald-50">
            Browse Harvests
          </Button>
        </div>
      </div>

      {/* Decorative Grass Border at bottom */}
      <div className="mt-20 flex gap-2 overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-4xl">🌱</span>
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;