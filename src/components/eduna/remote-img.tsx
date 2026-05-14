"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RemoteImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  /** Local asset URL (imported jpg/png) when remote fails */
  fallback: string;
};

export function RemoteImg({ src, fallback, className, alt, onError, ...rest }: RemoteImgProps) {
  const [current, setCurrent] = React.useState(src);

  React.useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <img
      src={current}
      alt={alt}
      className={cn(className)}
      onError={(e) => {
        if (current !== fallback) setCurrent(fallback);
        onError?.(e);
      }}
      {...rest}
    />
  );
}
