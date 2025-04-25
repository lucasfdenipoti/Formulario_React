import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Control } from "react-hook-form";

// Define o tipo das props (propriedades) do componente InputField
export type InputFieldProps = {
  label: string;                      // Texto que será exibido como rótulo do input
  id: string;                         // Identificador único do input (usado como id e name)
  type?: string;                      // Tipo do input (ex: text, email, password...) — opcional
  error?: FieldError;                 // Objeto de erro retornado pelo react-hook-form, se houver validação
  registration?: UseFormRegisterReturn; // Resultado do register() do RHF, conecta o input ao formulário
  control?: Control<any>;             // Usado se o input for controlado por Controller (ex: select, input customizado)
  defaultValue?: any;                 // Valor inicial do campo (útil para formulários de edição)
  max?: string;                       // Valor máximo (ex: para data de nascimento)
};
