// Importa o hook useState do React para controle de estado
import { useState } from "react";

// Cria e exporta um hook customizado chamado useFeedback
export function useFeedback() {
  // Estado para armazenar a mensagem de feedback (pode ser string ou null)
  const [feedback, setFeedback] = useState<string | null>(null);

  // Função auxiliar que retorna a cor da mensagem com base no conteúdo da string de feedback
  const getFeedbackColor = () => {
    // Se não houver mensagem, retorna string vazia (sem classe de cor)
    if (!feedback) return "";

    // Se o feedback contiver "sucesso" ou "Bem-vindo", retorna cor verde
    // Caso contrário (ex: erro), retorna vermelho
    return feedback.includes("sucesso") || feedback.includes("Bem-vindo")
      ? "text-green-400"
      : "text-red-500";
  };

  return { feedback, setFeedback, getFeedbackColor };
}