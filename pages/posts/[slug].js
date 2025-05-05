// pages/posts/[slug].js

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// 1) 어떤 slug들이 있는지 미리 정의
export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDir); // ['my-first-post.md', ...]
  const paths = filenames.map((name) => ({
    params: { slug: name.replace(/\.md$/, "") },
  }));
  return { paths, fallback: false };
}

// 2) 각 slug에 맞는 콘텐츠를 가져와 props로 넘김
export async function getStaticProps({ params }) {
  const postsDir = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDir, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  // front-matter와 본문 분리
  const { data: frontMatter, content } = matter(fileContents);

  // Markdown → HTML 변환
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    props: {
      frontMatter,
      contentHtml,
    },
  };
}

// 3) 꼭 default export로 React 컴포넌트 내보내기
export default function PostPage({ frontMatter, contentHtml }) {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>{frontMatter.title}</h1>
      <p>
        <em>{frontMatter.date}</em>
      </p>
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
