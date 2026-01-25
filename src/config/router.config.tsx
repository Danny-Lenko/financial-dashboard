import type { RouteConfig } from '@/shared/types/route.types';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const OverviewPage = lazy(() => import('@/pages/Overview'));
const TransactionsPage = lazy(() => import('@/pages/Transactions'));
const AddTransactionsLayout = lazy(
  () => import('@/features/transactions/components/AddTransactionsLayout')
);
const TransactionFormContent = lazy(
  () => import('@/features/transactions/components/TransactionsFormContent')
);
// const TransactionDetailPage = lazy(() => import('@/pages/TransactionDetail/TransactionDetail'));
// const TransactionEditPage = lazy(() => import('@/pages/TransactionEdit/TransactionEdit'));
const CategoriesPage = lazy(() => import('@/pages/Categories'));

const BASE_PATHS = {
  overview: '/',
  transactions: '/transactions',
  categories: '/categories',
  accounts: '/accounts',
  wallets: '/wallets',
  settings: '/settings',
  notifications: '/notifications',
} as const;

// Complete route configuration for React Router + metadata for UI.
//   Used for:
//   - React Router setup
//   - Navigation menu generation
//   - Breadcrumbs
//   - Sitemap
export const ROUTES_CONFIG: RouteConfig[] = [
  {
    path: BASE_PATHS.overview,
    element: <OverviewPage />,
    navigationLabel: 'Overview',
    showInNav: true,
    // icon: DashboardIcon,
  },
  {
    path: BASE_PATHS.transactions,
    navigationLabel: 'Transactions',
    showInNav: true,
    // icon: ReceiptIcon,
    children: [
      {
        index: true,
        element: <TransactionsPage />,
      },
      {
        path: 'add',
        element: <AddTransactionsLayout />,
        children: [
          { index: true, element: <Navigate to="expense" replace /> },
          {
            path: ':type',
            element: <TransactionFormContent />,
          },
        ],
      },
      {
        path: ':id',
        // element: <TransactionDetailPage />,
      },
      {
        path: ':id/edit',
        // element: <TransactionEditPage />,
      },
    ],
  },
  {
    path: BASE_PATHS.categories,
    navigationLabel: 'Categories',
    showInNav: true,
    // icon: CategoryIcon,
    children: [
      {
        index: true,
        element: <CategoriesPage />,
      },
      {
        path: ':id',
        // element: <CategoryDetailPage />,
      },
    ],
  },
  {
    path: BASE_PATHS.accounts,
    navigationLabel: 'Accounts',
    showInNav: true,
    // icon: AccountBalanceIcon,
    disabled: true,
    // element: <AccountsPage />,
  },
  {
    path: BASE_PATHS.wallets,
    navigationLabel: 'Wallets',
    showInNav: true,
    // icon: WalletIcon,
    disabled: true,
    // element: <WalletsPage />,
  },
  {
    path: BASE_PATHS.settings,
    navigationLabel: 'Settings',
    showInNav: false,
    children: [
      {
        index: true,
        element: <Navigate to="/settings/profile" replace />,
      },
      {
        path: 'profile',
        // element: <SettingsProfilePage />,
        navigationLabel: 'Profile',
        showInNav: false,
      },
      {
        path: 'preferences',
        // element: <SettingsPreferencesPage />,
        navigationLabel: 'Preferences',
        showInNav: false,
      },
      {
        path: 'security',
        // element: <SettingsSecurityPage />,
        navigationLabel: 'Security',
        showInNav: false,
      },
    ],
  },
];

// Functions for building routes
// Usage:
// navigate(APP_ROUTES.transactions.detail('123')) // '/transactions/123'
// navigate(APP_ROUTES.transactions.create) // '/transactions/new'
export const APP_ROUTES = {
  overview: BASE_PATHS.overview,

  transactions: {
    index: BASE_PATHS.transactions,
    detail: (id: string) => `${BASE_PATHS.transactions}/${id}`,
    edit: (id: string) => `${BASE_PATHS.transactions}/${id}/edit`,
    create: `${BASE_PATHS.transactions}/new`,

    // For router config (with pattern)
    _patterns: {
      detail: `${BASE_PATHS.transactions}/:id`,
      edit: `${BASE_PATHS.transactions}/:id/edit`,
    },
  },

  categories: {
    index: BASE_PATHS.categories,
    detail: (id: string) => `${BASE_PATHS.categories}/${id}`,
    edit: (id: string) => `${BASE_PATHS.categories}/${id}/edit`,

    _patterns: {
      detail: `${BASE_PATHS.categories}/:id`,
      edit: `${BASE_PATHS.categories}/:id/edit`,
    },
  },

  accounts: {
    index: BASE_PATHS.accounts,
    detail: (id: string) => `${BASE_PATHS.accounts}/${id}`,

    _patterns: {
      detail: `${BASE_PATHS.accounts}/:id`,
    },
  },

  wallets: {
    index: BASE_PATHS.wallets,
  },

  settings: {
    index: BASE_PATHS.settings,
    profile: `${BASE_PATHS.settings}/profile`,
    preferences: `${BASE_PATHS.settings}/preferences`,
    security: `${BASE_PATHS.settings}/security`,
  },

  notifications: {
    index: BASE_PATHS.notifications,
  },
} as const;
