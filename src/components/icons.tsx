import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const SearchIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const UserIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8.5" r="3.75" />
    <path d="M4.75 20c1.1-3.6 4-5.5 7.25-5.5S18.15 16.4 19.25 20" />
  </svg>
);

export const BagIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5.5 8h13l-1 12h-11z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </svg>
);

export const ChevronIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const ArrowIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const HeartIcon = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base} fill={filled ? "currentColor" : "none"} {...p}>
    <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
);

export const MinusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5.5 12h13" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const TruckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M2.75 16.5V7h10v9.5M12.75 10.5h4l3.5 3.5v2.5h-7.5" />
    <circle cx="6.5" cy="18" r="1.75" />
    <circle cx="16.5" cy="18" r="1.75" />
  </svg>
);

export const LeafIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 19.5c0-8 5-13 15-13.5.5 9-4 14-11.5 14" />
    <path d="M4.5 19.5C7 15 10.5 12 15 10.5" />
  </svg>
);

export const GrainFreeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.5c3 3.2 4.5 6 4.5 8.6A4.5 4.5 0 0 1 12 16.6a4.5 4.5 0 0 1-4.5-4.5C7.5 9.5 9 6.7 12 3.5Z" />
    <path d="M12 16.6V20.5" />
  </svg>
);

export const SeedIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 20.5c-4 0-7.5-3.4-7.5-8.5 0-4 2.6-8.5 7.5-8.5s7.5 4.5 7.5 8.5c0 5.1-3.5 8.5-7.5 8.5Z" />
    <path d="M12 3.5v17" />
  </svg>
);

export const SparkIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 10.9 10.1 9z" />
  </svg>
);

export const CertifiedIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m12 3 2.3 1.8 2.9-.2.9 2.8 2.4 1.6-1.1 2.7 1.1 2.7-2.4 1.6-.9 2.8-2.9-.2L12 21l-2.3-1.8-2.9.2-.9-2.8-2.4-1.6 1.1-2.7-1.1-2.7 2.4-1.6.9-2.8 2.9.2z" />
    <path d="m9.2 12.2 2 2 3.6-4" />
  </svg>
);

export const StoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 8.5C7 6.6 9.2 5 12 5s5 1.6 5 3.5S14.8 12 12 12 7 10.4 7 8.5Z" />
    <path d="M6 15c0-1.7 2.7-3 6-3s6 1.3 6 3-2.7 4-6 4-6-2.3-6-4Z" />
  </svg>
);

export const StarRow = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex items-center gap-[3px] ${className}`} aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} viewBox="0 0 20 20" className="h-3 w-3 fill-current">
        <path d="M10 1.6l2.4 5.1 5.6.7-4.1 3.9 1 5.5L10 14.1l-4.9 2.7 1-5.5L2 7.4l5.6-.7z" />
      </svg>
    ))}
  </span>
);

export const benefitIcons: Record<string, (p: P) => React.ReactElement> = {
  leaf: LeafIcon,
  grain: GrainFreeIcon,
  seed: SeedIcon,
  spark: SparkIcon,
  certified: CertifiedIcon,
  stone: StoneIcon,
};
