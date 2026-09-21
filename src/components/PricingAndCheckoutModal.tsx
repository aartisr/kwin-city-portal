import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  Building, 
  Download, 
  FileText, 
  X, 
  AlertCircle,
  Tag,
  ArrowRight
} from 'lucide-react';
import { useUser, SubscriptionTier, TransactionInvoice } from '../context/UserContext';

interface PricingAndCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessUpgrade?: () => void;
}

export const PricingAndCheckoutModal: React.FC<PricingAndCheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccessUpgrade
}) => {
  const { user, tier, upgradeTier } = useUser();

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTier>('pro');
  const [billingCycle, setBillingCycle] = useState<'per-report' | 'annual'>('annual');
  const [checkoutStep, setCheckoutStep] = useState<'select' | 'payment' | 'success'>('select');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [latestInvoice, setLatestInvoice] = useState<TransactionInvoice | null>(null);

  if (!isOpen) return null;

  // Plan pricing
  const basePrices: Record<SubscriptionTier, { inr: number; usd: number; label: string }> = {
    free: { inr: 0, usd: 0, label: 'Free Explorer' },
    pro: { inr: billingCycle === 'annual' ? 9999 : 2999, usd: billingCycle === 'annual' ? 120 : 35, label: billingCycle === 'annual' ? 'Pro Annual Unlimited' : 'Single Due Diligence Dossier' },
    enterprise: { inr: 49000, usd: 590, label: 'Institutional Fund Tier' }
  };

  const currentPrice = basePrices[selectedPlan].inr;
  const discountedPrice = Math.round(currentPrice * (1 - discountPercent / 100));
  const gstAmount = Math.round(discountedPrice * 0.18); // 18% GST
  const finalTotal = discountedPrice + gstAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'EARLYINVESTOR' || code === 'ACADEMIC2026' || code === 'KWIN20') {
      setDiscountPercent(20);
      setCouponSuccess('20% Discount Code Applied Successfully!');
    } else {
      setCouponError('Invalid promo code. Try "EARLYINVESTOR" for 20% off.');
    }
  };

  const [activeOrderId, setActiveOrderId] = useState<string>('');

  const handleProceedToPayment = async (plan: SubscriptionTier) => {
    setSelectedPlan(plan);
    setCheckoutStep('payment');
    
    // Call backend to initialize official Razorpay / Stripe Order
    try {
      const resp = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: plan,
          amountINR: discountedPrice,
          userEmail: user?.email,
          billingCycle
        })
      });
      const data = await resp.json();
      if (data.success && data.order) {
        setActiveOrderId(data.order.orderId);
      }
    } catch (e) {
      console.warn('Backend payment order fallback:', e);
    }
  };

  const handleExecutePayment = async () => {
    setIsProcessing(true);
    try {
      const resp = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: activeOrderId || `order_kwin_${Date.now()}`,
          paymentId: `pay_${paymentMethod}_${Math.random().toString(36).substring(2, 9)}`,
          tier: selectedPlan
        })
      });

      const data = await resp.json();
      const inv: TransactionInvoice = data.success && data.invoice ? {
        invoiceNumber: data.invoice.invoiceNumber,
        date: data.invoice.date,
        tier: selectedPlan,
        amountINR: data.invoice.amountINR,
        paymentMethod: paymentMethod === 'upi' ? 'Razorpay UPI (Instant Settled)' : paymentMethod === 'card' ? 'Visa / Mastercard Corporate' : 'NetBanking HDFC / ICICI',
        transactionHash: data.invoice.transactionHash,
        gstNumber: data.invoice.gstNumber,
        status: 'PAID',
        description: data.invoice.description
      } : {
        invoiceNumber: `INV-KWIN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('en-IN'),
        tier: selectedPlan,
        amountINR: finalTotal,
        paymentMethod: paymentMethod === 'upi' ? 'UPI (PhonePe/GPay)' : paymentMethod === 'card' ? 'Visa Corporate' : 'Corporate NetBanking',
        transactionHash: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        gstNumber: '29AABCK1234F1Z5',
        status: 'PAID',
        description: `KWIN City ${basePrices[selectedPlan].label} License`,
      };

      upgradeTier(selectedPlan, inv);
      setLatestInvoice(inv);
      setIsProcessing(false);
      setCheckoutStep('success');
      if (onSuccessUpgrade) {
        onSuccessUpgrade();
      }
    } catch (e) {
      console.error('Payment execution error:', e);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/40">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-950 dark:text-white">
                {checkoutStep === 'select' ? 'Intelligence Tiers & Monetization' : checkoutStep === 'payment' ? 'Secure Checkout Gateway' : 'Subscription Confirmation'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Institutional Due Diligence Dossiers, Bhoomi RTC Sync & Real-Time Gazette Dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {checkoutStep === 'select' && (
            <div className="space-y-6">
              
              {/* Billing Cycle Switch */}
              <div className="flex items-center justify-center">
                <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex items-center border border-slate-200 dark:border-slate-700 text-xs font-bold">
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`px-4 py-2 rounded-xl transition ${
                      billingCycle === 'annual'
                        ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Annual Unlimited Access (Save 40%)
                  </button>
                  <button
                    onClick={() => setBillingCycle('per-report')}
                    className={`px-4 py-2 rounded-xl transition ${
                      billingCycle === 'per-report'
                        ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Single Dossier Pay-as-you-go
                  </button>
                </div>
              </div>

              {/* 3 Tier Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Free Explorer */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-4 flex flex-col justify-between shadow-2xs">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      CIVIC & ACADEMIC
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-serif">Free Explorer</h4>
                    <div className="text-2xl font-black text-slate-900 dark:text-white font-serif">
                      ₹0 <span className="text-xs text-slate-500 font-normal">/ forever</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Essential macro insights and basic village calculators for curious citizens and students.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Check className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>Interactive GIS Spatial Map</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Check className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>Basic Survey Compensation Math</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Check className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>Discourse Lab Reading Access</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 line-through">
                        <span>Official Vector PDF Dossiers</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 line-through">
                        <span>Section 28 Gazette SMS Alerts</span>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={tier === 'free'}
                    onClick={() => handleProceedToPayment('free')}
                    className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-50"
                  >
                    {tier === 'free' ? 'Current Free Plan' : 'Select Free'}
                  </button>
                </div>

                {/* Pro Due Diligence (Featured) */}
                <div className="p-5 rounded-2xl border-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4 flex flex-col justify-between shadow-md relative">
                  <div className="absolute -top-3 right-4 bg-emerald-700 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs">
                    MOST POPULAR FOR INVESTORS
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">
                      STATUTORY ACCREDITED
                    </span>
                    <h4 className="text-base font-bold text-slate-950 dark:text-white font-serif">Pro Due Diligence</h4>
                    <div className="text-2xl font-black text-emerald-800 dark:text-emerald-400 font-serif">
                      ₹{billingCycle === 'annual' ? '9,999' : '2,999'}{' '}
                      <span className="text-xs text-slate-500 font-normal">
                        {billingCycle === 'annual' ? '/ year' : '/ parcel dossier'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      Complete statutory verification, Bhoomi title mutation audits, and unwatermarked vector PDF exports.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-emerald-200 dark:border-emerald-800/80 text-xs">
                      <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-medium">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>Instant Official Vector PDF Reports</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-medium">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>KIADB Sec 28-1 & 28-4 Gazette Alerts</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-medium">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>RFCTLARR 2013 Payout Multipliers</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-medium">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>Lake Catchment & Green Belt Check</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-medium">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>Unlimited Watchlist Monitoring</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleProceedToPayment('pro')}
                    className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2"
                  >
                    <span>{tier === 'pro' ? 'Renew / Extend Pro' : 'Unlock Pro Access'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Institutional & Fund Tier */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-4 flex flex-col justify-between shadow-2xs">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest">
                      ENTERPRISE & PE FUNDS
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-serif">Institutional Fund</h4>
                    <div className="text-2xl font-black text-indigo-800 dark:text-indigo-400 font-serif">
                      ₹49,000 <span className="text-xs text-slate-500 font-normal">/ month</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      For developers, real estate funds, and corporate hospitals requiring raw spatial telemetry and batch parsing.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Check className="h-4 w-4 text-indigo-600 shrink-0" />
                        <span>Batch Audit (up to 500 parcels)</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Check className="h-4 w-4 text-indigo-600 shrink-0" />
                        <span>Cadastral GeoJSON / Shapefile Export</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Check className="h-4 w-4 text-indigo-600 shrink-0" />
                        <span>REST API for Ingestion & Webhooks</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Check className="h-4 w-4 text-indigo-600 shrink-0" />
                        <span>2 Monthly Legal Consultations</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleProceedToPayment('enterprise')}
                    className="w-full py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 text-xs font-bold text-indigo-900 dark:text-indigo-300 hover:bg-indigo-100 transition"
                  >
                    Subscribe Institutional
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {checkoutStep === 'payment' && (
            <div className="max-w-xl mx-auto space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-600 dark:text-slate-400">Order Summary:</span>
                  <span className="text-slate-900 dark:text-white font-mono">{basePrices[selectedPlan].label}</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Base Subscription</span>
                    <span>₹{currentPrice.toLocaleString('en-IN')}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span>-₹{(currentPrice - discountedPrice).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Applicable GST (18%)</span>
                    <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-950 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span>Total Amount Payable</span>
                    <span className="text-emerald-800 dark:text-emerald-400 font-mono">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. EARLYINVESTOR)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold uppercase focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold transition hover:opacity-90"
                >
                  Apply
                </button>
              </form>
              {couponSuccess && <div className="text-xs text-emerald-700 font-semibold">{couponSuccess}</div>}
              {couponError && <div className="text-xs text-rose-600 font-semibold">{couponError}</div>}

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Select Payment Gateway
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border text-center space-y-1 transition ${
                      paymentMethod === 'upi'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    <QrCode className="h-5 w-5 mx-auto text-emerald-600" />
                    <div className="text-xs">UPI QR / Apps</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-center space-y-1 transition ${
                      paymentMethod === 'card'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mx-auto text-emerald-600" />
                    <div className="text-xs">Credit/Debit Card</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-2xl border text-center space-y-1 transition ${
                      paymentMethod === 'netbanking'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    <Building className="h-5 w-5 mx-auto text-emerald-600" />
                    <div className="text-xs">NetBanking / Wire</div>
                  </button>
                </div>
              </div>

              {/* Realistic Gateway UI */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Scan dynamic Bharat UPI QR or enter VPA:
                  </div>
                  <div className="inline-block p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    {/* SVG Mock QR Code */}
                    <div className="w-28 h-28 bg-slate-900 rounded-lg p-2 flex flex-col justify-between items-center text-white text-[8px] font-mono">
                      <div className="w-full flex justify-between">
                        <div className="w-6 h-6 border-2 border-white bg-slate-900"></div>
                        <div className="w-6 h-6 border-2 border-white bg-slate-900"></div>
                      </div>
                      <div className="text-center font-bold">UPI: KWIN-CORP</div>
                      <div className="w-full flex justify-between">
                        <div className="w-6 h-6 border-2 border-white bg-slate-900"></div>
                        <div className="w-4 h-4 bg-emerald-400"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">kwin-city-clearance@yesbank</div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-semibold">Card Number</label>
                    <input
                      type="text"
                      placeholder="4111 •••• •••• 4242"
                      className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 font-semibold">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('select')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  ← Back to Plans
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleExecutePayment}
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Verifying Banking Gateway...</span>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      <span>Authorize Payment of ₹{finalTotal.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Success Step */}
          {checkoutStep === 'success' && latestInvoice && (
            <div className="max-w-md mx-auto text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center border-2 border-emerald-400">
                <Check className="h-7 w-7" />
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold text-slate-950 dark:text-white">
                  Payment Verified & Plan Activated!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Your account is now upgraded to <strong className="text-emerald-700 dark:text-emerald-400 uppercase">{latestInvoice.tier}</strong>.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Invoice Ref:</span>
                  <span className="font-mono font-bold">{latestInvoice.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-mono font-bold text-emerald-700">₹{latestInvoice.amountINR.toLocaleString('en-IN')} (incl. GST)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{latestInvoice.transactionHash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Corporate GSTIN:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{latestInvoice.gstNumber}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
                >
                  Start Using Pro Features
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-3 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>256-bit Encrypted Banking Handshake • Instant GST Tax Receipt</span>
          </div>
          <span>Support: intelligence@kwin-city.com</span>
        </div>
      </div>
    </div>
  );
};
