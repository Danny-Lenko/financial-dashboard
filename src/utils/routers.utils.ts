import { ROUTES_CONFIG } from '@/config/router.config';

// Helper: get only top-level routes for navigation
export const getNavigationRoutes = () => {
  return ROUTES_CONFIG.filter((route) => route.showInNav);
};

// Helper: get nested navigation (e.g. for Settings)
export const getNestedNavigationRoutes = (parentPath: string) => {
  const parent = ROUTES_CONFIG.find((route) => route.path === parentPath);
  return parent?.children?.filter((route) => route.showInNav) ?? [];
};
