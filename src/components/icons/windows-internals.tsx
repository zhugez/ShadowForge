/**
 * @file src/components/icons/windows-internals.tsx
 * @description Windows internals specialization icon
 */
export const WindowsInternalsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="4" y="4" width="6" height="6" fill="currentColor" opacity="0.3"/>
        <rect x="14" y="4" width="6" height="6" fill="currentColor" opacity="0.5"/>
        <rect x="4" y="14" width="6" height="6" fill="currentColor" opacity="0.7"/>
        <rect x="14" y="14" width="6" height="6" fill="currentColor" opacity="0.9"/>
    </svg>
);