import { CardGrid } from "@/components/ui/card-grid";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { TOPICS_SECTION_ID } from "@/config/routes";
import { CategoryCard } from "@/features/posts/components/category-card";
import type { CategoryNode } from "@/features/posts/types";

export function TopicsSection({ categories }: { categories: CategoryNode[] }) {
  return (
    <section id={TOPICS_SECTION_ID} className="scroll-mt-20 border-y border-border bg-surface-sunken">
      <Container className="py-16">
        <SectionHeading eyebrow="Chọn món" title="Chủ đề" />
        {categories.length > 0 ? (
          <CardGrid as="ul" columns={4}>
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </CardGrid>
        ) : (
          <EmptyState title="Chưa có chủ đề" />
        )}
      </Container>
    </section>
  );
}
