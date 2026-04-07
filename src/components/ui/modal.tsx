// src/components/ui/Modal.tsx
import { useEffect } from "react";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;   // default: "Ya, Hapus"
  cancelLabel?: string;    // default: "Batal"
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

export function Modal({
  isOpen,
  title,
  message,
  confirmLabel = "Ya, Hapus",
  cancelLabel = "Batal",
  variant = "danger",
  onConfirm,
  onCancel,
}: ModalProps) {

  // Disable scroll saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup saat komponen unmount
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Kalau tidak open, tidak render apapun
  if (!isOpen) return null;

  return (
    // Overlay gelap di belakang modal
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel} // klik di luar modal = tutup
    >
      {/* Modal box — stopPropagation supaya klik di dalam tidak tutup modal */}
      <div
        className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon dan Title */}
        <div className="flex items-center gap-3 mb-2">
          {variant === "danger" && (
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <span className="text-red-600 text-lg">!</span>
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        {/* Pesan */}
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        {/* Tombol aksi */}
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}