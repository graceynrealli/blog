import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/config/routes";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(96_165_250/0.14),transparent_60%)]"
      />
      <Container className="relative py-20 md:py-28">
        <p className="font-mono text-sm text-accent">{"// nhật ký của developer"}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-balance md:text-6xl">
          Học một chút mỗi ngày, <span className="text-accent">ghi lại</span> và chia sẻ.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Bài viết thực chiến từ những người đang viết code mỗi ngày, từ frontend, backend tới DevOps và AI.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={ROUTES.posts} size="lg">
            Đọc bài mới nhất
          </ButtonLink>
          <ButtonLink href={ROUTES.topics} variant="outline" size="lg">
            Chọn chủ đề
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
