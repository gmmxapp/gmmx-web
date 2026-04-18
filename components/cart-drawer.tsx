"use client";

import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, totalItems } = useCart();

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Cart Badge */}
      <button
        onClick={toggleDrawer}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 bg-[#FF5C73] text-white rounded-full shadow-[0_10px_40px_rgba(255,92,115,0.4)] flex items-center justify-center group hover:scale-110 active:scale-95 transition-all"
      >
        <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 h-6 w-6 bg-white text-[#FF5C73] rounded-full text-xs font-black flex items-center justify-center shadow-lg border-2 border-[#FF5C73]">
            {totalItems}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 right-0 w-full max-w-md bg-[#090910] border-l border-white/5 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#FF5C73]" size={24} />
                <h2 className="text-xl font-black text-white">Your Cart</h2>
              </div>
              <button 
                onClick={toggleDrawer}
                className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="font-bold text-slate-400">Your cart is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-[12px] font-black text-[#FF5C73] uppercase tracking-wider mb-1">{item.type}</p>
                      <h3 className="text-white font-bold">{item.name}</h3>
                      <p className="text-slate-400 font-bold mt-1 text-sm">{item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-500 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-rose-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-black/20">
                <div className="mb-6 space-y-2">
                   <div className="flex justify-between text-sm font-medium text-slate-400 uppercase tracking-widest">
                     <span>Estimated Total</span>
                     <span>Dynamic</span>
                   </div>
                   <p className="text-[10px] text-slate-500">Subject to tax and local variations.</p>
                </div>
                
                <Link
                  href="/signup"
                  onClick={toggleDrawer}
                  className="w-full h-16 bg-[#FF5C73] text-white rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(255,92,115,0.2)] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Proceed to Checkout <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
