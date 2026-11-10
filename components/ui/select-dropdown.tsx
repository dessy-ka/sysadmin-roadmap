"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type SelectDropdownProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
  icon?: LucideIcon;
};

export function SelectDropdown({ value, options, onChange, ariaLabel, className = "", icon: Icon }: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(Math.max(0, options.indexOf(value)));
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectedIndex = Math.max(0, options.indexOf(value));

  useEffect(() => {
    if (!open) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, id, open]);

  const showMenu = () => {
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  const choose = (option: string) => {
    onChange(option);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!open && ["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      showMenu();
      return;
    }
    if (!open) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => (current + direction + options.length) % options.length);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(options[activeIndex] ?? value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div className={`select-dropdown ${className}`} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`select-dropdown-trigger${open ? " is-open" : ""}`}
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        onClick={() => open ? setOpen(false) : showMenu()}
        onKeyDown={handleKeyDown}
      >
        {Icon && <Icon className="select-dropdown-leading-icon" size={16} aria-hidden="true" />}
        <span className="select-dropdown-value">{value}</span>
        <ChevronDown className="select-dropdown-chevron" size={17} aria-hidden="true" />
      </button>
      {open && <div className="select-dropdown-menu" id={id} role="listbox" aria-label={ariaLabel}>
        <div className="select-dropdown-options">
          {options.map((option, index) => {
            const selected = option === value;
            const active = index === activeIndex;
            return <div
              id={`${id}-option-${index}`}
              key={option}
              role="option"
              aria-selected={selected}
              className={`select-dropdown-option${selected ? " is-selected" : ""}${active ? " is-active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(option)}
            >
              <span>{option}</span>
              {selected && <Check size={16} aria-hidden="true" />}
            </div>;
          })}
        </div>
      </div>}
    </div>
  );
}
