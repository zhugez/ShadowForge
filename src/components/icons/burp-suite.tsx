/**
 * @file src/components/icons/burp-suite.tsx
 * @description Burp Suite web application security testing icon
 */
export const BurpSuiteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.7"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
    </svg>
);