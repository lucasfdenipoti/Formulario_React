// Componente reutilizável de campo de input que funciona tanto com "register" quanto com "Controller" (React Hook Form)
export function InputField({
  label,         // Rótulo exibido acima do input
  id,            // ID usado para conectar o <label> ao <input>
  type = "text", // Tipo do input (ex: "text", "email", "date"...) — padrão é "text"
  error,         // Objeto de erro (vindo do React Hook Form) para exibir mensagens de validação
  registration,  // Função register do React Hook Form (para inputs comuns)
  control,       // Objeto control do React Hook Form (necessário para inputs controlados como react-select)
  defaultValue,  // Valor inicial do campo
  max            // Valor máximo (por exemplo, para inputs do tipo "date" ou "number")
}: InputFieldProps) {

  // Se o prop "control" for passado, significa que o campo será controlado por <Controller>
  // Isso é necessário para inputs personalizados como react-select, máscaras, etc.
  if (control) {
    return (
      <Controller
        name={id}                 // Nome do campo (deve bater com o schema do RHF)
        control={control}         // Passa o objeto control fornecido pelo RHF
        defaultValue={defaultValue} // Valor inicial
        render={({ field }) => (   // Função que retorna o JSX do campo
          <div>
            {/* Label para acessibilidade */}
            <label htmlFor={id} className="block mb-1">{label}</label>

            {/* Campo de input controlado */}
            <input
              id={id}
              type={type}
              max={max}
              className={`w-full px-4 py-2 rounded bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? "border border-red-500" : ""
              }`}
              {...field} // Props do React Hook Form que ligam o input ao controle
            />

            {/* Mensagem de erro, se houver */}
            {error && <span className="text-red-500 text-sm">{error.message}</span>}
          </div>
        )}
      />
    );
  }

    // Caso o campo não precise de controle especial, usa o padrão com register
    return (
      <div>
        {/* Label para o campo */}
        <label htmlFor={id} className="block mb-1">{label}</label>
  
        {/* Campo de input comum */}
        <input
          id={id}
          type={type}
          max={max}
          defaultValue={defaultValue} // Suporte para preencher dados iniciais
          className={`w-full px-4 py-2 rounded bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border border-red-500" : ""
          }`}
          {...registration} // Registra o input no formulário usando register
        />
  
        {/* Mensagem de erro, se houver */}
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
      </div>
    );
  }
  