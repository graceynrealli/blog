import Link from "next/link";
import type { ComponentProps } from "react";

import { buttonClassName, type ButtonStyleProps } from "./button-variants";

type ButtonProps = ComponentProps<"button"> & ButtonStyleProps;

export function Button({ variant, size, fullWidth, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClassName({ variant, size, fullWidth }, className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonStyleProps;

export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClassName({ variant, size, fullWidth }, className)} {...props} />;
}
