import Button from '../../components/Button';
import logo from '../../assets/img/nubdexchange_logo.png';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-12 bg-zinc-50 pb-20">
      {/* SECTION 1: ABOUT HERO - Mission and Identity */}
      <section className="border-y-2 border-emerald-900 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Logo Branding Box */}
          <div className="rounded-[2.5rem] border-2 border-dashed border-emerald-300 bg-emerald-50 p-8 transition-colors hover:bg-white">
            <div className="flex min-h-[20rem] items-center justify-center rounded-3xl bg-white shadow-[8px_8px_0px_0px_rgba(6,78,59,1)] border-2 border-emerald-900">
              <img 
                src={logo} 
                alt="Agrikultura Logo" 
                className="h-40 w-40 rounded-full border-2 border-emerald-900 bg-white object-contain p-2" 
              />
            </div>
          </div>

          <div>
            <p className="mb-4 text-[12px] font-black uppercase tracking-[0.4em] text-emerald-600">
              Our Identity
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-emerald-950 sm:text-5xl">
              Empowering local farmers through direct commerce.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-emerald-800/80">
              Agrikultura is a dedicated e-commerce platform designed to bridge the gap between rural Filipino farms and urban tables. 
              We remove the middlemen to ensure farmers earn a fair wage while you receive the freshest produce possible.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/products" variant="primary" className="bg-emerald-600 border-emerald-900 px-8 py-4">
                Shop Harvest
              </Button>
              <Button to="/" className="border-emerald-900 text-emerald-900 hover:bg-emerald-50">
                Back Home
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK STORE BLOCKS - Impact Statistics */}
      <section className="border-y-2 border-emerald-900 bg-emerald-900 px-4 py-12 sm:px-6 lg:px-8 text-white">
        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400">
            Current Impact
          </p>
          <h2 className="mt-2 text-3xl font-black">Community overview</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Verified Farmers', value: '120+' },
            { label: 'Farm Locations', value: '06' },
            { label: 'Eco-Packaging', value: '100%' },
            { label: 'Direct Orders', value: '2.4k' },
          ].map((stat, i) => (
            <div key={i} className="rounded-3xl border-2 border-emerald-400 bg-emerald-950 p-8 transition-transform hover:-translate-y-2">
              <p className="text-4xl font-black text-white">{stat.value}</p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: STORE FLOW - How We Work */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.4em] text-emerald-600">
              The Process
            </p>
            <h2 className="mt-2 text-3xl font-black text-emerald-950">Sustainable shopping wireframe</h2>

            <div className="mt-10 space-y-6">
              {[
                { title: 'Farmer Selection', desc: 'We partner with small-scale farmers in Rizal, Batangas, and Benguet to bring diverse crops to the city.' },
                { title: 'Direct Logisitics', desc: 'Orders go straight to the farm, where produce is harvested specifically for your delivery slot.' },
                { title: 'Community Growth', desc: 'By buying direct, you help increase farmer income by up to 40% compared to traditional markets.' }
              ].map((item, i) => (
                <article key={i} className="rounded-3xl border-2 border-emerald-900 bg-white p-6 transition-all hover:shadow-[6px_6px_0px_0px_rgba(6,78,59,1)]">
                  <h3 className="text-xl font-black text-emerald-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-emerald-800/70">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Visual Category Grid */}
          <div className="rounded-[2.5rem] border-2 border-emerald-900 bg-emerald-50 p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-900">
              Harvest Gallery
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1550142411-12827fbc31c2?q=80&w=400&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=400&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400&auto=format&fit=crop'
              ].map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl border-2 border-emerald-900 transition-transform hover:scale-105">
                  <img src={img} alt="Harvest" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <Button to="/products" className="mt-8 w-full border-emerald-900 bg-emerald-600 text-white py-4 font-black">
              View All Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;