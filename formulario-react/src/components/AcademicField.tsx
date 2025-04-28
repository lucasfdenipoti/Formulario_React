import {
  FieldError,
  UseFormRegisterReturn,
  Control,
  Controller,
  useFieldArray,
} from "react-hook-form";
import Select from "react-select";

// Tipo usado em ambos os selects
type Option = {
  value: string;
  label: string;
};

// Props para o select tradicional
type SelectFieldProps = {
  label: string;
  id: string;
  options: Option[];
  error?: FieldError;
  registration: UseFormRegisterReturn;
  control: Control<any>;
};

// Estilo comum para os selects do react-select
const reactSelectStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "rgb(39 39 42)",
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

// Lista de universidades
const universidades: Option[] = [
  {
    value: "Universidade de São Paulo (USP)",
    label: "Universidade de São Paulo (USP)",
  },
  {
    value: "Universidade Estadual de Campinas (Unicamp)",
    label: "Universidade Estadual de Campinas (Unicamp)",
  },
  {
    value: "Universidade Federal do Rio de Janeiro (UFRJ)",
    label: "Universidade Federal do Rio de Janeiro (UFRJ)",
  },
  {
    value: "Universidade Estadual Paulista (Unesp)",
    label: "Universidade Estadual Paulista (Unesp)",
  },
  {
    value: "Universidade Federal de Minas Gerais (UFMG)",
    label: "Universidade Federal de Minas Gerais (UFMG)",
  },
  {
    value: "Universidade Federal do Rio Grande do Sul (UFRGS)",
    label: "Universidade Federal do Rio Grande do Sul (UFRGS)",
  },
  {
    value: "Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio)",
    label: "Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio)",
  },
  {
    value: "Universidade Federal de Santa Catarina (UFSC)",
    label: "Universidade Federal de Santa Catarina (UFSC)",
  },
  {
    value: "Universidade de Brasília (UnB)",
    label: "Universidade de Brasília (UnB)",
  },
  {
    value: "Fundação Oswaldo Cruz (Fiocruz)",
    label: "Fundação Oswaldo Cruz (Fiocruz)",
  },
];

// Lista de graus acadêmicos
const grausAcademicos: Option[] = [
  { value: "Tecnólogo", label: "Tecnólogo" },
  { value: "Bacharelado", label: "Bacharelado" },
  { value: "Mestrado", label: "Mestrado" },
  { value: "Doutorado", label: "Doutorado" },
];

// Componente para o campo de Formação Acadêmica
export function AcademicBackgroundField({
  label,
  id,
  control,
  error,
}: {
  label: string;
  id: string;
  control: Control<any>;
  error?: FieldError;
}) {
  const { fields, append, remove } = useFieldArray({
    name: id, // Nome do campo para o array de campos
    control,
  });

  return (
    <div className="col-span-2 space-y-4">
      <div className="flex items-center"> 
        <label htmlFor={id} className="col-span-2 block text-white font-medium">
          {label}
        </label>

        {/* Botão de Adicionar */}
        <button
          type="button"
          onClick={() => append({ university: "", degree: "" })}
          className="ml-5"
        >
          +
        </button>
      </div>

      {/* Campos dinâmicos de Formação Acadêmica */}
      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-4 items-center">
          {/* Select para a Universidade */}
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
                onChange={(option) => field.onChange(option?.value)}
                value={
                  universidades.find((opt) => opt.value === field.value) || null
                }
              />
            )}
          />
          {/* Select para o Grau Acadêmico */}
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
                  grausAcademicos.find((opt) => opt.value === field.value) ||
                  null
                }
              />
            )}
          />
          {/* Botão de Remover */}
          <button
            type="button"
            onClick={() => remove(index)}
          >
            X
          </button>
        </div>
      ))}

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
