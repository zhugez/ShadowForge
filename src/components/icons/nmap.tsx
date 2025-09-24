/**
 * @file src/components/icons/nmap.tsx
 * @description Nmap network discovery and security auditing icon
 */
export const NmapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="16" cy="8" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="8" cy="16" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.7"/>
        <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </svg>
);