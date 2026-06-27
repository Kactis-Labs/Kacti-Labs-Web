// src/components/admin/PrivateRoute.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Guards any admin route: checks for an active Supabase session.
// If no session → redirects to /admin/login.
// Shows a neutral loading state while the session is being resolved.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const PrivateRoute = ({ children }) => {
  const [session, setSession] = useState(undefined); // undefined = loading

  useEffect(() => {
    // Check current session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Listen for auth state changes (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Still resolving
  if (session === undefined) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#8fad6e',
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        letterSpacing: '0.06em',
      }}>
        Verificando sesión…
      </div>
    );
  }

  // No session → redirect to login
  if (!session) return <Navigate to="/admin/login" replace />;

  // Authenticated → render protected content
  return children;
};

export default PrivateRoute;
