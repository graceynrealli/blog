import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { SITE } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostGrid } from "@/features/posts/components/post-grid";
import { POST_LIMITS } from "@/features/posts/constants";
import { getLatestPosts } from "@/features/posts/queries";

export const metadata: Metadata = {
  title: "Bài viết",
  description: `Tất cả bài viết mới nhất trên ${SITE.name}.`,
};

export default async function PostsPage() {
  const posts = await getLatestPosts(POST_LIMITS.list);

  return (
    <Container className="py-16">
      <SectionHeading as="h1" eyebrow="Bài viết" title="Mới nhất" />
      <PostGrid posts={posts} />
    </Container>
  );
}
