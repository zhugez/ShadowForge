/**
 * @file src/components/icons/reverse-engineering.tsx
 * @description Reverse engineering specialization icon
 */
export const ReverseEngineeringIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M3 12h18M3 12l6-6M3 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="10" y="8" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 10h4M12 12h3M12 14h4" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
        <circle cx="16" cy="12" r="1" fill="currentColor"/>
    </svg>
);