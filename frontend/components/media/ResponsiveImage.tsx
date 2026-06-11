/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { publicAsset } from "@/lib/assets";

type ResponsiveImageProps = {
  src: string;
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
  decoding?: "async" | "auto" | "sync";
  sizes?: string;
  width?: number;
  height?: number;
  fetchPriority?: "high" | "low" | "auto";
  style?: CSSProperties;
};

export function ResponsiveImage({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  decoding = "async",
  sizes,
  width,
  height,
  fetchPriority,
  style,
}: ResponsiveImageProps) {
  const sizeProps = sizes ? { sizes } : {};

  return (
    <img
      src={publicAsset(src)}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      width={width}
      height={height}
      fetchPriority={fetchPriority}
      style={style}
      {...sizeProps}
    />
  );
}
