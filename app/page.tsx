import { HomeHero } from "@/features/home/components/home-hero";
import { LatestPostsSection } from "@/features/home/components/latest-posts-section";
import { TopicsSection } from "@/features/home/components/topics-section";
import { POST_LIMITS } from "@/features/posts/constants";
import { getCategoryTree, getLatestPosts } from "@/features/posts/queries";

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getLatestPosts(POST_LIMITS.home), getCategoryTree()]);

  return (
    <>
      <HomeHero />
      <LatestPostsSection posts={posts} />
      <TopicsSection categories={categories} />
    </>
  );
}
