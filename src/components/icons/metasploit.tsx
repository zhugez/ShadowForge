/**
 * @file src/components/icons/metasploit.tsx
 * @description Metasploit penetration testing framework icon
 */
export const MetasploitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M12 2L3 7v5l9 8 9-8V7l-9-5z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6l-6 3v3l6 5 6-5v-3l-6-3z" fill="currentColor" opacity="0.6"/>
        <path d="M12 8l-3 2v2l3 3 3-3v-2l-3-2z" fill="currentColor"/>
    </svg>
);