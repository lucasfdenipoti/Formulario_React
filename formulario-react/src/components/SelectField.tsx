import { FieldError, UseFormRegisterReturn, Control, Controller } from "react-hook-form";
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
    backgroundColor: 'rgb(39 39 42)',
    borderColor: '#333',
    borderRadius: '0.375rem',
    padding: '2px',
    minHeight: '42px',
    color: 'white',
    '&:hover': {
      borderColor: '#444'
    },
    '&:focus-within': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 1px #3b82f6'
    }
  }),
  singleValue: (base: any) => ({
    ...base,
    color: 'white'
  }),
  input: (base: any) => ({
    ...base,
    color: 'white'
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: 'rgb(39 39 42)',
    borderColor: '#333',
    borderRadius: '0.375rem',
    marginTop: '0.25rem'
  }),
  option: (base: any, { isFocused, isSelected }: any) => ({
    ...base,
    backgroundColor: isSelected 
      ? '#333' 
      : isFocused 
        ? '#111' 
        : 'rgb(39 39 42)',
    color: 'white',
    '&:active': {
      backgroundColor: '#1d4ed8'
    }
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#666'
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: '#1d4ed8',
    color: 'white',
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: 'white',
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: 'white',
    ':hover': {
      backgroundColor: '#1e40af',
    },
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    backgroundColor: '#333'
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: '#666',
    ':hover': {
      color: '#666'
    }
  }),
  clearIndicator: (base: any) => ({
    ...base,
    color: '#666',
    ':hover': {
      color: '#666'
    }
  })
};

// Select padrão (sem busca), usado por exemplo para "Gênero"
export function SelectField({ label, id, options, error, control }: SelectFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block font-medium text-white">
        {label}
      </label>

      <Controller
        name={id}
        control={control}
        rules={{ required: "Campo obrigatório" }}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder="Selecione..."
            className="react-select-container"
            classNamePrefix="react-select"
            styles={reactSelectStyles} // Usa o mesmo estilo dos outros selects
            onChange={(option) => field.onChange(option?.value)} // Ajuste para salvar apenas o valor
            value={options.find((opt) => opt.value === field.value)} // Mantém o valor selecionado
          />
        )}
      />

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}

// Props específicas do campo de estado com react-select
type StateSelectFieldProps = {
  label: string;
  id: string;
  control: Control<any>;
  error?: FieldError;
};

// Lista de estados brasileiros
const estadosBrasileiros: Option[] = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

// Campo de seleção de estado com barra de pesquisa (react-select)
export function StateSelectField({ label, id, control, error }: StateSelectFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block font-medium text-white">
        {label}
      </label>

      {/* Controlador do react-hook-form para usar react-select */}
      <Controller
        name="state"
        control={control}
        rules={{ required: "Estado é obrigatório" }}
        render={({ field }) => (
          <Select
            {...field}
            options={estadosBrasileiros}
            placeholder="Selecione um estado..."
            className="react-select-container"
            classNamePrefix="react-select"
            styles={reactSelectStyles}
          />
        )}
      />

      {/* Exibe erro de validação, se houver */}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}

// Props para o select de múltiplas escolhas
type MultiSelectFieldProps = {
  label: string;
  id: string;
  options: Option[];
  error?: FieldError;
  control: Control<any>;
};

// Lista de áreas de TI
const areasTI: Option[] = [
  { value: "frontend", label: "Front-end Development" },
  { value: "backend", label: "Back-end Development" },
  { value: "fullstack", label: "Full-stack Development" },
  { value: "mobile", label: "Mobile Development" },
  { value: "devops", label: "DevOps" },
  { value: "cloud", label: "Cloud Computing" },
  { value: "ai", label: "Inteligência Artificial" },
  { value: "data_science", label: "Data Science" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "blockchain", label: "Blockchain" },
  { value: "ui_ux", label: "UI/UX Design" },
  { value: "qa", label: "Quality Assurance" },
  { value: "game_dev", label: "Game Development" },
  { value: "embedded", label: "Embedded Systems" },
  { value: "database", label: "Database Administration" },
  { value: "networking", label: "Networking" },
  { value: "it_support", label: "IT Support" },
  { value: "project_management", label: "Project Management" },
  { value: "business_analysis", label: "Business Analysis" },
  { value: "agile", label: "Agile Methodologies" },
];

// Campo de seleção múltipla para áreas de TI
export function MultiSelectTI({ label, id, control, error }: MultiSelectFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block font-medium text-white">
        {label}
      </label>

      {/* Controlador do react-hook-form para usar react-select com múltiplas escolhas */}
      <Controller
        name={id}
        control={control}
        rules={{ required: "Selecione pelo menos uma área de TI" }}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={areasTI}
            placeholder="Selecione as áreas de interesse..."
            className="react-select-container"
            classNamePrefix="react-select"
            styles={reactSelectStyles}
            onChange={(options) => {
              field.onChange(options?.map((option) => option.value) || []);
            }}
            value={areasTI.filter((option) => 
              Array.isArray(field.value) && field.value.includes(option.value)
            )}
          />
        )}
      />

      {/* Exibe erro de validação, se houver */}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}