/**
 * Image optimization utilities for better performance and user experience
 */

/**
 * Preload critical images for better performance
 * @param {string[]} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Create responsive image srcset for different screen sizes
 * @param {string} baseUrl - Base image URL
 * @param {Object} sizes - Object with size variants
 * @returns {string} srcset string
 */
export const createResponsiveSrcSet = (baseUrl, sizes = {}) => {
  const defaultSizes = {
    '1x': baseUrl,
    '2x': baseUrl.replace(/\.(jpg|jpeg|png|webp)$/i, '@2x.$1'),
    ...sizes
  };
  
  return Object.entries(defaultSizes)
    .map(([size, url]) => `${url} ${size}`)
    .join(', ');
};

/**
 * Generate optimized image attributes for Vue components
 * @param {Object} options - Image options
 * @returns {Object} Image attributes
 */
export const getOptimizedImageAttrs = ({
  src,
  alt,
  loading = 'lazy',
  decoding = 'async',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  return {
    src,
    alt,
    loading,
    decoding,
    sizes
  };
};

/**
 * Check if WebP format is supported
 * @returns {Promise<boolean>}
 */
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Get the best image format based on browser support
 * @param {string} baseUrl - Base image URL
 * @returns {Promise<string>} Optimized image URL
 */
export const getBestImageFormat = async (baseUrl) => {
  const isWebPSupported = await supportsWebP();
  
  if (isWebPSupported) {
    // Try to use WebP version if available
    const webpUrl = baseUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return webpUrl;
  }
  
  return baseUrl;
};

/**
 * Lazy load images with intersection observer
 * @param {HTMLElement} img - Image element
 * @param {Object} options - Intersection observer options
 */
export const lazyLoadImage = (img, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        const src = image.dataset.src;
        
        if (src) {
          image.src = src;
          image.removeAttribute('data-src');
          image.classList.add('loaded');
        }
        
        observer.unobserve(image);
      }
    });
  }, defaultOptions);

  observer.observe(img);
};

/**
 * Create a placeholder image while loading
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} color - Background color
 * @returns {string} Data URL for placeholder
 */
export const createPlaceholder = (width = 800, height = 500, color = '#e2e8f0') => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  // Add loading indicator
  ctx.fillStyle = '#9ca3af';
  ctx.font = '16px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Loading...', width / 2, height / 2);
  
  return canvas.toDataURL();
};

/**
 * Optimize image loading performance
 * @param {HTMLImageElement} img - Image element
 * @param {Object} options - Optimization options
 */
export const optimizeImageLoading = (img, options = {}) => {
  const {
    placeholder = true,
    fadeIn = true,
    retryOnError = true,
    maxRetries = 3
  } = options;

  let retryCount = 0;

  // Add placeholder if enabled
  if (placeholder && !img.src) {
    img.src = createPlaceholder();
    img.classList.add('placeholder');
  }

  // Add fade-in effect
  if (fadeIn) {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in-out';
  }

  // Handle successful load
  img.addEventListener('load', () => {
    if (fadeIn) {
      img.style.opacity = '1';
    }
    img.classList.remove('placeholder');
    img.classList.add('loaded');
  });

  // Handle load errors with retry
  img.addEventListener('error', () => {
    if (retryOnError && retryCount < maxRetries) {
      retryCount++;
      setTimeout(() => {
        img.src = img.src; // Retry loading
      }, 1000 * retryCount); // Exponential backoff
    } else {
      img.classList.add('error');
      console.warn(`Failed to load image after ${maxRetries} retries:`, img.src);
    }
  });
};

/**
 * Preload critical images for the portfolio
 */
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/images/profile-photo.png',
    '/images/profile-photo.jpg'
  ];
  
  preloadImages(criticalImages);
};