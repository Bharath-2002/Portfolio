"use client";
import type { ComponentProps, ElementType } from "react";
import { useGlassPointer } from "@/hooks/useGlassPointer";
import { cn } from "@/lib/cn";

type Props<T extends ElementType> = { as?: T } & ComponentProps<T>;

export function Glass<T extends ElementType = "div">({ as, className, onPointerMove, ...rest }: Props<T>) {
  const Tag: ElementType = as ?? "div";
  const move = useGlassPointer();
  return (
    <Tag
      {...rest}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        move(e);
        onPointerMove?.(e);
      }}
      className={cn("glass", className)}
    />
  );
}
