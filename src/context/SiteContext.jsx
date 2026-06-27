import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('key, value');

        if (!error && data) {
          const configMap = {};
          data.forEach(row => {
            configMap[row.key] = row.value;
          });
          setConfig(configMap);
        }
      } catch (err) {
        console.error('Error fetching site config:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // Update SEO dynamically when config loads
  useEffect(() => {
    if (config.site_title) {
      document.title = config.site_title;
    }
    
    if (config.site_description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = config.site_description;
    }
    
    // Optional: Open Graph description
    if (config.og_description) {
      let metaOgDesc = document.querySelector('meta[property="og:description"]');
      if (!metaOgDesc) {
        metaOgDesc = document.createElement('meta');
        metaOgDesc.setAttribute('property', 'og:description');
        document.head.appendChild(metaOgDesc);
      }
      metaOgDesc.content = config.og_description;
      
      let metaOgTitle = document.querySelector('meta[property="og:title"]');
      if (!metaOgTitle && config.site_title) {
        metaOgTitle = document.createElement('meta');
        metaOgTitle.setAttribute('property', 'og:title');
        document.head.appendChild(metaOgTitle);
      }
      if (metaOgTitle && config.site_title) {
         metaOgTitle.content = config.site_title;
      }
    }
  }, [config]);

  return (
    <SiteContext.Provider value={{ config, loading }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteConfig = () => {
  return useContext(SiteContext);
};
