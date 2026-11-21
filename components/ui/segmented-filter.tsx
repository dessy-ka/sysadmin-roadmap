"use client";

type SegmentedFilterProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
};

// One "choose one of a few" control, used wherever a short list of exclusive options filters content.
export function SegmentedFilter({ label, value, options, onChange, className = "" }: SegmentedFilterProps) {
  return (
    <div className={`level-filters ${className}`.trim()} role="group" aria-label={label}>
      {options.map((option) => (
        <button key={option} type="button" className={value === option ? "active" : ""} aria-pressed={value === option} onClick={() => onChange(option)}>{option}</button>
      ))}
    </div>
  );
}
