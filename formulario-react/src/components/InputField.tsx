export function InputField({
  label,
  id,
  type = "text",
  error,
  registration,
  control,
  defaultValue,
  max
}: InputFieldProps) {
  
  // Se usando Controller (para react-select, etc)
  if (control) {
    return (
      <Controller
        name={id}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div>
            <label htmlFor={id} className="block mb-1">{label}</label>
            <input
              id={id}
              type={type}
              max={max}
              className={`w-full px-4 py-2 rounded bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? "border border-red-500" : ""
              }`}
              {...field}
            />
            {error && <span className="text-red-500 text-sm">{error.message}</span>}
          </div>
        )}
      />
    );
  }

  // Modo padrão (com register)
  return (
    <div>
      <label htmlFor={id} className="block mb-1">{label}</label>
      <input
        id={id}
        type={type}
        max={max}
        defaultValue={defaultValue} // Suporte a initialData
        className={`w-full px-4 py-2 rounded bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border border-red-500" : ""
        }`}
        {...registration}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
}