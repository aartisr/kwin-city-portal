'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ContentBlock } from '@/lib/content-manager';

/**
 * Component Registry
 * Maps block types to actual React components
 * Add new components here to make them available to the page builder
 */
const componentRegistry = {
  // Layout & Structure
  hero: dynamic(() => import('@/components/Hero'), { loading: () => <div className="h-96 bg-gradient-to-b from-slate-100 to-white animate-pulse" /> }),
  section: dynamic(() => import('@/components/PageIntro'), { loading: () => <div className="h-32 bg-slate-100 animate-pulse" /> }),
  
  // Content Blocks
  text: dynamic(() => import('@/components/ContentBlock'), { loading: () => <div className="h-24 bg-slate-100 animate-pulse" /> }),
  grid: dynamic(() => import('@/components/ResponsiveGrid'), { loading: () => <div className="h-48 bg-slate-100 animate-pulse" /> }),
  list: dynamic(() => import('@/components/ListBlock'), { loading: () => <div className="h-40 bg-slate-100 animate-pulse" /> }),
  card: dynamic(() => import('@/components/CardBlock'), { loading: () => <div className="h-32 bg-slate-100 animate-pulse" /> }),
  
  // Specialized Components
  timeline: dynamic(() => import('@/components/Timeline'), { loading: () => <div className="h-96 bg-slate-100 animate-pulse" /> }),
  sectors: dynamic(() => import('@/components/Sectors'), { loading: () => <div className="h-96 bg-slate-100 animate-pulse" /> }),
  pillars: dynamic(() => import('@/components/Pillars'), { loading: () => <div className="h-96 bg-slate-100 animate-pulse" /> }),
  sustainability: dynamic(() => import('@/components/Sustainability'), { loading: () => <div className="h-96 bg-slate-100 animate-pulse" /> }),
  map: dynamic(() => import('@/components/RegionMap'), { loading: () => <div className="h-96 bg-slate-100 animate-pulse" /> }),
} as const;

export type BlockType = keyof typeof componentRegistry;

interface GenericPageBuilderProps {
  blocks: ContentBlock[];
  className?: string;
}

/**
 * Generic Page Builder
 * Renders blocks dynamically based on type
 * Handles loading states and error boundaries automatically
 */
export default function GenericPageBuilder({
  blocks,
  className = '',
}: GenericPageBuilderProps) {
  return (
    <main className={className}>
      {blocks.map((block) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </main>
  );
}

/**
 * Block Renderer
 * Handles individual block rendering with suspense and error handling
 */
function RenderBlock({ block }: { block: ContentBlock }) {
  const Component = componentRegistry[block.type as BlockType] as any;

  if (!Component) {
    console.warn(`Block type "${block.type}" not registered`);
    return <BlockNotFound type={block.type} />;
  }

  return (
    <Suspense fallback={<BlockSkeleton />}>
      <div className="block-wrapper" data-block-id={block.id} data-block-type={block.type}>
        <Component data={block} {...block.metadata} />
      </div>
    </Suspense>
  );
}

/**
 * Skeleton Loader for blocks
 */
function BlockSkeleton() {
  return (
    <div className="w-full h-48 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-pulse rounded-lg" />
  );
}

/**
 * Fallback when component not found
 */
function BlockNotFound({ type }: { type: string }) {
  return (
    <div className="py-12 px-4 bg-yellow-50 border-l-4 border-yellow-400">
      <p className="text-yellow-700">
        Component type "<strong>{type}</strong>" not registered in componentRegistry
      </p>
    </div>
  );
}

/**
 * Register a new component dynamically
 * Useful for extending without modifying the registry
 */
export function registerComponent(
  type: BlockType,
  component: React.ComponentType<any>
) {
  (componentRegistry as any)[type] = component;
}

/**
 * Get all registered component types
 */
export function getRegisteredComponents(): BlockType[] {
  return Object.keys(componentRegistry) as BlockType[];
}
