# Routes Configuration Guide

## Structure

The route configuration consists of 3 parts:

### 1. `BASE_PATHS`

Base paths for all routes. Single source of truth for URLs.

### 2. `ROUTES_CONFIG`

Full configuration for React Router + metadata for the UI.

### 3. `APP_ROUTES`

Object with routes for use in code with type-safety.

## How to add a new route

### Simple route (no parameters)

```typescript
// 1. Add to BASE_PATHS
const BASE_PATHS = {
    // ...
    reports: '/reports',
};

// 2. Add to APP_ROUTES
export const APP_ROUTES = {
    // ...
    reports: BASE_PATHS.reports,
};

// 3. Add to ROUTES_CONFIG
export const ROUTES_CONFIG = [
    // ...
    {
        path: '/reports',
        navigationLabel: 'Reports',
        showInNav: true,
        icon: AssessmentIcon,
        element: ,
    },
];
```

### Route with nested routes

```typescript
// 1-2. BASE_PATHS + APP_ROUTES
const BASE_PATHS = {
    reports: '/reports',
};

export const APP_ROUTES = {
    reports: {
        index: BASE_PATHS.reports,
        detail: (id: string) => `${BASE_PATHS.reports}/${id}`,
        _patterns: {
            detail: `${BASE_PATHS.reports}/:id`,
        },
    },
};

// 3. ROUTES_CONFIG with children
{
    path: '/reports',
    navigationLabel: 'Reports',
    showInNav: true,
    children: [
        {
            index: true,
            element: ,
        },
        {
            path: ':id',
            element: ,
        },
    ],
}
```

## FAQ

**Q: Why 3 separate constants?**  
A: To separate concerns: paths, type-safe helpers, and router config with metadata.

**Q: Can it be simplified?**  
A: Yes, but you lose either type-safety or metadata flexibility.

**Q: What if I forget to add it to one of the constants?**  
A: TypeScript will show an error if you use a route that does not exist.
