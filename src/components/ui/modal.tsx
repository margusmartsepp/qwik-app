import { component$, useSignal, useTask$, $, Slot, QRL } from "@builder.io/qwik";

interface ModalProps {
  isOpen: boolean;
  onClose$: QRL<() => void>;
  title: string;
}

export const Modal = component$<ModalProps>(({ isOpen, onClose$, title }) => {
  const modalRef = useSignal<HTMLDivElement>();

  useTask$(({ track }) => {
    track(() => isOpen);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
  });

  const handleEscape$ = $((event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      onClose$();
    }
  });

  useTask$(({ track }) => {
    track(() => isOpen);
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', (e) => handleEscape$(e));
      return () => {
        document.removeEventListener('keydown', (e) => handleEscape$(e));
      };
    }
  });

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      class="modal-overlay"
      onClick$={(e) => {
        if (e.target === modalRef.value) {
          onClose$();
        }
      }}
    >
      <div
        class="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div class="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            class="modal-close"
            onClick$={onClose$}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div class="modal-body">
          <Slot />
        </div>
      </div>
    </div>
  );
});