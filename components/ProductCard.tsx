
import React from 'react';
import { Plus, Clock, Tag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`;
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex flex-col h-full text-left">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-emerald-600 border border-emerald-100 shadow-sm">
          {product.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-500" /> {product.deliveryTime}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3 text-emerald-500" /> Min: {product.minQuantity}
            </span>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xl font-black text-slate-900">
              {formatPrice(product.price)}
            </span>
            <button 
              onClick={() => onAddToCart(product)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-all shadow-lg shadow-emerald-200 active:scale-95"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
