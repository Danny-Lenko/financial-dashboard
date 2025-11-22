import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import Layout from '@/components/layout/Layout.tsx';
import { ROUTES_CONFIG } from '@/config/router.config';
import type { RouteConfig } from './types/route.types';

const convertToRouteObject = (config: RouteConfig[]): RouteObject[] => {
  return config.map(({ children, ...route }) => {
    const {
      navigationLabel,
      icon,
      showInNav,
      disabled,
      requiredPermission,
      ...routeObject
    } = route;

    void navigationLabel;
    void icon;
    void showInNav;
    void disabled;
    void requiredPermission;

    return {
      ...routeObject,
      ...(children && { children: convertToRouteObject(children) }),
    } as RouteObject;
  });
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: convertToRouteObject(ROUTES_CONFIG),
  },
]);
