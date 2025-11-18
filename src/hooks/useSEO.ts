type SEOOptions = {
  title: string;
  description?: string;
  image?: string;
  type?: string; // e.g. website, article
  url?: string;
};

function upsertMeta(property: string, content: string, attr: 'name'|'property' = 'name') {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSEO({ title, description, image, type = 'website', url }: SEOOptions) {
  if (typeof document !== 'undefined') {
    document.title = title;
    upsertMeta('description', description || '');
    // Open Graph
    upsertMeta('og:title', title, 'property');
    upsertMeta('og:description', description || '', 'property');
    upsertMeta('og:type', type, 'property');
    upsertMeta('og:url', url || window.location.href, 'property');
    if (image) upsertMeta('og:image', image, 'property');
  }
}
