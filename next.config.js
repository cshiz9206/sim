/** @type {import('next').NextConfig} */
const nextConfig = {
  // 빌드 후 자동으로 out/ 폴더에 static export
  basePath: "/sim",
  assetPrefix: "/sim",
  output: "export",
};

module.exports = nextConfig;
