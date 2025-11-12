import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/layout/Layout.tsx';
import Overview from '@/pages/Overview/Overview.tsx';
import Transactions from '@/pages/Transactions/Transactions.tsx';

// router config
export const router = createBrowserRouter([
  {
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Overview />,
        // loader: overviewLoader,
      },
      {
        path: '/transactions',
        element: <Transactions />,
      },
      // {
      //   path: '/analytics',
      //   element: <Analytics />,
      // },
    ],
  },
]);
