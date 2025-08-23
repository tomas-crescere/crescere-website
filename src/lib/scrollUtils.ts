/**
 * Scroll utilities for consistent navigation behavior across the application
 */

/**
 * Scrolls to a section by ID with proper header offset
 * @param sectionId - The ID of the section to scroll to
 * @param headerHeight - The height of the fixed header (default: 80px)
 * @param behavior - The scroll behavior (default: 'smooth')
 */
export const scrollToSection = (
  sectionId: string, 
  headerHeight: number = 80, 
  behavior: ScrollBehavior = 'smooth'
): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior
    });
  }
};

/**
 * Scrolls to a section using a href selector (e.g., '#portfolio')
 * @param href - The href selector (e.g., '#portfolio')
 * @param headerHeight - The height of the fixed header (default: 80px)
 * @param behavior - The scroll behavior (default: 'smooth')
 */
export const scrollToHref = (
  href: string, 
  headerHeight: number = 80, 
  behavior: ScrollBehavior = 'smooth'
): void => {
  const element = document.querySelector(href) as HTMLElement;
  if (element) {
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior
    });
  }
};

/**
 * Constants for consistent header height across the application
 */
export const HEADER_HEIGHT = 80; // 20 * 4 = 80px (h-20)
