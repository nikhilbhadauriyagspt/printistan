import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  X, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Loader2, 
  Truck, 
  ChevronLeft, 
  Search, 
  History,
  ExternalLink,
  CreditCard,
  Box,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

// Helper component for product images in orders
function ProductImage({ item, getImagePath }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const existingImage = item.images || item.image || item.product_images || item.product_image || item.product?.images || item.product?.image;
    if (existingImage) {
      setImageUrl(getImagePath(existingImage));
      return;
    }

    const identifier = item.product_slug || item.slug;
    if (identifier) {
      fetch(`${API_BASE_URL}/products/${identifier}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data.images) {
            setImageUrl(getImagePath(data.data.images));
          }
        })
        .catch(() => {});
    }
  }, [item, getImagePath]);

  return (
    <img 
      src={imageUrl || "https://via.placeholder.com/400x400?text=Product"} 
      className="w-full h-full object-contain" 
      alt="" 
      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Product"; }}
    />
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'We have received your order request.' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your items are being prepared for dispatch.' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Your order has left our facility.' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Your items will arrive today.' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Order successfully delivered.' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  const getImagePath = (images) => {
    if (!images) return "https://via.placeholder.com/400x400?text=Product";
    try {
      if (typeof images === 'string') {
        if (images.startsWith('[') || images.startsWith('{')) {
          const imgs = JSON.parse(images);
          if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
        }
        return `/${images}`;
      }
      if (Array.isArray(images) && images.length > 0) return `/${images[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
        <SEO title="Track Order |Inktrix Printers" />
        
        <section className="pt-14 pb-16 bg-white border-b border-slate-50">
          <div className="w-full px-4 md:px-12 lg:px-20">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Track <span className="text-blue-600">Order</span>
              </h1>
              <div className="h-1.5 w-24 bg-blue-600 mt-5 rounded-full" />
              <p className="text-slate-500 text-lg font-bold mt-6 max-w-2xl leading-relaxed">
                Access real-time status updates and delivery logistics for your professional printing solutions.
              </p>
            </div>
          </div>
        </section>

        <section className=" min-h-[60vh] flex items-center justify-center">
          <div className="w-full px-4 max-w-[600px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-16 rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/50"
            >
              <form onSubmit={handleGuestSearch} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-900 ml-1">Registration Email</label>
                  <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      type="email" required placeholder="Enter your email address" value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
                
                <button className="w-full h-16 bg-slate-900 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-4">
                  Find Shipment <ArrowRight size={20} />
                </button>
              </form>
              
              <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 group">
                  Sign in for full history <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Order History |Inktrix Printers" />
      
      <section className="pt-14 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Purchase <span className="text-blue-600">History</span>
            </h1>
            <div className="h-1.5 w-24 bg-blue-600 mt-5 rounded-full" />
            <p className="text-slate-500 text-lg font-bold mt-6 max-w-2xl leading-relaxed">
              Manage your professional inventory and track real-time shipment logistics.
            </p>
          </div>
        </div>
      </section>

      <section className="min-h-screen">
        <div className="w-full px-4 md:px-12 lg:px-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-6" />
              <p className="text-slate-500 font-bold">Synchronizing Archives...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[40px] border border-slate-200 shadow-xl max-w-4xl mx-auto px-8">
              <Package size={64} className="mx-auto text-slate-200 mb-8" />
              <h2 className="text-3xl font-black text-slate-900 mb-4">No Inventory History</h2>
              <p className="text-slate-500 font-bold mb-10 text-lg">Your professional printer archive is currently empty.</p>
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-4 bg-blue-600 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95"
              >
                Explore Catalog <ArrowRight size={20} />
              </Link>
            </div>
          ) : (
            <div className="space-y-12 max-w-[1400px] mx-auto">
              <div className="flex items-center gap-3 text-sm font-black text-slate-400 uppercase tracking-widest bg-white px-8 py-4 rounded-2xl border border-slate-100 self-start shadow-sm w-fit">
                <History size={18} className="text-blue-600" /> {orders.length} Shipments Processed
              </div>

              <div className="space-y-10">
                {orders.map((order, orderIdx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    transition={{ delay: orderIdx * 0.1 }}
                    key={order.id} 
                    className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 hover:border-blue-600/30 transition-all duration-700 group"
                  >
                    <div className="px-8 md:px-12 py-10 border-b border-slate-100 flex flex-wrap items-center justify-between gap-10 bg-slate-50/30 group-hover:bg-white transition-colors">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 lg:gap-20">
                        <div>
                          <p className="text-xs font-black text-slate-400 mb-2 uppercase tracking-wide">Identifier</p>
                          <h3 className="text-base font-black text-slate-900 uppercase">#{order.order_code || order.id}</h3>
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-400 mb-2 uppercase tracking-wide">Logged On</p>
                          <p className="text-base font-black text-slate-900">
                            {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-400 mb-2 uppercase tracking-wide">Valuation</p>
                          <p className="text-xl font-black text-slate-900 tracking-tight">${parseFloat(order.total_amount).toLocaleString()}</p>
                        </div>
                        <div>
                           <p className="text-xs font-black text-slate-400 mb-2 uppercase tracking-wide">Status</p>
                          <div className={cn(
                            "inline-flex px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border",
                            order.status === 'delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"
                          )}>
                            {order.status.replace('_', ' ')}
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedOrder(order)} 
                        className="h-16 px-10 bg-slate-900 text-white rounded-full flex items-center justify-center gap-4 text-sm font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10"
                      >
                        Track Shipment <Truck size={20} />
                      </button>
                    </div>

                    <div className="px-8 md:px-12 py-12">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                          {order.items && order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-8 group/item">
                              <div className="h-24 w-24 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-4 shrink-0 group-hover/item:border-blue-600/30 group-hover/item:bg-white transition-all shadow-sm overflow-hidden">
                                <ProductImage item={item} getImagePath={getImagePath} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[15px] font-black text-slate-900 uppercase tracking-wide line-clamp-1 mb-2">{item.product_name}</h4>
                                <div className="flex items-center gap-4">
                                   <span className="text-xs font-bold text-slate-500">Qty: {item.quantity}</span>
                                   <div className="h-1 w-1 rounded-full bg-slate-300" />
                                   <span className="text-base font-black text-blue-600 tracking-tight">${parseFloat(item.price).toLocaleString()}</span>
                                </div>
                              </div>
                              <Link to={`/product/${item.product_slug}`} className="h-12 w-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 hover:text-blue-600 hover:border-blue-600 transition-all">
                                 <ExternalLink size={20} />
                              </Link>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-slate-50 rounded-[32px] p-10 border border-slate-200">
                           <div className="flex items-center justify-between mb-10">
                              <h5 className="text-sm font-black uppercase text-slate-900">Logistic Journey</h5>
                              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-white px-4 py-2 rounded-full border border-blue-50 shadow-sm">Live Protocol</span>
                           </div>
                           
                           <div className="relative pt-2 px-2">
                              <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-slate-200" />
                              <div 
                                className="absolute left-[11px] top-4 w-[2px] bg-blue-600 transition-all duration-1000" 
                                style={{ height: `${(getStatusIndex(order.status) / (statusMap.length - 1)) * 100}%` }}
                              />

                              <div className="space-y-10 relative">
                                {statusMap.slice(0, getStatusIndex(order.status) + 1).map((step, sIdx) => (
                                  <div key={sIdx} className="flex items-start gap-8">
                                     <div className="h-6 w-6 rounded-full bg-blue-600 border-4 border-white shadow-[0_0_0_1px_rgba(37,99,235,0.2)] z-10 mt-1 shrink-0" />
                                     <div className="flex-1">
                                        <h6 className="text-[13px] font-black uppercase text-slate-900">{step.label}</h6>
                                        <p className="text-xs font-bold text-slate-400 mt-1">{step.desc}</p>
                                     </div>
                                  </div>
                                ))}
                                {statusMap.slice(getStatusIndex(order.status) + 1).map((step, sIdx) => (
                                  <div key={sIdx} className="flex items-start gap-8 opacity-40">
                                     <div className="h-6 w-6 rounded-full bg-slate-300 border-4 border-white z-10 mt-1 shrink-0" />
                                     <div className="flex-1">
                                        <h6 className="text-[13px] font-black uppercase text-slate-400">{step.label}</h6>
                                     </div>
                                  </div>
                                ))}
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- ELITE TRACKING MODAL --- */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[1000]" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: '-45%', x: '-50%' }} 
              animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }} 
              exit={{ opacity: 0, scale: 0.9, y: '-45%', x: '-50%' }} 
              className="fixed top-1/2 left-1/2 w-full max-w-xl bg-white z-[1001] shadow-2xl rounded-[40px] p-10 md:p-16 border border-slate-100 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
              
              <div className="flex items-center justify-between mb-12 relative z-10">
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-blue-600">Active Tracking</span>
                   </div>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Shipment Status</h2>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="h-14 w-14 flex items-center justify-center bg-slate-50 rounded-2xl text-slate-900 hover:bg-slate-900 hover:text-white transition-all"><X size={24} /></button>
              </div>
              
              <div className="space-y-12 relative px-4 mb-12">
                <div className="absolute left-[39px] top-6 bottom-6 w-px bg-slate-100" />
                {statusMap.map((step, idx) => {
                  const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="relative flex gap-10 items-center">
                      <div className={cn(
                        "h-16 w-16 rounded-[20px] flex items-center justify-center z-10 transition-all duration-700 border-2", 
                        isCompleted ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-200 border-slate-100'
                      )}>
                        <Icon size={28} strokeWidth={isCompleted ? 2 : 1.5} />
                      </div>
                      <div className="flex-1">
                        <h4 className={cn("text-base font-black uppercase transition-colors duration-500", isCompleted ? 'text-slate-900' : 'text-slate-300')}>{step.label}</h4>
                        {isCompleted && (
                          <p className="text-xs font-bold mt-2 text-slate-500 leading-relaxed">{step.desc}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-6 relative z-10">
                 <button onClick={() => setSelectedOrder(null)} className="flex-1 h-16 bg-slate-900 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">Confirm Protocol</button>
                 <button className="h-16 w-16 flex items-center justify-center bg-slate-50 text-slate-900 rounded-[20px] hover:bg-slate-100 transition-all border border-slate-100"><CreditCard size={24} /></button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="pb-24 pt-12 flex justify-center bg-slate-50">
        <Link to="/shop" className="group inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Return to Catalog
        </Link>
      </div>
    </div>
  );
}
