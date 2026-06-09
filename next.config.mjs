const isGithubPages = process.env.GITHUB_PAGES === "true";
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/SS-v2";
const githubPagesBasePath =
  configuredBasePath === "/" ? "" : configuredBasePath.startsWith("/") ? configuredBasePath : `/${configuredBasePath}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: isGithubPages,
  },
  ...(isGithubPages
    ? {
        output: "export",
        ...(githubPagesBasePath ? { basePath: githubPagesBasePath, assetPrefix: `${githubPagesBasePath}/` } : {}),
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
