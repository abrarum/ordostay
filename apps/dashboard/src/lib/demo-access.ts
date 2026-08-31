export const DEMO_ACCESS_EMAIL = 'demo@ordostay.com';
export const DEMO_ACCESS_PASSWORD = 'OrdoStay2026!';
export const DEMO_ACCESS_SESSION_KEY = 'ordostay-demo-access';

export function hasDemoAccess() {
  return sessionStorage.getItem(DEMO_ACCESS_SESSION_KEY) === 'granted';
}

export function grantDemoAccess() {
  sessionStorage.setItem(DEMO_ACCESS_SESSION_KEY, 'granted');
}

export function clearDemoAccess() {
  sessionStorage.removeItem(DEMO_ACCESS_SESSION_KEY);
}
