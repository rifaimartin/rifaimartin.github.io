import { useState, useEffect } from 'react';

// Unique counter key for authentic visitor counting without false base inflation
const COUNTER_KEY = 'rifaimartin_portfolio_v3';
const API_URL = `https://api.codetabs.com/v1/counter?key=${COUNTER_KEY}`;

export function useVisitorCount() {
  const [count, setCount] = useState(() => {
    try {
      const cached = localStorage.getItem('rm_visitor_count');
      return cached ? parseInt(cached, 10) : 1;
    } catch {
      return 1;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function handleVisit() {
      try {
        const sessionCounted = sessionStorage.getItem('rm_session_counted');
        const cachedCount = localStorage.getItem('rm_visitor_count');

        // Prevent false increments on refresh / same browser session
        if (sessionCounted && cachedCount) {
          if (isMounted) {
            setCount(parseInt(cachedCount, 10));
            setLoading(false);
          }
          return;
        }

        // New session: increment counter once
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Counter API error');
        const data = await response.json();
        
        if (data && typeof data.count === 'number' && isMounted) {
          const totalViews = data.count;
          setCount(totalViews);
          try {
            localStorage.setItem('rm_visitor_count', totalViews.toString());
            sessionStorage.setItem('rm_session_counted', 'true');
          } catch {}
        }
      } catch (err) {
        console.warn('Visitor counter notice:', err);
        if (isMounted) {
          const cached = localStorage.getItem('rm_visitor_count');
          if (cached) setCount(parseInt(cached, 10));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    handleVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedCount = count.toLocaleString('en-US');

  return { count, formattedCount, loading };
}

