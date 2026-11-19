"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Makes Framer Motion honour the visitor's prefers-reduced-motion setting (transforms are disabled, opacity still fades). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
