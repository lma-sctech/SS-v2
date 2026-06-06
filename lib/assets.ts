const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicAsset(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const base = publicBasePath.endsWith("/") ? publicBasePath.slice(0, -1) : publicBasePath;
  const assetPath = path.startsWith("/") ? path : `/${path}`;

  return `${base}${assetPath}`;
}
