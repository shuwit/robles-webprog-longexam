import { NavLink } from 'react-router-dom';
import logo from '../assets/img/nubdexchange_logo.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
];

const navLinkClassName = ({ isActive }) =>
  `rounded-full border-2 px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
    isActive
      ? 'border-emerald-900 bg-emerald-900 text-white shadow-[4px_4px_0px_0px_rgba(6,78,59,1)]'
      : 'border-transparent text-emerald-900 hover:border-emerald-900 hover:bg-emerald-50'
  }`;

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-emerald-900 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <NavLink to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <img src={logo} alt="Agrikultura" className="h-10 w-10 rounded-full border-2 border-emerald-900 bg-emerald-50 object-contain p-1" />
          <p className="text-2xl font-black tracking-tighter text-emerald-950">AGRIKULTURA</p>
        </NavLink>

        <nav className="hidden items-center gap-3 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/auth/signin" className="ml-4 rounded-full bg-emerald-600 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-emerald-700">
            Sign In
          </NavLink>
        </nav>  
      </div>
    </header>
  );
};

export default NavBar;