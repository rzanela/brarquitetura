/**
 * Utilitário de resolução de URLs com suporte a subdiretório (GitHub Pages)
 */
export function getRelativeUrl(path: string = ''): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  if (cleanPath === '/' || cleanPath === '') {
    return base ? `${base}/` : '/';
  }
  
  return `${base}${cleanPath}`;
}

