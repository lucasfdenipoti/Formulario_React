import {
  FieldError,
  UseFormRegisterReturn,
  Control,
  Controller,
  useFieldArray,
} from "react-hook-form";
import Select from "react-select";

// Define o tipo das opções usadas nos campos de seleção
type Option = {
  value: string;
  label: string;
};

// Define as props esperadas para um campo select simples (não utilizado diretamente aqui)
type SelectFieldProps = {
  label: string;
  id: string;
  options: Option[];
  error?: FieldError;
  registration: UseFormRegisterReturn;
  control: Control<any>;
};

// Estilos personalizados para os selects do react-select, garantindo aparência coerente com o tema escuro do formulário
const reactSelectStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "rgb(39 39 42)", // fundo escuro
    borderColor: "#333",
    borderRadius: "0.375rem",
    padding: "2px",
    minHeight: "42px",
    color: "white",
    "&:hover": {
      borderColor: "#444",
    },
    "&:focus-within": {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 1px #3b82f6",
    },
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "white",
  }),
  input: (base: any) => ({
    ...base,
    color: "white",
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "rgb(39 39 42)",
    borderColor: "#333",
    borderRadius: "0.375rem",
    marginTop: "0.25rem",
  }),
  option: (base: any, { isFocused, isSelected }: any) => ({
    ...base,
    backgroundColor: isSelected ? "#333" : isFocused ? "#111" : "rgb(39 39 42)",
    color: "white",
    "&:active": {
      backgroundColor: "#1d4ed8",
    },
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#666",
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#1d4ed8",
    color: "white",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "white",
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "white",
    ":hover": {
      backgroundColor: "#1e40af",
    },
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    backgroundColor: "#333",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#666",
    ":hover": {
      color: "#666",
    },
  }),
  clearIndicator: (base: any) => ({
    ...base,
    color: "#666",
    ":hover": {
      color: "#666",
    },
  }),
};

// Lista fixa de universidades que será usada como opções no select
const universidades: Option[] = [
  { value: "Universidade de São Paulo (USP)", label: "Universidade de São Paulo (USP)" },
  { value: "Universidade Estadual de Campinas (Unicamp)", label: "Universidade Estadual de Campinas (Unicamp)" },
  // ... outras universidades omitidas para brevidade
];

// Lista fixa de graus acadêmicos que será usada no segundo select
const grausAcademicos: Option[] = [
  { value: "Tecnólogo", label: "Tecnólogo" },
  { value: "Bacharelado", label: "Bacharelado" },
  { value: "Mestrado", label: "Mestrado" },
  { value: "Doutorado", label: "Doutorado" },
];

// Componente que renderiza um campo de array de formação acadêmica com selects dinâmicos
export function AcademicBackgroundField({
  label,
  id,
  control,
  error,
}: {
  label: string;
  id: string;
  control: Control<any>; // objeto de controle do react-hook-form
  error?: FieldError;
}) {
  // Hook usado para lidar com campos dinâmicos (array de objetos)
  const { fields, append, remove } = useFieldArray({
    name: id, // 'academicBackground'
    control,
  });

  return (
    <div className="col-span-2 space-y-4">
      <div className="flex items-center"> 
        {/* Label do campo inteiro */}
        <label htmlFor={id} className="col-span-2 block text-white font-medium">
          {label}
        </label>

        {/* Botão para adicionar novo item (nova formação acadêmica) */}
        <button
          type="button"
          onClick={() => append({ university: "", degree: "" })}
          className="ml-5"
        >
          +
        </button>
      </div>

      {/* Mapeia os campos atuais do array e renderiza selects para cada um */}
      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-4 items-center">
          {/* Select controlado para universidade */}
          <Controller
            name={`${id}[${index}].university`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={universidades}
                placeholder="Selecione a Universidade..."
                className="md:w-[65%] block font-medium text-white"
                classNamePrefix="react-select"
                styles={reactSelectStyles}
                onChange={(option) => field.onChange(option?.value)} // transforma option em string
                value={
                  universidades.find((opt) => opt.value === field.value) || null
                }
              />
            )}
          />

          {/* Select controlado para grau acadêmico */}
          <Controller
            name={`${id}[${index}].degree`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={grausAcademicos}
                placeholder="Selecione o Grau..."
                className="md:w-[35%] block font-medium text-white"
                classNamePrefix="react-select"
                styles={reactSelectStyles}
                onChange={(option) => field.onChange(option?.value)}
                value={
                  grausAcademicos.find((opt) => opt.value === field.value) || null
                }
              />
            )}
          />

          {/* Botão para remover o item atual */}
          <button
            type="button"
            onClick={() => remove(index)}
          >
            X
          </button>
        </div>
      ))}

      {/* Exibe erro de validação do array, se houver */}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}