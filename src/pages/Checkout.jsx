import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  Lock,
  MapPin,
  Mail,
  Loader2,
  CheckCircle2,
  Package,
  Phone,
  Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Checkout() {
  const paypalOptions = {
    "client-id": "Aa7mAnBKh44YCdokTrFjIP1wIB6mVVjrN8z-NZc_G2VLYJle_Xz9pMdOO7DRXx7zYT7Gh0dzbJUY9DDm",
    currency: "USD",
    intent: "capture"
  };

  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
 
  const user = JSON.parse(localStorage.getItem('user') || 'null');
 
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod', 
  });
 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        phone: user.phone || '',
      }));
    }
 
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
         
          if (data && data.address) {
            const addr = data.address;
            setFormData(prev => ({
              ...prev,
              city: addr.city || addr.town || addr.village || addr.suburb || '',
              zipCode: addr.postcode || '',
              address: `${addr.road || ''} ${addr.neighbourhood || addr.suburb || ''}`.trim() || data.display_name.split(',')[0]
            }));
          }
        } catch (err) { }
      });
    }
  }, []);
 
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subtotal = total;
 
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        user_id: user?.id,
        total: total,
        items: cart,
        payment_details: paymentDetails,
        source: 'printistan.shop',
      };
 
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
 
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id || data.data?.order_code || data.data?.id);
        setStep(3);
        clearCart();
      } else {
        alert(data.message || 'Error placing order.');
      }
    } catch (err) {
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (step === 1) {
        window.scrollTo(0, 0);
        setStep(2);
    }
    else if (formData.paymentMethod === 'cod') await handleOrderSuccess();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/100x100?text=Product";
  };
 
  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white font-['Poppins']">
        <div className="text-center max-w-md">
            <Package size={48} className="text-slate-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Cart is empty</h2>
            <p className="text-slate-500 mb-8">Add items to your selection before checkout.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all active:scale-95 shadow-lg">
                Shop Now
            </Link>
        </div>
      </div>
    );
  }
 
  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20 px-6 font-['Poppins'] text-slate-900">
        <SEO title="Order Confirmed | Printistan" />
        <div className="max-w-[500px] w-full text-center space-y-8 p-10 border border-slate-200 shadow-2xl shadow-blue-900/5">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-20 w-20 bg-green-50 text-green-600 flex items-center justify-center mx-auto border border-green-100">
            <CheckCircle2 size={40} />
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
                Thank you for your purchase. Order ID: <span className="font-bold text-slate-900">#{orderId}</span>.
                We've sent a confirmation to <span className="font-bold text-slate-900">{formData.email}</span>.
            </p>
          </div>
          <div className="pt-4 flex flex-col gap-3">
            <Link to="/orders" className="w-full h-14 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center shadow-lg hover:bg-slate-900 transition-all">
              Track My Order
            </Link>
            <Link to="/" className="w-full h-14 bg-white border border-slate-900 text-slate-900 font-bold text-sm uppercase tracking-widest flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Poppins'] text-slate-900 pt-32 pb-24">
      <SEO title="Secure Checkout | Printistan" />
      
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-12 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
                {[1, 2].map((s) => (
                    <div key={s} className={cn("h-1 w-10 transition-all duration-500", step >= s ? "bg-blue-600" : "bg-slate-100")} />
                ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {step === 1 ? 'Shipping Info' : 'Payment Method'}
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-2 uppercase tracking-widest">Step {step} of 2 — Secure Checkout</p>
          </div>
          
          <div className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 border border-blue-100 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck size={16} /> SSL Encrypted
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT: STEP CONTENT --- */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                      <Mail size={20} className="text-blue-600" />
                      <h2 className="text-xl font-bold uppercase tracking-widest">Contact Info</h2>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Email Address</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@example.com" className="w-full h-12 px-4 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all" />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                      <MapPin size={20} className="text-blue-600" />
                      <h2 className="text-xl font-bold uppercase tracking-widest">Shipping Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">First Name</label>
                        <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full h-12 px-4 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Last Name</label>
                        <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full h-12 px-4 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Street Address</label>
                      <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full h-12 px-4 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">City</label>
                        <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full h-12 px-4 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Zip Code</label>
                        <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full h-12 px-4 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Phone Number</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full h-12 px-4 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all" />
                    </div>
                  </div>
                  <button type="submit" className="w-full h-14 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-blue-100">
                    Continue <ArrowRight size={18} />
                  </button>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                      <CreditCard size={20} className="text-blue-600" />
                      <h2 className="text-xl font-bold uppercase tracking-widest">Select Payment</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { id: 'paypal', label: 'PayPal / Card', icon: CreditCard, desc: 'Secure payment via PayPal or Credit Card.' },
                            { id: 'cod', label: 'Cash on Delivery', icon: Wallet, desc: 'Pay with cash upon package arrival.' }
                        ].map((method) => (
                            <div 
                                key={method.id} onClick={() => setFormData({...formData, paymentMethod: method.id})}
                                className={cn(
                                    "p-6 border transition-all cursor-pointer flex items-center justify-between",
                                    formData.paymentMethod === method.id ? "border-blue-600 bg-blue-50/10 shadow-lg shadow-blue-900/5" : "border-slate-200 bg-white hover:border-blue-400"
                                )}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={cn("h-5 w-5 border-2 flex items-center justify-center", formData.paymentMethod === method.id ? "border-blue-600" : "border-slate-300")}>
                                        {formData.paymentMethod === method.id && <div className="h-2.5 w-2.5 bg-blue-600" />}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-bold text-slate-900 uppercase ">{method.label}</p>
                                        <p className="text-[11px] text-slate-500 font-medium">{method.desc}</p>
                                    </div>
                                </div>
                                <method.icon size={20} className={cn(formData.paymentMethod === method.id ? "text-blue-600" : "text-slate-300")} />
                            </div>
                        ))}
                    </div>
                  </div>

                  <div className="pt-4 space-y-6 flex flex-col items-center">
                    {formData.paymentMethod === 'paypal' ? (
                        <div className="relative z-10 w-full max-w-md mx-auto">
                            <PayPalScriptProvider options={paypalOptions}>
                                <PayPalButtons 
                                    style={{ layout: "vertical", shape: "pill", label: "pay" }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [{
                                                amount: { value: total.toString() }
                                            }]
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            handleOrderSuccess(details);
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        </div>
                    ) : (
                        <button type="submit" disabled={loading} className="w-full max-w-md h-14 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-100">
                            {loading ? <Loader2 size={20} className="animate-spin" /> : "Complete Order"}
                            {!loading && <CheckCircle2 size={20} />}
                        </button>
                    )}
                    
                    <button type="button" onClick={() => setStep(1)} className="w-full h-12 text-slate-400 font-bold text-xs flex items-center justify-center gap-3 hover:text-blue-600 transition-all uppercase tracking-widest">
                        <ChevronLeft size={16} /> Back to Shipping
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- RIGHT: SUMMARY --- */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 p-8 md:p-10 border border-slate-200 space-y-8 sticky top-32 shadow-2xl shadow-blue-900/5">
              <h2 className="text-xl font-bold uppercase tracking-widest border-b border-slate-200 pb-4 text-slate-900">Summary</h2>
              <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-5">
                    <div className="h-16 w-16 bg-white border border-slate-200 p-2 shrink-0 flex items-center justify-center">
                      <img src={getImagePath(item.images)} className="max-h-full max-w-full object-contain mix-blend-multiply" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-xs font-bold line-clamp-1 uppercase text-slate-800">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold flex items-center text-slate-900">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="h-px bg-slate-200 w-full" />
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em]">Total</span>
                  <span className="text-4xl font-bold text-blue-600 leading-none ">${total.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 text-slate-300">
                <Lock size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secured Gateway</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
