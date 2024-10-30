import { component$, useSignal, useVisibleTask$, Slot } from "@builder.io/qwik";

interface TooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

export const Tooltip = component$<TooltipProps>(({ 
  content,
  position = "top"
}) => {
  const tooltipRef = useSignal<HTMLDivElement>();
  const isVisible = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => isVisible.value);
    if (tooltipRef.value) {
      tooltipRef.value.style.opacity = isVisible.value ? "1" : "0";
    }
  });

  return (
    <div 
      class="tooltip-wrapper"
      onMouseEnter$={() => isVisible.value = true}
      onMouseLeave$={() => isVisible.value = false}
    >
      <Slot />
      <div 
        ref={tooltipRef}
        class={`tooltip tooltip-${position}`}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
});