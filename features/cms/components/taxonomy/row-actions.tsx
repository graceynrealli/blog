import { Button } from "@/components/ui/button";

type RowActionsProps = { onEdit?: () => void; onDelete?: () => void; disabled?: boolean };

export function RowActions({ onEdit, onDelete, disabled }: RowActionsProps) {
  return (
    <div className="flex gap-3">
      {onEdit && (
        <Button variant="ghost" className="text-sm" disabled={disabled} onClick={onEdit}>
          Sửa
        </Button>
      )}
      {onDelete && (
        <Button variant="ghost" className="text-sm hover:text-danger" disabled={disabled} onClick={onDelete}>
          Xoá
        </Button>
      )}
    </div>
  );
}
