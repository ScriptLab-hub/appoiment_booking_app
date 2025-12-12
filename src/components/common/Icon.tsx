import React, { useMemo } from 'react';

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  size?: number | string;
  fill?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, fill, className, ...props }) => {
  const svgHtml = useMemo(() => {
    // @ts-ignore
    if (!window.lucide) return null;
    
    // Convert kebab-case (arrow-right) to PascalCase (ArrowRight) for lookup
    const pascalName = name.replace(/(^\w|-\w)/g, (clear) => clear.replace(/-/, "").toUpperCase());
    
    // @ts-ignore
    const iconData = window.lucide.icons ? window.lucide.icons[pascalName] : null;
    
    if (!iconData) {
      console.warn(`Icon "${name}" not found in Lucide library.`);
      return null;
    }

    try {
      // Attributes for the SVG
      const attrs = {
        width: String(size),
        height: String(size),
        class: className || '',
        fill: fill || 'none',
        ...props
      };

      // Modern Lucide (icons are data, global createElement function exists)
      // @ts-ignore
      if (typeof window.lucide.createElement === 'function') {
         // @ts-ignore
         const element = window.lucide.createElement(iconData, attrs);
         return element.outerHTML;
      }

      // Handle Legacy Lucide (where icons were objects with toSvg)
      // @ts-ignore
      if (typeof iconData.toSvg === 'function') {
        // @ts-ignore
        return iconData.toSvg(attrs);
      }
      
      return null;

    } catch (e) {
      console.error('Error rendering icon:', e);
      return null;
    }

  }, [name, size, fill, className, props]);

  if (!svgHtml) return <span className={className} />;

  return <span dangerouslySetInnerHTML={{ __html: svgHtml }} className="inline-flex items-center justify-center" />;
};