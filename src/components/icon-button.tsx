import Link from "next/link";
import { ReactNode } from "react";

export function IconButton(props: {
  label: string;
  url: string;
  icon: ReactNode;
}) {
  return (
    <Link
      className="block font-gothic w-fit border border-neutral-600 rounded-full p-2 dark:text-white dark:border-white"
      href={props.url}
    >
      <span className="sr-only">{props.label}</span>
      {props.icon}
    </Link>
  );
}
