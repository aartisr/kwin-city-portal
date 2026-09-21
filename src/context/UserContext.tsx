import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface WatchlistParcel {
  id: string;
  surveyNo: string;
  village: string;
  hobli: string;
  taluk: string;
  acreage: number;
  zone: string;
  guidanceRatePerAcreLakhs: number;
  marketRatePerAcreLakhs: number;
  kiadbStatus: string;
  riskRating: 'Low' | 'Medium' | 'High';
  addedDate: string;
  alerts: {
    gazetteNotification: boolean;
    guidanceRevision: boolean;
    reraFilings: boolean;
  };
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  organization?: string;
  role: 'Land Investor' | 'Urban Researcher' | 'Legal Counsel' | 'Landowner / Farmer' | 'General Citizen';
  tier: SubscriptionTier;
  purchasedReportsCount: number;
  avatarUrl?: string;
}

export interface TransactionInvoice {
  invoiceNumber: string;
  date: string;
  tier: SubscriptionTier;
  amountINR: number;
  paymentMethod: string;
  transactionHash: string;
  gstNumber: string;
  status: 'PAID' | 'REFUNDED';
  description: string;
}

interface UserContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  tier: SubscriptionTier;
  watchlist: WatchlistParcel[];
  invoices: TransactionInvoice[];
  login: (userData?: Partial<UserProfile>) => void;
  logout: () => void;
  upgradeTier: (newTier: SubscriptionTier, invoiceDetails: TransactionInvoice) => void;
  addToWatchlist: (parcel: Omit<WatchlistParcel, 'id' | 'addedDate'>) => void;
  removeFromWatchlist: (id: string) => void;
  isParcelInWatchlist: (surveyNo: string, village: string) => boolean;
  toggleWatchlistAlert: (id: string, alertKey: keyof WatchlistParcel['alerts']) => void;
  totalPortfolioAcreage: number;
  totalGuidanceValueLakhs: number;
  totalMarketValueLakhs: number;
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-kwin-demo',
  name: 'Dev & Investor Sandbox',
  email: 'flint.mi.investments@gmail.com',
  organization: 'Apex Strategic Land Fund',
  role: 'Land Investor',
  tier: 'free',
  purchasedReportsCount: 1,
};

const SEED_WATCHLIST: WatchlistParcel[] = [
  {
    id: 'parcel-tubagere-142',
    surveyNo: '142/2A',
    village: 'Tubagere',
    hobli: 'Tubagere Hobli',
    taluk: 'Doddaballapur',
    acreage: 4.5,
    zone: 'Knowledge & Higher Education District',
    guidanceRatePerAcreLakhs: 45,
    marketRatePerAcreLakhs: 395,
    kiadbStatus: 'Phase 1 Final Notification Issued (Sec 28-4)',
    riskRating: 'Low',
    addedDate: '2026-08-12',
    alerts: {
      gazetteNotification: true,
      guidanceRevision: true,
      reraFilings: false,
    },
    notes: 'Primary parcel candidate for academic annex or ancillary health lab.',
  },
  {
    id: 'parcel-kasaba-88',
    surveyNo: '88/1',
    village: 'Kasaba Hobli',
    hobli: 'Kasaba',
    taluk: 'Doddaballapur',
    acreage: 2.2,
    zone: 'Health & Life Sciences District',
    guidanceRatePerAcreLakhs: 65,
    marketRatePerAcreLakhs: 420,
    kiadbStatus: 'Phase 2 Preliminary Gazetted (Sec 28-1)',
    riskRating: 'Medium',
    addedDate: '2026-09-04',
    alerts: {
      gazetteNotification: true,
      guidanceRevision: false,
      reraFilings: true,
    },
    notes: 'Buffer zone close to lake catchment; verify 30m non-construction setback.',
  }
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('kwin_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });

  const [watchlist, setWatchlist] = useState<WatchlistParcel[]>(() => {
    try {
      const saved = localStorage.getItem('kwin_watchlist');
      return saved ? JSON.parse(saved) : SEED_WATCHLIST;
    } catch {
      return SEED_WATCHLIST;
    }
  });

  const [invoices, setInvoices] = useState<TransactionInvoice[]>(() => {
    try {
      const saved = localStorage.getItem('kwin_invoices');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('kwin_user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('kwin_user_profile');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('kwin_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('kwin_invoices', JSON.stringify(invoices));
  }, [invoices]);

  const login = (userData?: Partial<UserProfile>) => {
    setUser({
      ...DEFAULT_DEMO_USER,
      ...userData,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const upgradeTier = (newTier: SubscriptionTier, invoiceDetails: TransactionInvoice) => {
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        tier: newTier,
        purchasedReportsCount: prev.purchasedReportsCount + 1,
      };
    });
    setInvoices(prev => [invoiceDetails, ...prev]);
  };

  const addToWatchlist = (parcel: Omit<WatchlistParcel, 'id' | 'addedDate'>) => {
    const newParcel: WatchlistParcel = {
      ...parcel,
      id: `parcel-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      addedDate: new Date().toISOString().split('T')[0],
    };
    setWatchlist(prev => [newParcel, ...prev]);
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(prev => prev.filter(p => p.id !== id));
  };

  const isParcelInWatchlist = (surveyNo: string, village: string) => {
    return watchlist.some(
      p => p.surveyNo.trim().toLowerCase() === surveyNo.trim().toLowerCase() &&
           p.village.trim().toLowerCase() === village.trim().toLowerCase()
    );
  };

  const toggleWatchlistAlert = (id: string, alertKey: keyof WatchlistParcel['alerts']) => {
    setWatchlist(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        return {
          ...p,
          alerts: {
            ...p.alerts,
            [alertKey]: !p.alerts[alertKey],
          },
        };
      })
    );
  };

  const totalPortfolioAcreage = watchlist.reduce((sum, p) => sum + p.acreage, 0);
  const totalGuidanceValueLakhs = watchlist.reduce((sum, p) => sum + (p.guidanceRatePerAcreLakhs * p.acreage), 0);
  const totalMarketValueLakhs = watchlist.reduce((sum, p) => sum + (p.marketRatePerAcreLakhs * p.acreage), 0);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        tier: user?.tier || 'free',
        watchlist,
        invoices,
        login,
        logout,
        upgradeTier,
        addToWatchlist,
        removeFromWatchlist,
        isParcelInWatchlist,
        toggleWatchlistAlert,
        totalPortfolioAcreage,
        totalGuidanceValueLakhs,
        totalMarketValueLakhs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
