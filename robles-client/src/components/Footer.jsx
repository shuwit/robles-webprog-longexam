import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t-2 border-emerald-900 bg-emerald-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-black tracking-tighter text-emerald-900">
              AGRIKULTURA
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-emerald-800">
              Directly connecting Filipino farmers to your kitchen. Fresh harvests, fair prices, and sustainable community growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-900">Navigation</h4>
            <ul className="mt-4 space-y-2 text-sm text-emerald-700">
              <li><Link autoFocus to="/" className="hover:text-emerald-900 hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:text-emerald-900 hover:underline">Our Mission</Link></li>
              <li><Link to="/products" className="hover:text-emerald-900 hover:underline">Fresh Harvest</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-900">Farmer Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-emerald-700">
              <li><Link to="/auth/signin" className="hover:text-emerald-900 hover:underline">Partner Login</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-900 hover:underline">Shipping Info</Link></li>
              <li><p className="font-semibold text-emerald-800">San Jose Delmote / Bulacan</p></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t-2 border-emerald-900/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-medium uppercase tracking-widest text-emerald-600">
            © 2026 Agrikultura PH. Helping Farmers Succeed.
          </p>
          <div className="flex gap-6">
             <span className="text-[10px] font-bold text-emerald-900">SECURED CHECKOUT</span>
             <span className="text-[10px] font-bold text-emerald-900">FRESH GUARANTEE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;