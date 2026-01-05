import type { RouteObject } from 'react-router-dom';
// import path from 'path';

export interface RouteConfig extends Omit<RouteObject, 'children'> {
  // Metadata for navigation
  navigationLabel?: string;
  icon?: React.ComponentType;
  showInNav?: boolean;
  disabled?: boolean;
  requiredPermission?: string;
  children?: RouteConfig[];
}
