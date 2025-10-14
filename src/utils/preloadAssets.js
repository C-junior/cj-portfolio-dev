/**
 * Preload critical assets for better performance
 */

/**
 * Preload critical images that are above the fold
 */
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/images/profile-photo.png',
    '/images/profile-photo.jpg',
    '/images/profile-placeholder.svg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

/**
 * Preload project images for faster navigation
 */
export const preloadProjectImages = () => {
  const projectImages = [
    '/images/projects/naissaecristovao.png',
    '/images/projects/agrotins.png',
    '/images/projects/docegabi.png',
    '/images/projects/quartzo-preview.png',
    '/images/projects/ati-portal.svg',
    '/images/projects/dashboard.svg'
  ];

  // Preload first few project images
  projectImages.slice(0, 3).forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

/**
 * Initialize asset preloading
 */
export const initializeAssetPreloading = () => {
  // Preload critical images immediately
  preloadCriticalImages();
  
  // Preload project images after a short delay
  setTimeout(() => {
    preloadProjectImages();
  }, 1000);
};