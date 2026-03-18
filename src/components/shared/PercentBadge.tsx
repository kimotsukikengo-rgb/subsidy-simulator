interface PercentBadgeProps {
  rateDisplay: string;
  className?: string;
}

export function PercentBadge({ rateDisplay, className = '' }: PercentBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold
                  bg-accent-50 text-accent-700 border border-accent-200 ${className}`}
    >
      {rateDisplay}
    </span>
  );
}
