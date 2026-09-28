import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Input, Label } from "@/components/ui/input";

import { signInWithEmail, signInWithGitHub } from "../actions";
import { LOGIN_FORM_FIELDS } from "../constants";

export function LoginForm({ next }: { next: string }) {
  return (
    <>
      <form action={signInWithGitHub} className="mt-8">
        <input type="hidden" name={LOGIN_FORM_FIELDS.next} value={next} />
        <Button type="submit" variant="inverted" size="lg" fullWidth>
          Tiếp tục với GitHub
        </Button>
      </form>

      <Divider label="hoặc" />

      <form action={signInWithEmail} className="space-y-3">
        <input type="hidden" name={LOGIN_FORM_FIELDS.next} value={next} />
        <Label htmlFor={LOGIN_FORM_FIELDS.email}>Email</Label>
        <Input
          id={LOGIN_FORM_FIELDS.email}
          name={LOGIN_FORM_FIELDS.email}
          type="email"
          required
          autoComplete="email"
          placeholder="ban@example.com"
        />
        <Button type="submit" size="lg" fullWidth>
          Gửi liên kết đăng nhập
        </Button>
      </form>
    </>
  );
}
