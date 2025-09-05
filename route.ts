/**
 * An Array of Routes which are accessiable to the Public ie anyone can 
 * view it without Logging in 
 * @type {string[]}
 */
export const publicRoutes=[
    "/",
    "/api/proxy/"
]

export const publicRoutesPrefix="/api/proxy"

/**
 * An Array of Routes which are used for the authentication
 * These Routes will redirect the loggedin users to /settings
 * @type {string[]}
 */
export const authRoutes=[
    "/auth/login",
    "/auth/register"
]

/**
 * The Prefix for API authtentication routes
 * Routes that start with this prefix are used for api authentication purposes
 * @type {string}
 */
export const apiAuthPrefix="/api/auth"

/**
 * The Default Redirect Path After Login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT="/dashboard"