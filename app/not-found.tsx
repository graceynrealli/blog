import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/config/routes";

export default function NotFound() {
  return (
    <Container width="narrow" className="flex flex-col items-center py-32 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold">Không tìm thấy trang</h1>
      <p className="mt-4 text-muted">Trang bạn tìm có thể đã bị đổi tên hoặc chưa từng tồn tại.</p>
      <ButtonLink href={ROUTES.home} className="mt-8">
        Về trang chủ
      </ButtonLink>
    </Container>
  );
}
