import { component$, Slot, type PropFunction, type QRL } from "@builder.io/qwik";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  onClick$?: PropFunction<() => void>;
  class?: string;
}

export const Button = component$<ButtonProps>(({ 
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  onClick$,
  class: className,
}) => {
  return (
    <button
      onClick$={onClick$}
      disabled={isLoading || disabled}
      class={[
        "button",
        `button-${variant}`,
        `button-${size}`,
        isLoading && "loading",
        className,
      ].filter(Boolean).join(" ")}
    >
      {isLoading ? (
        <span class="loading-spinner" aria-hidden="true" />
      ) : (
        <Slot />
      )}
    </button>
  );
});