/** @type {import('next').NextConfig} */
const nextConfig = {
  // 모든 페이지 URL에 /sim 을 붙입니다
  basePath: "/sim",
  // 정적 자산 경로에도 /sim 을 붙입니다
  assetPrefix: "/sim",
  // 정적 export 모드 활성화
  output: "export",
  // 트레일링 슬래시를 켜면 out/sim/index.html 과 같은 디렉터리 구조가 생성됩니다
  trailingSlash: true,
  exportPathMap: async (defaultMap) => {
    const paths = {};
    Object.entries(defaultMap).forEach(([route, config]) => {
      // '/' → '/sim/', '/posts/post1' → '/sim/posts/post1'
      const outRoute = route === "/" ? "/sim/" : `/sim${route}`;
      paths[outRoute] = config;
    });
    return paths;
  },
};

module.exports = nextConfig;
