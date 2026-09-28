import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/text-link";
import { FOOTER_NAV } from "@/config/navigation";
import { SITE } from "@/config/site";

import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface-sunken">
      <Container className="grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">{SITE.tagline}</p>
        </div>
        {FOOTER_NAV.map((group) => (
          <div key={group.title}>
            <Eyebrow className="mb-3">{group.title}</Eyebrow>
            <ul className="space-y-2 text-sm">
              {group.items.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href}>{item.label}</TextLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-border py-6 text-center font-mono text-xs text-faint">
        © {new Date().getFullYear()} {SITE.name}
      </div>
    </footer>
  );
}
