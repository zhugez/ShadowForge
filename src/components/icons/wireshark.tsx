/**
 * @file src/components/icons/wireshark.tsx
 * @description Wireshark network protocol analyzer icon
 */
export const WiresharkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12l2-2 2 2 2-2 2 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 9h12M6 15h12" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
    </svg>
);