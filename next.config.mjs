const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/SS";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: isGithubPages,
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath: githubPagesBasePath,
        assetPrefix: `${githubPagesBasePath}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
