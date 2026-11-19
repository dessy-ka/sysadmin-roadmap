import { createSocialImage } from "@/lib/social-image";

export const alt = "SYSADMIN. — Build the skills to run reliable systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage();
}
