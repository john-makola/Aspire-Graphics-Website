
import React from 'react';
import { ShoppingBag, Search, Menu, X, Rocket, ChevronDown } from 'lucide-react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  cartCount: number;
  onCartToggle: () => void;
  onSearchOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, cartCount, onCartToggle, onSearchOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks: { label: string; view: View }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Products', view: 'products' },
    { label: 'Creative Designs', view: 'creative-designs' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNav = (view: View) => {
    onNavigate(view);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-slate-100 shadow-md h-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-12">
            <button 
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 group transition-all"
            >
              <div className="bg-emerald-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-200 group-hover:scale-110 group-hover:rotate-12 transition-all">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
                  Aspire<span className="text-emerald-600">Graphics</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Creative Print Studio</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100 ml-4">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNav(link.view)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    currentView === link.view 
                      ? 'bg-white text-emerald-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Icons Section */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-100 mr-2">
              <button 
                onClick={onSearchOpen}
                className="p-3 text-slate-600 hover:bg-white hover:text-emerald-600 hover:shadow-sm rounded-xl transition-all flex items-center gap-2 group"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider pr-1">Search</span>
              </button>
            </div>

            <button 
              onClick={onCartToggle}
              className="relative p-4 bg-slate-900 text-white hover:bg-emerald-600 rounded-2xl transition-all shadow-xl shadow-slate-200 active:scale-95 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[11px] font-black w-6 h-6 flex items-center justify-center rounded-full border-4 border-white shadow-md animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-4 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-2xl transition-all"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-24 left-0 right-0 bg-white border-b border-slate-200 p-6 space-y-4 animate-in slide-in-from-top duration-300 shadow-2xl z-[90]">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => handleNav(link.view)}
              className={`flex items-center justify-between w-full px-6 py-4 rounded-2xl text-lg font-black transition-all ${
                currentView === link.view ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100' : 'bg-slate-50 text-slate-600'
              }`}
            >
              {link.label}
              <ChevronDown className={`w-5 h-5 transition-transform ${currentView === link.view ? '-rotate-90' : ''}`} />
            </button>
          ))}
          <div className="pt-4 grid grid-cols-2 gap-4">
             <button onClick={onSearchOpen} className="flex flex-col items-center gap-2 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <Search className="w-6 h-6 text-emerald-600" />
                <span className="text-xs font-black uppercase text-slate-400">Search</span>
             </button>
             <button onClick={onCartToggle} className="flex flex-col items-center gap-2 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <ShoppingBag className="w-6 h-6 text-emerald-600" />
                <span className="text-xs font-black uppercase text-slate-400">Cart ({cartCount})</span>
             </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
