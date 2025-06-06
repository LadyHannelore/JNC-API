/**
 * Ascendance Library - Book Volume Display Application
 * Fetches and displays book volumes from J-Novel Club API
 * 
 * @author Professional Web Developer
 * @version 2.0.0
 */

class BookLibrary {
  constructor() {
    this.apiUrl = 'https://labs.j-novel.club/app/v1/series/ascendance-of-a-bookworm/volumes?format=json';
    this.elements = {};
    this.volumes = [];
    this.isLoading = false;
    
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.cacheElements();
      this.bindEvents();
      this.loadVolumes();
    });
  }

  /**
   * Cache DOM elements for performance
   */
  cacheElements() {
    this.elements = {
      loading: document.getElementById('loading'),
      error: document.getElementById('error'),
      books: document.getElementById('books'),
      booksContainer: document.getElementById('books-container'),
      volumeCount: document.getElementById('volume-count'),
      retryBtn: document.getElementById('retry-btn')
    };
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    this.elements.retryBtn?.addEventListener('click', () => {
      this.loadVolumes();
    });
  }

  /**
   * Show loading state
   */
  showLoading() {
    this.isLoading = true;
    this.elements.loading?.classList.remove('hidden');
    this.elements.error?.classList.add('hidden');
    this.elements.books?.classList.add('hidden');
  }

  /**
   * Show error state
   */
  showError() {
    this.isLoading = false;
    this.elements.loading?.classList.add('hidden');
    this.elements.error?.classList.remove('hidden');
    this.elements.books?.classList.add('hidden');
  }

  /**
   * Show books content
   */
  showBooks() {
    this.isLoading = false;
    this.elements.loading?.classList.add('hidden');
    this.elements.error?.classList.add('hidden');
    this.elements.books?.classList.remove('hidden');
    
    // Add animation
    this.elements.books?.classList.add('fade-in');
  }

  /**
   * Update volume count display
   */
  updateVolumeCount() {
    if (this.elements.volumeCount) {
      this.elements.volumeCount.textContent = this.volumes.length;
    }
  }

  /**
   * Fetch volumes from API with error handling and retry logic
   */
  async loadVolumes() {
    if (this.isLoading) return;

    this.showLoading();

    try {
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data || !Array.isArray(data.volumes)) {
        throw new Error('Invalid data format received from API');
      }

      this.volumes = data.volumes;
      this.renderVolumes();
      this.updateVolumeCount();
      this.showBooks();

    } catch (error) {
      console.error('Error loading volumes:', error);
      this.showError();
      
      // Optional: Show user-friendly error message
      this.showErrorMessage(error.message);
    }
  }

  /**
   * Show specific error message to user
   */
  showErrorMessage(message) {
    const errorContent = this.elements.error?.querySelector('.error-content p');
    if (errorContent) {
      errorContent.textContent = `Failed to load volumes: ${message}`;
    }
  }

  /**
   * Render all volumes to the DOM
   */
  renderVolumes() {
    if (!this.elements.booksContainer) return;

    // Clear existing content
    this.elements.booksContainer.innerHTML = '';

    // Render each volume with staggered animation
    this.volumes.forEach((volume, index) => {
      const bookElement = this.createBookElement(volume);
      
      // Add staggered animation delay
      setTimeout(() => {
        bookElement.classList.add('slide-up');
        this.elements.booksContainer.appendChild(bookElement);
      }, index * 100);
    });
  }

  /**
   * Create a single book element
   * @param {Object} volume - Volume data object
   * @returns {HTMLElement} - Created book element
   */
  createBookElement(volume) {
    // Validate volume data
    if (!volume || typeof volume !== 'object') {
      console.warn('Invalid volume data:', volume);
      return this.createErrorBookElement();
    }

    const bookElement = document.createElement('div');
    bookElement.className = 'book';
    bookElement.setAttribute('data-volume-id', volume.id || 'unknown');

    // Create book content structure
    bookElement.innerHTML = this.getBookTemplate(volume);

    // Add click handler for future functionality
    bookElement.addEventListener('click', () => {
      this.handleBookClick(volume);
    });

    return bookElement;
  }

  /**
   * Generate HTML template for a book
   * @param {Object} volume - Volume data
   * @returns {string} - HTML string
   */
  getBookTemplate(volume) {
    const title = this.sanitizeText(volume.title || 'Unknown Title');
    const description = this.sanitizeText(volume.description || 'No description available.');
    const coverUrl = volume.cover?.coverUrl || volume.cover?.originalUrl || '';
    const author = 'Miya Kazuki'; // Static as per original code
    
    // Truncate description for display
    const truncatedDescription = this.truncateText(description, 150);

    return `
      <div class="book-image-container">
        <img 
          src="${coverUrl}" 
          alt="Cover of ${title}"
          loading="lazy"
          onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA4MEgxMjBWMTIwSDgwVjgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'"
        >
        <div class="book-overlay"></div>
      </div>
      <div class="book-content">
        <h2 class="book-title">${title}</h2>
        <p class="book-description">${truncatedDescription}</p>
        <div class="book-meta">
          <div class="book-author">
            <i class="fas fa-user"></i>
            <span>${author}</span>
          </div>
          <div class="book-badge">Volume</div>
        </div>
      </div>
    `;
  }

  /**
   * Handle book click events
   * @param {Object} volume - Volume data
   */
  handleBookClick(volume) {
    console.log('Book clicked:', volume.title);
    // Future: Add modal, navigation, or other interactions
  }

  /**
   * Create error book element for failed loads
   * @returns {HTMLElement}
   */
  createErrorBookElement() {
    const bookElement = document.createElement('div');
    bookElement.className = 'book error-book';
    bookElement.innerHTML = `
      <div class="book-content">
        <h2 class="book-title">Error Loading Volume</h2>
        <p class="book-description">This volume could not be loaded properly.</p>
        <div class="book-meta">
          <div class="book-author">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Error</span>
          </div>
        </div>
      </div>
    `;
    return bookElement;
  }

  /**
   * Sanitize text to prevent XSS
   * @param {string} text - Text to sanitize
   * @returns {string} - Sanitized text
   */
  sanitizeText(text) {
    if (typeof text !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Truncate text to specified length
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} - Truncated text
   */
  truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }
}

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    if (entry.entryType === 'navigation') {
      console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
    }
  });
});

if ('PerformanceObserver' in window) {
  performanceObserver.observe({ entryTypes: ['navigation'] });
}

// Initialize the application
const bookLibrary = new BookLibrary();

// Export for testing or external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BookLibrary;
}
