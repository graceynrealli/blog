import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

import type { AuthorRef } from "../types";

export function AuthorCard({ author }: { author: AuthorRef }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <Avatar name={author.displayName} src={author.avatarUrl} size="lg" />
      <div>
        <p className="font-display font-bold">{author.displayName}</p>
        <p className="font-mono text-xs text-faint">@{author.username}</p>
      </div>
    </Card>
  );
}
