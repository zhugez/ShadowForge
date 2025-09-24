/**
 * @file src/components/icons/ida-pro.tsx
 * @description IDA Pro reverse engineering tool icon
 */
export const IdaProIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 6h12v2H6zM6 10h8v2H6zM6 14h10v2H6zM16 10v6h2v-6z" fill="currentColor"/>
        <circle cx="19" cy="5" r="1" fill="currentColor"/>
    </svg>
);