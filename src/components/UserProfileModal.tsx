import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Crown, 
  Receipt, 
  X, 
  LogOut, 
  Sparkles,
  Download,
  Building,
  Check
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPricing: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenPricing
}) => {
  const { user, tier, invoices, login, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [org, setOrg] = useState(user?.organization || '');
  const [role, setRole] = useState(user?.role || 'Land Investor');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name,
      organization: org,
      role: role as any,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsEditing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-950 dark:text-white">
                Investor Profile & Account Center
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage your credentials, subscription level, and statutory billing receipts
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

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          
          {/* Subscription Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-300 dark:border-emerald-800/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                {tier === 'enterprise' ? <Crown className="h-5 w-5" /> : tier === 'pro' ? <Sparkles className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold">
                  Active Subscription Tier
                </div>
                <div className="text-base font-bold text-slate-950 dark:text-white uppercase font-serif">
                  {tier} Member
                </div>
              </div>
            </div>

            {tier === 'free' ? (
              <button
                onClick={onOpenPricing}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
              >
                Upgrade to Pro
              </button>
            ) : (
              <button
                onClick={onOpenPricing}
                className="px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-900 text-xs font-bold text-emerald-800 dark:text-emerald-300"
              >
                Change Plan
              </button>
            )}
          </div>

          {/* User Details */}
          {!isEditing ? (
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Account Information</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                >
                  Edit Details
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-600 dark:text-slate-400">
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-400">Full Name</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{user.name}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-400">Email Address</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5 font-mono">{user.email}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-400">Primary Role</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{user.role}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-400">Organization</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{user.organization || 'Independent Individual'}</div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3 text-xs">
              <div className="font-bold text-slate-900 dark:text-white">Edit Profile Details</div>
              <div>
                <label className="text-slate-600 dark:text-slate-400">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2 font-bold"
                />
              </div>
              <div>
                <label className="text-slate-600 dark:text-slate-400">Organization / Fund</label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2"
                />
              </div>
              <div>
                <label className="text-slate-600 dark:text-slate-400">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2 font-bold"
                >
                  <option value="Land Investor">Land Investor</option>
                  <option value="Urban Researcher">Urban Researcher</option>
                  <option value="Legal Counsel">Legal Counsel / Advocate</option>
                  <option value="Landowner / Farmer">Landowner / Farmer</option>
                  <option value="General Citizen">General Citizen</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white font-bold"
                >
                  {savedSuccess ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {/* Invoices History */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Billing & Tax Invoices ({invoices.length})</span>
              <span className="text-[10px] text-slate-500">GST Input Tax Compliant</span>
            </div>

            {invoices.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
                No past billing transactions on record.
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {invoices.map((inv) => (
                  <div
                    key={inv.invoiceNumber}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-mono font-bold text-slate-900 dark:text-white">{inv.invoiceNumber}</div>
                      <div className="text-[10px] text-slate-500">{inv.date} • {inv.paymentMethod}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-emerald-700">₹{inv.amountINR.toLocaleString('en-IN')}</div>
                      <span className="text-[9px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-3 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs">
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-semibold hover:underline"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Reset Demo Profile</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
