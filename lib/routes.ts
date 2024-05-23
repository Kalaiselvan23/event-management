/**
 * routes that are allowed without authentication
*/
export const publicRoute=['/']

/**
 * routes that are allowed with authentication
*/
export const protectedRoute=['/all-events','/events/:path']