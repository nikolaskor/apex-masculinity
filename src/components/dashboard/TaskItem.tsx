"use client";

interface Props {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  onComplete: (id: number) => void;
}

export default function TaskItem({
  id,
  name,
  description,
  completed,
  onComplete,
}: Props) {
  return (
    <label className="flex items-start gap-3 p-3 border rounded hover:bg-muted/30">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {
          if (!completed) onComplete(id);
        }}
        className="mt-1"
      />
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </label>
  );
}
