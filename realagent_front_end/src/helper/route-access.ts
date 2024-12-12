import {
  AUTH_ENDPOINTS,
  PROTECTED_ENDPOINTS,
  PUBLIC_ENDPOINTS,
} from "../router/route";

export function checkRouteMatch(route: string, routes: string[]): boolean {
  return routes.some((r) => {
    if (route === r) return true;
    if (route.startsWith(r + "/") || route.startsWith(r + "?")) return true;
    if (r.endsWith("/") && route.startsWith(r.slice(0, -1))) return true;
    if (r.endsWith("?") && route.startsWith(r.slice(0, -1))) return true;
    return false;
  });
}

interface EndpointTypes {
  isAuthEndpoint: boolean;
  isPublicEndpoint: boolean;
  isProtectedEndpoint: boolean;
}

export function getEndpointTypes(path: string): EndpointTypes {
  const isAuthEndpoint = checkRouteMatch(path, AUTH_ENDPOINTS);
  const isProtectedEndpoint = checkRouteMatch(path, PROTECTED_ENDPOINTS);
  const isPublicEndpoint = checkRouteMatch(path, PUBLIC_ENDPOINTS);

  return {
    isAuthEndpoint,
    isPublicEndpoint,
    isProtectedEndpoint,
  };
}
