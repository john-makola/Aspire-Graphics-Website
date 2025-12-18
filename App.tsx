
import React, { useState, useMemo, useEffect } from 'react';
import { Search, ShoppingBag, X, Trash2, ArrowRight, Package, CheckCircle2, Rocket, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Truck, Zap, Leaf, ChevronLeft, ChevronRight, Palette, Layers, Globe, CreditCard, Layout, PenTool, Monitor, Image, MousePointer2, Box, Star, Quote, Sparkles, Award, Clock, Instagram, Twitter, Linkedin, Facebook, FileText, Scale, Shield, Fingerprint, Network, Tag, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import DesignAssistant from './components/DesignAssistant';
import { CATEGORIES } from './constants';
import { Product, CartItem, Category, View, PortfolioItem } from './types';

const HERO_SLIDES = [
  {
    tag: "Eco-Friendly & High Precision",
    title: "Where Design Grows Beyond Boundaries.",
    desc: "Professional printing, visionary branding, and creative graphics powered by emerald-grade precision.",
    image: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=1920",
    color: "emerald"
  },
  {
    tag: "Next-Gen Branding",
    title: "Shape Your Identity with Modern Vision.",
    desc: "We craft iconic logos and brand guidelines that resonate in the digital age.",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bde3?auto=format&fit=crop&q=80&w=1920",
    color: "teal"
  },
  {
    tag: "Masterpiece Printing",
    title: "Tangible Excellence, Delivered Nationwide.",
    desc: "From massive banners to delicate cards, we translate your vision into physical perfection.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1920",
    color: "lime"
  }
];

const PORTFOLIO_HERO = [
  {
    title: "Digital Masterpieces",
    tag: "Creative Excellence",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200",
    desc: "A curated collection of our most impactful design journeys."
  },
  {
    title: "Visionary Branding",
    tag: "Industry Standard",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200",
    desc: "Where business strategy meets artistic expression."
  }
];

type LegalSection = 'privacy' | 'terms' | 'cookies' | 'sitemap';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [legalSubView, setLegalSubView] = useState<LegalSection>('privacy');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [portfolioHeroIndex, setPortfolioHeroIndex] = useState(0);
  const [portfolioFilter, setPortfolioFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  
  // Dynamic Catalog Data
  const [products, setProducts] = useState<Product[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch Data from JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setProducts(data.products || []);
        setPortfolioItems(data.portfolioItems || []);
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  // SEO Management
  useEffect(() => {
    const metaDescriptions: Record<string, string> = {
      home: "Aspire Graphics is a premier creative studio offering professional printing, visionary branding, and high-end graphic design solutions for modern businesses.",
      products: "Explore our extensive catalog of high-quality print products, from premium business cards to large scale signage and custom corporate apparel.",
      'creative-designs': "View our portfolio of award-winning design projects, branding case studies, and creative digital masterpieces crafted by our expert team.",
      contact: "Contact Aspire Graphics for custom design quotes, professional printing inquiries, and premium branding consultations. We bring your vision to life.",
      services: "Discover our comprehensive range of creative services including corporate identity systems, digital printing solutions, and signage production.",
      legal: "Privacy Policy, Terms of Service, and legal information for Aspire Graphics Creative Print & Branding Studio."
    };

    const titles: Record<string, string> = {
      home: "Aspire Graphics | Premium Print & Branding Studio",
      products: "Shop Premium Print & Graphics | Aspire Graphics Catalog",
      'creative-designs': "Portfolio & Design Case Studies | Aspire Graphics Excellence",
      contact: "Get a Quote & Contact Us | Aspire Graphics Print Studio",
      services: "Professional Design & Print Services | Aspire Graphics",
      legal: "Legal Information & Privacy | Aspire Graphics"
    };

    document.title = titles[currentView] || "Aspire Graphics | Premium Print & Branding";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", metaDescriptions[currentView] || metaDescriptions.home);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", titles[currentView] || titles.home);
    }
  }, [currentView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % HERO_SLIDES.length);
      setPortfolioHeroIndex(prev => (prev + 1) % PORTFOLIO_HERO.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, legalSubView]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  const filteredPortfolio = useMemo(() => {
    if (portfolioFilter === 'All') return portfolioItems;
    return portfolioItems.filter(item => item.category === portfolioFilter);
  }, [portfolioFilter, portfolioItems]);

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);
  const featuredDesigns = useMemo(() => portfolioItems.slice(0, 3), [portfolioItems]);
  const extraFeatured = useMemo(() => portfolioItems.slice(4, 7), [portfolioItems]);
  const spotlightProduct = products[3]; 

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: product.minQuantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setCart([]);
    setTimeout(() => {
      setOrderSuccess(false);
      setIsCartOpen(false);
    }, 4000);
  };

  const navigateToLegal = (section: LegalSection) => {
    setLegalSubView(section);
    setCurrentView('legal');
  };

  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`;
  };

  const renderView = () => {
    if (isLoadingData) {
      return (
        <div className="pt-40 h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Catalog...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-700 pt-24">
            {/* Fullscreen Hero Slider */}
            <section className="relative h-[calc(100vh-6rem)] w-full flex items-center justify-center overflow-hidden">
              {HERO_SLIDES.map((slide, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    idx === heroIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 pointer-events-none z-0'
                  }`}
                >
                  <img 
                    src={slide.image} 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Aspire Graphics Hero Visual" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                  <div className="relative h-full w-full flex items-center justify-center text-center px-4">
                    <div className="max-w-5xl space-y-8 animate-in slide-in-from-bottom-12 duration-1000">
                      <div className="inline-flex items-center gap-3 bg-emerald-600/30 backdrop-blur-md border border-emerald-500/50 px-6 py-2.5 rounded-full shadow-xl">
                        <Zap className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-black uppercase tracking-[0.2em] text-white">{slide.tag}</span>
                      </div>
                      <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tight drop-shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                        {slide.title.split(' ').map((word, i) => (
                          word === 'Grows' || word === 'Identity' || word === 'Tangible' || word === 'Excellence' ? (
                            <span key={i} className="green-gradient-text block md:inline drop-shadow-none"> {word} </span>
                          ) : ` ${word} `
                        ))}
                      </h1>
                      <p className="text-xl md:text-2xl text-white leading-relaxed max-w-2xl mx-auto font-bold drop-shadow-lg">
                        {slide.desc}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
                        <button onClick={() => setCurrentView('products')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-emerald-900/40 transition-all hover:scale-105 active:scale-95">
                          Explore Catalog
                        </button>
                        <button onClick={() => setCurrentView('creative-designs')} className="bg-white/20 backdrop-blur-md border-2 border-white/40 hover:border-white text-white px-10 py-5 rounded-2xl font-black text-xl transition-all hover:bg-white/40 active:scale-95 shadow-xl">
                          View Portfolio
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-12 left-0 right-0 z-30 flex flex-col items-center gap-8">
                <div className="flex gap-4">
                  {HERO_SLIDES.map((_, i) => (
                    <button key={i} onClick={() => setHeroIndex(i)} className={`h-2 transition-all rounded-full ${i === heroIndex ? 'w-16 bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'w-4 bg-white/50 hover:bg-white'}`} />
                  ))}
                </div>
                <div className="animate-bounce">
                   <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                   </div>
                </div>
              </div>
            </section>
            
            <section className="py-32 bg-slate-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 space-y-4">
                  <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-xs">The Aspire Advantage</span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900">Engineered for <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">Excellence.</span></h2>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-stretch">
                  <div className="md:col-span-8 group relative bg-white rounded-[3.5rem] p-12 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-[10rem] -z-0 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="bg-emerald-600 w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-emerald-200 mb-8 group-hover:rotate-6 transition-transform">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <div className="max-w-md">
                        <h3 className="text-3xl font-black text-slate-900 mb-4 italic">Premium Quality</h3>
                        <p className="text-xl text-slate-500 leading-relaxed font-medium">
                          Industry-leading color accuracy & stocks. We utilize the latest tech to ensure every print is perfect.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4 group relative bg-emerald-600 rounded-[3.5rem] p-12 shadow-2xl shadow-emerald-900/20 hover:-translate-y-2 transition-all duration-500 flex flex-col text-white">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-700/50 to-transparent -z-0"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="bg-white/20 backdrop-blur-md w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 border border-white/20 group-hover:scale-110 transition-transform">
                        <Clock className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-black mb-6 leading-tight">Lightning <br/>Fast Delivery</h3>
                      <p className="text-emerald-50 text-lg leading-relaxed font-medium">
                        Reliable delivery for urgent timelines across the region.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-32">
               <div className="max-w-7xl mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">Elite Print <span className="text-emerald-600">Solutions.</span></h2>
                    <button onClick={() => setCurrentView('products')} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-emerald-600 transition-all group">
                      Browse Full Catalog <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-4 gap-8">
                    {featuredProducts.map(p => (
                      <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
                    ))}
                  </div>
               </div>
            </section>

            {spotlightProduct && (
              <section className="py-32 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="relative bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-slate-100 group">
                    <div className="grid lg:grid-cols-2 items-center">
                      <div className="relative h-[400px] lg:h-[700px] overflow-hidden">
                        <img src={spotlightProduct.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" alt={spotlightProduct.name} />
                        <div className="absolute top-12 left-12">
                          <div className="bg-emerald-600 text-white px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-xl flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> Flagship Service
                          </div>
                        </div>
                      </div>
                      <div className="p-12 lg:p-24 space-y-10">
                        <div className="space-y-4">
                          <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs">Featured Highlight</span>
                          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]">{spotlightProduct.name}</h2>
                          <p className="text-xl text-slate-500 leading-relaxed font-medium">{spotlightProduct.description}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-8 pt-8 border-t border-slate-100">
                          <div>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">Starting from</span>
                            <span className="text-4xl font-black text-slate-900">{formatPrice(spotlightProduct.price)}</span>
                          </div>
                          <button onClick={() => addToCart(spotlightProduct)} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl transition-all active:scale-95">Add to Order</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        );

      case 'products':
        return (
          <div className="pt-40 pb-24 animate-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
                <aside className="w-full md:w-64 space-y-6">
                  <h3 className="font-bold text-lg mb-4 text-left">Categories</h3>
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${selectedCategory === cat ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                      {cat}
                    </button>
                  ))}
                </aside>
                <div className="flex-grow">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
                  </div>
                </div>
            </div>
          </div>
        );

      case 'creative-designs':
        return (
          <div className="animate-in fade-in duration-700 pt-24">
            <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-white">
              {PORTFOLIO_HERO.map((slide, idx) => (
                <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === portfolioHeroIndex ? 'opacity-100' : 'opacity-0'}`}>
                  <img src={slide.image} className="absolute inset-0 w-full h-full object-cover" alt="Portfolio Visual" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-transparent"></div>
                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="max-w-2xl space-y-6">
                      <div className="inline-block bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">{slide.tag}</div>
                      <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-xl">{slide.title}</h1>
                      <p className="text-xl text-white font-bold leading-relaxed drop-shadow-lg">{slide.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="py-24 bg-slate-50 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {featuredDesigns.map((item) => (
                    <div key={item.id} onClick={() => setSelectedProject(item)} className="group cursor-pointer bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-2xl transition-all duration-500">
                      <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                      </div>
                      <div className="space-y-3">
                         <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{item.category}</span>
                         <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                         <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );

      case 'services':
        return (
          <div className="pt-40 pb-24 animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20 space-y-4">
                <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-xs">Full Spectrum Creative</span>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">Our <span className="text-emerald-600 italic">Capabilities.</span></h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: 'Corporate Branding', icon: <Box className="w-10 h-10" />, desc: 'End-to-end brand identity development including strategy, logos, and guidelines.' },
                  { title: 'Digital Printing', icon: <Layers className="w-10 h-10" />, desc: 'High-speed, high-quality digital output for short runs and urgent marketing needs.' },
                  { title: 'Outdoor Signage', icon: <Monitor className="w-10 h-10" />, desc: 'Grand format printing for billboards, vehicle wraps, and architectural installations.' },
                  { title: 'Custom Apparel', icon: <Tag className="w-10 h-10" />, desc: 'Premium embroidery and screen printing for uniforms and promotional merch.' },
                  { title: 'UX/UI Design', icon: <Palette className="w-10 h-10" />, desc: 'Crafting digital experiences that bridge the gap between user needs and business goals.' },
                  { title: 'Packaging Design', icon: <Package className="w-10 h-10" />, desc: 'Sustainable and eye-catching structural packaging that protects and promotes.' }
                ].map((s, i) => (
                  <div key={i} className="bg-white p-12 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all group">
                    <div className="bg-emerald-50 text-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      {s.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-4">{s.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'legal':
        return (
          <div className="pt-40 pb-24 animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-16">
                <aside className="w-full md:w-72 shrink-0">
                  <div className="sticky top-32 space-y-4">
                    <div className="mb-8">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 text-left">Legal Center</h3>
                      <div className="h-1 w-12 bg-emerald-600 rounded-full"></div>
                    </div>
                    {[
                      { id: 'privacy', label: 'Privacy Policy', icon: <Shield className="w-4 h-4" /> },
                      { id: 'terms', label: 'Terms of Service', icon: <Scale className="w-4 h-4" /> },
                      { id: 'cookies', label: 'Cookie Settings', icon: <Fingerprint className="w-4 h-4" /> },
                      { id: 'sitemap', label: 'Sitemap', icon: <Network className="w-4 h-4" /> }
                    ].map((item) => (
                      <button key={item.id} onClick={() => setLegalSubView(item.id as LegalSection)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all group ${legalSubView === item.id ? 'bg-emerald-600 text-white shadow-xl translate-x-2' : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-600'}`}>
                        <span className={`p-2 rounded-lg transition-colors ${legalSubView === item.id ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-emerald-50'}`}>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </aside>
                <div className="flex-grow bg-white p-12 md:p-20 rounded-[3.5rem] shadow-sm border border-slate-100 min-h-[600px] text-left">
                  {legalSubView === 'privacy' && (
                    <article className="prose prose-slate max-w-none space-y-8">
                      <h2 className="text-4xl font-black">Privacy <span className="text-emerald-600">Policy.</span></h2>
                      <p className="text-lg text-slate-600 leading-relaxed">Your privacy is critically important to us at Aspire Graphics.</p>
                      <div className="space-y-6">
                        <h4 className="font-black text-xl">1. Information We Collect</h4>
                        <p className="text-slate-500">We only ask for personal information when we truly need it to provide a service to you.</p>
                      </div>
                    </article>
                  )}
                  {legalSubView === 'terms' && (
                    <article className="prose prose-slate max-w-none space-y-8">
                      <h2 className="text-4xl font-black">Terms of <span className="text-emerald-600">Service.</span></h2>
                      <p className="text-lg text-slate-600 leading-relaxed">By accessing the website at aspiregraphics.com, you are agreeing to these terms.</p>
                    </article>
                  )}
                  {legalSubView === 'cookies' && (
                    <article className="prose prose-slate max-w-none space-y-8">
                      <h2 className="text-4xl font-black">Cookie <span className="text-emerald-600">Settings.</span></h2>
                      <div className="space-y-6">
                         <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                           <div><h4 className="font-black">Necessary Cookies</h4><p className="text-sm text-slate-400">Essential for site function.</p></div>
                           <div className="w-12 h-6 bg-emerald-600 rounded-full relative"><div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full"></div></div>
                         </div>
                      </div>
                    </article>
                  )}
                  {legalSubView === 'sitemap' && (
                    <article className="prose prose-slate max-w-none space-y-8">
                      <h2 className="text-4xl font-black">Site <span className="text-emerald-600">Map.</span></h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-8">
                        <div>
                          <h4 className="font-black mb-4 text-emerald-600 uppercase text-xs tracking-widest">Main</h4>
                          <ul className="space-y-3 text-slate-500 font-bold">
                            <li className="hover:text-emerald-600 cursor-pointer" onClick={() => setCurrentView('home')}>Home</li>
                            <li className="hover:text-emerald-600 cursor-pointer" onClick={() => setCurrentView('products')}>Products</li>
                          </ul>
                        </div>
                      </div>
                    </article>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="pt-40 pb-24 animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20">
               <div className="space-y-12 text-left">
                 <h2 className="text-5xl font-black">Let's Create <span className="text-emerald-600">Together.</span></h2>
                 <p className="text-lg text-slate-500">From fully-fledged brand kits to small business essentials, we're here to help you flourish.</p>
                 <div className="space-y-8">
                    {[
                      { icon: <Mail className="w-6 h-6" />, label: 'Email', val: 'hello@aspiregraphics.com' },
                      { icon: <Phone className="w-6 h-6" />, label: 'Call', val: '+254 700 000000' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">{item.icon}</div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="font-bold text-slate-900">{item.val}</p>
                        </div>
                      </div>
                    ))}
                 </div>
               </div>
               <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
                  <form className="space-y-6">
                    <input type="text" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Your Name" />
                    <input type="email" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Email Address" />
                    <textarea rows={5} className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Tell us about your project..."></textarea>
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl">Send Message</button>
                  </form>
               </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        currentView={currentView}
        onNavigate={setCurrentView}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
        onCartToggle={() => setIsCartOpen(true)}
        onSearchOpen={() => setIsSearchOpen(true)}
      />
      {renderView()}
      
      {selectedProject && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setSelectedProject(null)}></div>
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
            <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 z-50 p-4 bg-white/80 backdrop-blur hover:bg-white rounded-full transition-all shadow-xl"><X className="w-6 h-6 text-slate-900" /></button>
            <div className="overflow-y-auto custom-scrollbar">
              <div className="grid lg:grid-cols-2">
                <div className="h-[400px] lg:h-full"><img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} /></div>
                <div className="p-12 lg:p-20 space-y-10 text-left">
                  <div className="space-y-4">
                    <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{selectedProject.category} Case Study</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">{selectedProject.title}</h2>
                  </div>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">{selectedProject.fullDescription}</p>
                  <div className="pt-10">
                    <button onClick={() => { setCurrentView('contact'); setSelectedProject(null); }} className="inline-flex items-center gap-3 bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl">Start a Similar Project <ArrowRight className="w-6 h-6" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* High-End Redesigned Footer */}
      <footer className="bg-slate-950 text-white pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-600/5 rounded-full blur-[150px] -z-0 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[120px] -z-0 -translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-4 space-y-8">
              <button onClick={() => setCurrentView('home')} className="flex items-center gap-3 group">
                <div className="bg-emerald-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-900/20 group-hover:rotate-12 transition-transform">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-2xl font-black tracking-tighter uppercase">Aspire<span className="text-emerald-500">Graphics</span></span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Creative Print Studio</span>
                </div>
              </button>
              <p className="text-slate-400 text-lg leading-relaxed font-medium text-left">
                Pioneering the future of visual communication. We blend high-end design with sustainable production to help your brand stand out.
              </p>
              <div className="flex items-center gap-4">
                {[<Instagram />, <Twitter />, <Linkedin />, <Facebook />].map((icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all group">{React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5' })}</button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8 text-left">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-500">Explore</h4>
              <ul className="space-y-4">
                {['Home', 'Products', 'Creative Designs', 'Contact'].map((item, i) => (
                  <li key={i}>
                    <button onClick={() => setCurrentView(item.toLowerCase().replace(' ', '-') as View)} className="text-slate-400 hover:text-white font-bold transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-8 text-left">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-500">Services</h4>
              <ul className="space-y-4 text-slate-400 font-bold">
                {['Corporate Branding', 'Digital Printing', 'Outdoor Signage', 'Custom Apparel', 'UX/UI Design'].map((item, i) => (
                  <li key={i} onClick={() => setCurrentView('services')} className="hover:text-white transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-10 text-left">
              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-500">Stay Updated</h4>
                <div className="relative group">
                  <input type="email" placeholder="Enter your email" className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-all" />
                  <button className="absolute right-2 top-2 bottom-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 rounded-xl font-black text-sm transition-all shadow-lg">Join</button>
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-3 text-slate-400 font-bold"><MapPin className="w-5 h-5 text-emerald-500 shrink-0" /><span>Creative Center, Nairobi, Kenya</span></div>
                <div className="flex items-center gap-3 text-slate-400 font-bold"><Phone className="w-5 h-5 text-emerald-500 shrink-0" /><span>+254 700 000000</span></div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 font-bold text-sm">
              &copy; {new Date().getFullYear()} Aspire Graphics Ltd.
            </div>
            <div className="flex flex-wrap items-center gap-8 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <button onClick={() => navigateToLegal('privacy')} className="hover:text-emerald-500 transition-colors">Privacy Policy</button>
              <button onClick={() => navigateToLegal('terms')} className="hover:text-emerald-500 transition-colors">Terms of Service</button>
              <button onClick={() => navigateToLegal('cookies')} className="hover:text-emerald-500 transition-colors">Cookie Settings</button>
              <button onClick={() => navigateToLegal('sitemap')} className="hover:text-emerald-500 transition-colors">Sitemap</button>
            </div>
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-6 h-24 flex items-center justify-between border-b border-slate-100">
              <h2 className="text-2xl font-black">Your Order</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-all"><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
               {cart.length > 0 ? cart.map(item => (
                 <div key={item.id} className="flex gap-4 mb-6 group text-left">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-2xl" alt={item.name} />
                    <div className="flex-grow">
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                         <span className="text-emerald-600 font-black">{formatPrice(item.price * item.quantity)}</span>
                         <div className="flex items-center gap-3 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                            <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-emerald-600 font-bold">-</button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-emerald-600 font-bold">+</button>
                         </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                 </div>
               )) : (
                 <div className="flex flex-col items-center justify-center py-24 text-center text-slate-400 font-bold"><ShoppingBag className="w-16 h-16 mb-6" /><p>Your cart is empty</p></div>
               )}
            </div>
            {cart.length > 0 && (
              <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                 <div className="flex justify-between mb-6 text-left"><span className="text-slate-500 font-bold text-left">Subtotal</span><span className="text-2xl font-black text-slate-900">{formatPrice(cartTotal)}</span></div>
                 <button onClick={handleCheckout} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-emerald-100 transition-all">Complete Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 z-[300] bg-white flex flex-col items-center pt-32 px-6 animate-in fade-in duration-300">
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-12 right-12 p-4 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-2xl transition-all"><X className="w-8 h-8" /></button>
          <div className="w-full max-w-4xl space-y-16">
            <div className="text-center"><h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">What are you <span className="text-emerald-600">looking for?</span></h2></div>
            <div className="relative group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-10 h-10 text-emerald-500" />
              <input autoFocus type="text" placeholder="Type to search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (setCurrentView('products'), setIsSearchOpen(false))} className="w-full bg-slate-50 border-4 border-transparent focus:border-emerald-500/10 focus:bg-white rounded-[3rem] px-24 py-10 text-3xl md:text-5xl font-black outline-none shadow-2xl transition-all" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
