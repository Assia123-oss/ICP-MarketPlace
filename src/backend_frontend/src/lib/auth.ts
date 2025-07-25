import { AuthClient } from '@dfinity/auth-client';

const IDENTITY_PROVIDER = "https://identity.ic0.app/#authorize";
const SESSION_KEY = 'icp_identity_authenticated';
const PRINCIPAL_ROLE_KEY = 'icp_principal_role';
const SIGNUP_ROLE_KEY = 'signup_role';

let authClient: AuthClient | null = null;

export async function getAuthClient() {
  if (!authClient) {
    authClient = await AuthClient.create();
  }
  return authClient;
}

export function setSignupRole(role: 'jobseeker' | 'employer') {
  localStorage.setItem(SIGNUP_ROLE_KEY, role);
}

export function getSignupRole() {
  return localStorage.getItem(SIGNUP_ROLE_KEY);
}

export function setPrincipalRole(principal: string, role: string) {
  localStorage.setItem(PRINCIPAL_ROLE_KEY, JSON.stringify({ principal, role }));
}

export function getPrincipalRole() {
  const data = localStorage.getItem(PRINCIPAL_ROLE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function login() {
  const client = await getAuthClient();
  await client.login({
    identityProvider: IDENTITY_PROVIDER,
    onSuccess: async () => {
      localStorage.setItem(SESSION_KEY, 'true');
      const identity = client.getIdentity();
      const principal = identity.getPrincipal().toString();
      // If signing up, store the role for this principal
      const signupRole = getSignupRole();
      if (signupRole) {
        setPrincipalRole(principal, signupRole);
        localStorage.removeItem(SIGNUP_ROLE_KEY);
      }
      // Redirect to correct dashboard
      const principalRole = getPrincipalRole();
      if (principalRole && principalRole.principal === principal) {
        if (principalRole.role === 'employer') {
          window.location.href = '/dashboard/employer';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        // fallback
        window.location.href = '/dashboard';
      }
    },
  });
}

export async function logout() {
  const client = await getAuthClient();
  await client.logout();
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(PRINCIPAL_ROLE_KEY);
  window.location.href = '/';
}

export async function isAuthenticated() {
  const client = await getAuthClient();
  return client.isAuthenticated();
}

export function isAuthenticatedSync() {
  return localStorage.getItem(SESSION_KEY) === 'true';
} 