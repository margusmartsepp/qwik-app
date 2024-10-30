import { component$, type PropFunction } from "@builder.io/qwik";

interface TextAreaProps {
  value: string;
  onChange$: PropFunction<(value: string) => void>;
  error?: string;
  label?: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  class?: string;
}

export const TextArea = component$<TextAreaProps>(({ 
  value,
  onChange$,
  error,
  label,
  id,
  disabled,
  placeholder,
  class: className,
}) => {
  return (
    <div class="textarea-wrapper">
      {label && <label for={id}>{label}</label>}
      <textarea
        id={id}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onInput$={(e) => onChange$((e.target as HTMLTextAreaElement).value)}
        class={[
          "textarea",
          error && "textarea-error",
          className,
        ].filter(Boolean).join(" ")}
      />
      {error && <span class="error-message">{error}</span>}
    </div>
  );
});