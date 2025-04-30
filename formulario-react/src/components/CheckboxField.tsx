import { FieldError, UseFormRegisterReturn } from "react-hook-form";

// Define as propriedades esperadas pelo componente CheckboxField
type CheckboxFieldProps = {
  label: string; // Rótulo que será exibido ao lado do checkbox
  id: string; // Identificador usado no <input> e no <label> (para acessibilidade)
  error?: FieldError; // Possível erro de validação para o campo
  registration: UseFormRegisterReturn; // Objeto de registro fornecido por useForm para conectar o input ao formulário
};

// Componente funcional que renderiza um checkbox com label e mensagem de erro
export function CheckboxField({
  label,
  id,
  error,
  registration,
}: CheckboxFieldProps) {
  return (
    <div className="space-y-1">
      {/* Wrapper que alinha horizontalmente o checkbox e o label */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox" // Define o tipo do input como checkbox
          id={id} // Atribui um id para associar com o label
          {...registration} // Conecta o campo ao react-hook-form
          className="w-4 h-4" // Tamanho do checkbox
        />
        {/* Label descritivo para o checkbox */}
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      </div>

      {/* Exibe a mensagem de erro, caso exista */}
      {error && <p className="text-red-400 text-sm">{error.message}</p>}
    </div>
  );
}