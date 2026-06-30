import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

/**
 * Modal
 * -----
 * Sobrepõe a tela com um overlay escurecido (bloqueando interação com o
 * conteúdo abaixo) e exibe um conteúdo central com transição de
 * fade-in/fade-out.
 *
 * Props:
 * - isOpen: boolean — controla se o modal está visível
 * - onClose: função chamada ao fechar (botão X, clique no overlay, ESC)
 * - title: título opcional exibido no cabeçalho
 * - children: conteúdo do modal
 * - closeOnOverlayClick: boolean (default true)
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeOnOverlayClick = true,

  className = "",
  style = {},
}) {
  // Mantém o modal montado durante a animação de saída
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);

      // pequeno delay para garantir que a transição de entrada dispare
      setIsVisible(true);
      //   const id = requestAnimationFrame(() => setIsVisible(true));
      //   return () => cancelAnimationFrame(id);
    } else {
      setIsVisible(false);
      const timeout = setTimeout(() => setShouldRender(false), 220);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // const handleKeyDown = useCallback(
  //   (e) => {
  //     if (e.key === "Escape") onClose?.();
  //   },
  //   [onClose],
  // );

  // useEffect(() => {
  //   if (!shouldRender) return;
  //   document.addEventListener("keydown", handleKeyDown);
  //   // bloqueia o scroll do conteúdo de fundo enquanto o modal está aberto
  //   const prevOverflow = document.body.style.overflow;
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //     document.body.style.overflow = prevOverflow;
  //   };
  // }, [shouldRender, handleKeyDown]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Overlay — bloqueia interação com o conteúdo abaixo */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Conteúdo do modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-xl w-full max-w-[95vw] max-h-[95vh] overflow-y-auto transition-all duration-200 ease-out ${className}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "scale(1) translateY(0)"
            : "scale(0.96) translateY(8px)",
          ...style,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title ? null : (
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-lg font-semibold text-gray-900 pr-8">
              {title}
            </h2>
          </div>
        )}

        <div className="px-6 py-4">{children}</div>
      </div>
      <button
        onClick={onClose}
        aria-label="Fechar"
        className="absolute origin-center top-4 right-4 p-1.5 rounded-full border text-red-500 hover:scale-110 active:scale-90 bg-gray-100/35 hover:bg-gray-100 hover:shadow-sm cursor-pointer transition-all"
      >
        <X size={18} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Exemplo de uso                                                      */
/* ------------------------------------------------------------------ */
//
// function App() {
//   const [open, setOpen] = useState(false);
//
//   return (
//     <>
//       <button onClick={() => setOpen(true)}>Abrir modal</button>
//
//       <Modal isOpen={open} onClose={() => setOpen(false)} title="Detalhes">
//         <p>Conteúdo do modal aqui.</p>
//       </Modal>
//     </>
//   );
// }
