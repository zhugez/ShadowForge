/**
 * @file src/components/icons/rust.tsx
 * @description The official logo for Rust as an SVG component.
 */
export const RustIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M23.834 8.101a13.912 13.912 0 0 1-13.643 14.72 15.284 15.284 0 0 1-7.938-3.333 13.176 13.176 0 0 1-1.85-1.463 13.948 13.948 0 0 1 24.431-9.924z"
        />
        <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="0.8"/>
    </svg>
);