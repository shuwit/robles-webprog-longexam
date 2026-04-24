import Button from '../../components/Button';
import banner from '../../assets/img/nu_bulldogex_banner.jpg';

const HomePage = () => {
    return (
        <div className="flex w-full flex-col gap-12 bg-zinc-50 pb-20">
            {/* SECTION 1: HERO - Updated with Agrikultura Branding */}
            <section className="relative mx-4 mt-4 overflow-hidden rounded-[2.5rem] border-2 border-emerald-900 bg-emerald-900 min-h-[32rem]">
                <img
                    src={banner}
                    alt="Agrikultura Banner"
                    className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale-[20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-transparent" />

                <div className="relative z-10 flex h-full min-h-[32rem] flex-col items-start justify-center px-8 sm:px-16">
                    <p className="mb-4 text-[12px] font-black uppercase tracking-[0.4em] text-emerald-400">
                        Direct from Filipino Farms
                    </p>
                    <h1 className="max-w-2xl text-5xl font-black leading-[1.1] text-white sm:text-7xl">
                        Freshness <br/> Without Borders.
                    </h1>
                    <p className="mt-6 max-w-lg text-lg leading-relaxed text-emerald-50/80">
                        Bridging the gap between our local farmers and your table. Shop fresh 
                        harvests directly from the source.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <Button to="/products" className="bg-emerald-500 border-none px-8 py-4 text-xs hover:bg-emerald-400 text-emerald-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">
                            Shop Now
                        </Button>
                        <Button to="/about" variant="secondary" className="border-white text-white hover:bg-white hover:text-emerald-900">
                            About Store
                        </Button>
                    </div>
                </div>
            </section>

            {/* SECTION 2: QUICK SHOPPING BLOCKS - Refined with Enhancement 4 styles */}
            <section className="border-y-2 border-emerald-900 bg-white px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-10 text-center sm:text-left">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600">
                        Store Overview
                    </p>
                    <h2 className="mt-2 text-3xl font-black text-emerald-950">Quick shopping blocks</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: 'Fresh Products', value: '08' },
                        { label: 'Farm Categories', value: '04' },
                        { label: 'Daily Orders', value: '24' },
                        { label: 'Pickup Slots', value: '03' },
                    ].map((block, i) => (
                        <div key={i} className="rounded-3xl border-2 border-emerald-900 bg-emerald-50 p-8 transition-all hover:bg-white hover:shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]">
                            <p className="text-4xl font-black text-emerald-900">{block.value}</p>
                            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-500">
                                {block.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3: SIMPLE STORE CARDS - Maintained structure but updated theme */}
            <section className="border-y-2 border-emerald-900 bg-white px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-10 text-center sm:text-left">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600">
                        Shop Sections
                    </p>
                    <h2 className="mt-2 text-3xl font-black text-emerald-950">Simple store cards</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Card 1: Fresh Harvest */}
                    <article className="rounded-3xl border-2 border-emerald-900 bg-emerald-50 p-5 transition-all hover:bg-white hover:shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]">
                        <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] border-2 border-emerald-900 bg-emerald-200">
                             <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" alt="Vegetables" className="h-full w-full object-cover" />
                        </div>
                        <h3 className="mt-5 text-xl font-black text-emerald-950">Fresh Harvest</h3>
                        <p className="mt-3 text-sm leading-6 text-emerald-800/80">
                            Crisp vegetables and leafy greens harvested daily from local farms.
                        </p>
                        <Button to="/products" className="mt-6 w-full border-emerald-900 bg-emerald-600 text-white" variant="primary">
                            View Products
                        </Button>
                    </article>

                    {/* Card 2: Orchard Picks */}
                    <article className="rounded-3xl border-2 border-emerald-900 bg-emerald-50 p-5 transition-all hover:bg-white hover:shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]">
                        <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] border-2 border-emerald-900 bg-emerald-200">
                             <img src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=800&auto=format&fit=crop" alt="Fruits" className="h-full w-full object-cover" />
                        </div>
                        <h3 className="mt-5 text-xl font-black text-emerald-950">Orchard Picks</h3>
                        <p className="mt-3 text-sm leading-6 text-emerald-800/80">
                            Sweet, seasonal fruits ripened naturally under the Philippine sun.
                        </p>
                        <Button to="/products" className="mt-6 w-full border-emerald-900 bg-emerald-600 text-white" variant="primary">
                            Shop Fruits
                        </Button>
                    </article>

                    {/* Card 3: Grains & Staples */}
                    <article className="rounded-3xl border-2 border-emerald-900 bg-emerald-50 p-5 transition-all hover:bg-white hover:shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]">
                        <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] border-2 border-emerald-900 bg-emerald-200">
                             <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop" alt="Rice" className="h-full w-full object-cover" />
                        </div>
                        <h3 className="mt-5 text-xl font-black text-emerald-950">Grains & Staples</h3>
                        <p className="mt-3 text-sm leading-6 text-emerald-800/80">
                            High-quality local rice, corn, and staples essential for every home.
                        </p>
                        <Button to="/products" className="mt-6 w-full border-emerald-900 bg-emerald-600 text-white" variant="primary">
                            View Staples
                        </Button>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default HomePage;