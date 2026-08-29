import { useState, useEffect } from 'react';

const BASE_OFFSET = 1240; // Base established visitor count
const COUNTER_KEY = 'rifaimartin_portfolio_v2';
const API_URL = `https://api.codetabs.com/v1/counter?key=${COUNTER_KEY}`;

export function useVisitorCount() {
  const [count, setCount] = useState(() => {
    try {
      const cached = localStorage.getItem('rm_visitor_count');
      return cached ? parseInt(cached, 10) : BASE_OFFSET + 12;
    } catch {
      return BASE_OFFSET + 12;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchAndIncrement() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Counter API error');
        const data = await response.json();
        
        if (data && typeof data.count === 'number' && isMounted) {
          const totalViews = BASE_OFFSET + data.count;
          setCount(totalViews);
          try {
            localStorage.setItem('rm_visitor_count', totalViews.toString());
          } catch {}
        }
      } catch (err) {
        console.warn('Visitor counter fallback:', err);
        // If offline/error, retain cached or local increment
        if (isMounted) {
          setCount((prev) => {
            const next = prev + 1;
            try {
              localStorage.setItem('rm_visitor_count', next.toString());
            } catch {}
            return next;
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAndIncrement();

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedCount = count.toLocaleString('en-US');

  return { count, formattedCount, loading };
}
