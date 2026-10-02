
export interface MetadataProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: 'website' | 'article' | 'product';
  canonicalUrl?: string;
  noIndex?: boolean;
}

export const updateMetadata = (props: MetadataProps) => {
  const { 
    title, 
    description, 
    ogTitle, 
    ogDescription, 
    ogType = 'website', 
    canonicalUrl,
    noIndex = false
  } = props;

  // Update Title
  document.title = title;

  // Update Meta Description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  } else {
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = description;
    document.head.appendChild(meta);
  }

  // Update OpenGraph Title
  const ogTitleMeta = document.querySelector('meta[property="og:title"]');
  if (ogTitleMeta) {
    ogTitleMeta.setAttribute('content', ogTitle || title);
  }

  // Update OpenGraph Description
  const ogDescMeta = document.querySelector('meta[property="og:description"]');
  if (ogDescMeta) {
    ogDescMeta.setAttribute('content', ogDescription || description);
  }

  // Update OpenGraph Type
  const ogTypeMeta = document.querySelector('meta[property="og:type"]');
  if (ogTypeMeta) {
    ogTypeMeta.setAttribute('content', ogType);
  }

  // Update Canonical Link
  const canonical = document.querySelector('link[rel="canonical"]');
  const currentUrl = window.location.origin + window.location.pathname;
  if (canonical) {
    canonical.setAttribute('href', canonicalUrl || currentUrl);
  }

  // Update Robots
  let robotsMeta = document.querySelector('meta[name="robots"]');
  if (noIndex) {
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      (robotsMeta as HTMLMetaElement).name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');
  } else if (robotsMeta) {
    robotsMeta.setAttribute('content', 'index, follow');
  }
};
