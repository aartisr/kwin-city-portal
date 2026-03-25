/**
 * Content Management System
 * Provides a flexible, type-safe way to load and manage content
 * Enables easy updates without modifying component code
 */

import fs from 'fs';
import path from 'path';

/**
 * Generic Content Block Schema
 * Flexible structure for any content type
 */
export interface ContentBlock {
  id: string;
  type: 'hero' | 'text' | 'grid' | 'list' | 'card' | 'section';
  title?: string;
  subtitle?: string;
  content?: string;
  items?: ContentItem[];
  layout?: 'single' | 'two-col' | 'three-col' | 'grid';
  theme?: 'light' | 'dark' | 'accent';
  image?: {
    src: string;
    alt: string;
    size?: 'small' | 'medium' | 'large' | 'full';
  };
  cta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  metadata?: Record<string, any>;
}

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  url?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  description?: string;
  blocks: ContentBlock[];
  metadata?: {
    created?: string;
    updated?: string;
    author?: string;
    version?: string;
  };
}

/**
 * Content Loader - Thread-safe, with caching
 */
class ContentManager {
  private cache = new Map<string, any>();
  private contentDir = path.join(process.cwd(), 'app', 'content');

  /**
   * Load content file with caching
   */
  async loadContent<T = any>(filePath: string, useCache = true): Promise<T> {
    const cacheKey = filePath;

    // Return cached content if available and caching enabled
    if (useCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as T;
    }

    try {
      const fullPath = path.join(this.contentDir, filePath);
      
      // Security: Ensure path stays within content directory
      if (!fullPath.startsWith(this.contentDir)) {
        throw new Error('Invalid path: Content must be in app/content directory');
      }

      const content = fs.readFileSync(fullPath, 'utf-8');
      const parsed = JSON.parse(content) as T;

      // Cache the result
      if (useCache) {
        this.cache.set(cacheKey, parsed);
      }

      return parsed;
    } catch (error) {
      console.error(`Failed to load content from ${filePath}:`, error);
      throw new Error(`Content not found: ${filePath}`);
    }
  }

  /**
   * Load page content
   */
  async loadPageContent(pageSlug: string): Promise<PageContent> {
    return this.loadContent(`pages/${pageSlug}.json`);
  }

  /**
   * Load all items of a type (e.g., all sectors)
   */
  async loadCollection<T = any>(collectionName: string): Promise<T[]> {
    return this.loadContent(`collections/${collectionName}.json`);
  }

  /**
   * Clear cache (useful for dev/testing)
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache stats
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const contentManager = new ContentManager();

/**
 * Helper: Build component tree from content blocks
 * Maps content blocks to React components automatically
 */
export function mapBlocksToComponents(blocks: ContentBlock[]): ContentBlock[] {
  return blocks.map((block) => ({
    ...block,
    // Normalize block data for components
    metadata: {
      ...block.metadata,
      componentName: block.type,
    },
  }));
}

/**
 * Helper: Filter and sort content
 */
export function filterContent<T extends ContentItem>(
  items: T[],
  filter?: (item: T) => boolean,
  sort?: (a: T, b: T) => number
): T[] {
  let result = items;
  if (filter) result = result.filter(filter);
  if (sort) result = result.sort(sort);
  return result;
}

/**
 * Helper: Enrich content with computed fields
 */
export function enrichContent<T extends Record<string, any>>(
  item: T,
  enricher: (item: T) => Partial<T>
): T {
  return { ...item, ...enricher(item) };
}

/**
 * Helper: Validate content structure
 */
export function validateContent(content: any): boolean {
  // Basic validation - can be extended with Zod/Joi
  return typeof content === 'object' && content !== null;
}
