/**
 * @file src/components/icons/ghidra.tsx
 * @description Ghidra reverse engineering tool icon
 */
export const GhidraIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 9l5-3 5 3v6l-5 3-5-3z" fill="currentColor" opacity="0.7"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
);