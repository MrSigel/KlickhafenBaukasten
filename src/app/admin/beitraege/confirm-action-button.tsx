"use client";

import { useFormStatus } from "react-dom";

export function ConfirmActionButton({
  children,
  message,
  pendingText,
  className,
}: {
  children: React.ReactNode;
  message: string;
  pendingText: string;
  className: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      className={className}
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {pending ? pendingText : children}
    </button>
  );
}
