/**
 * @file src/components/icons/x64dbg.tsx
 * @description x64dbg debugger tool icon
 */
export const X64DbgIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="4" y="6" width="16" height="2" fill="currentColor" opacity="0.7"/>
        <rect x="4" y="10" width="12" height="1" fill="currentColor" opacity="0.5"/>
        <rect x="4" y="12" width="14" height="1" fill="currentColor" opacity="0.5"/>
        <rect x="4" y="14" width="10" height="1" fill="currentColor" opacity="0.5"/>
        <rect x="4" y="16" width="8" height="1" fill="currentColor" opacity="0.5"/>
        <circle cx="19" cy="11" r="1" fill="red"/>
    </svg>
);