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
  // exportPathMap: async (defaultPathMap) => {
  //   // defaultPathMap에는 '/'('/index.html'), '/404', '/posts/[slug]' 등이 들어 있고
  //   // 우리가 원하는 건 이 키들 앞에 '/sim'을 붙여 주는 것뿐입니다.
  //   const newPathMap = {};
  //   Object.entries(defaultPathMap).forEach(([path, value]) => {
  //     // 예: '/' → '/sim/', '/posts/post1' → '/sim/posts/post1'
  //     const prefixed = path === "/" ? "/sim/" : `/sim${path}`;
  //     newPathMap[prefixed] = value;
  //   });
  //   return newPathMap;
  // },
};

module.exports = nextConfig;
