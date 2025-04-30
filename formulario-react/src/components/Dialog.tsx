import React from "react";
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Define a interface (tipo) das props que o componente Dialog pode receber
interface DialogProps {
  open: boolean; // Define se o dialog está aberto
  title: string; // Título principal do modal
  description?: string; // Descrição opcional abaixo do título
  confirmText?: string; // Texto do botão de confirmar (padrão: "Confirmar")
  cancelText?: string; // Texto do botão de cancelar (padrão: "Cancelar")
  onConfirm?: () => void; // Função executada ao clicar em confirmar
  onCancel: () => void; // Função executada ao cancelar ou fechar o modal
  children?: React.ReactNode; // Conteúdo opcional dentro do modal
}

// Componente funcional Dialog
export function Dialog({
  open,
  title,
  description,
  confirmText = "Confirmar", 
  cancelText = "Cancelar",   
  onConfirm,
  onCancel,
  children,
}: DialogProps) {
  return (
    // Usa o componente de Dialog da Shadcn UI, passando a prop "open"
    // Quando o estado de "open" mudar para false (modal fechar), chama onCancel
    <ShadcnDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      {/* Camada escura por trás do modal */}
      <DialogOverlay />

      {/* Conteúdo principal do modal, com estilização personalizada */}
      <DialogContent className="sm:max-w-[400px] bg-zinc-800 text-white border border-[#333]">
        {/* Cabeçalho do modal com título e descrição opcional */}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* Conteúdo personalizado passado via children */}
        {children}

        {/* Rodapé com os botões */}
        <DialogFooter className="flex gap-2">
          {/* Botão de cancelar com estilo escuro e hover */}
          <Button
            onClick={onCancel}
            className="bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500"
          >
            {cancelText}
          </Button>

          {/* Botão de confirmar só aparece se a função onConfirm for passada */}
          {onConfirm && (
            <Button
              onClick={onConfirm}
              className="bg-blue-600 text-white border border-transparent hover:bg-blue-700 hover:border-blue-500"
            >
              {confirmText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </ShadcnDialog>
  );
}