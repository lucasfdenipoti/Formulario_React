import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "../schemas/validations";
import { InputField } from "../components/InputField";
import {
  SelectField,
  StateSelectField,
  MultiSelectTI,
} from "../components/SelectField";
import { AcademicBackgroundField } from "../components/AcademicField";
import { CheckboxField } from "../components/CheckboxField";
import { useEffect } from "react";

// Tipagem dos props esperados pelo UserForm
type UserFormProps = {
  onSubmit: (data: FormData) => void;          // Função chamada ao enviar o formulário
  initialValues?: Partial<FormData>;           // Valores iniciais (ex: para edição)
  submitText?: string;                         // Texto do botão de envio
  showTerms?: boolean;                         // Se deve mostrar o checkbox de termos
  fieldsToShow?: (keyof FormData)[];           // Campos a serem exibidos dinamicamente
};

// Componente principal do formulário
export function UserForm({
  onSubmit,
  initialValues = {},
  submitText = "Enviar",
  showTerms = true,
  fieldsToShow,
}: UserFormProps) {
  // Configuração do React Hook Form com Zod
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),       // Integra Zod como validador
    defaultValues: initialValues,            // Define valores padrão (edição)
  });

  // Gerencia campos dinâmicos de formação acadêmica
  const { fields, append, remove } = useFieldArray({
    control,
    name: "academicBackground",
  });

  // Preenche campos com valores iniciais se houver (ex: edição)
  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key as keyof FormData, value);
        }
      });
    }
  }, [initialValues, setValue]);

  // Função utilitária para verificar se o campo deve ser exibido
  const shouldShow = (field: keyof FormData) =>
    !fieldsToShow || fieldsToShow.includes(field);

  // Converte imagem para base64 e define no formulário
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await toBase64(file);       // Converte a imagem
      setValue("profileImage", base64);          // Define no estado do form
      trigger("profileImage");                   // Valida o campo
    }
  };

  // Utilitário para converter um arquivo para base64
  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  // Renderização do formulário
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
      
      {/* Campo: Nome */}
      {shouldShow("name") && (
        <InputField
          label="Nome:"
          id="name"
          error={errors.name}
          registration={register("name")}
        />
      )}

      {/* Campo: Email */}
      {shouldShow("email") && (
        <InputField
          label="Email:"
          id="email"
          type="email"
          error={errors.email}
          registration={register("email")}
        />
      )}

      {/* Campo: Senha */}
      {shouldShow("password") && (
        <InputField
          label="Senha:"
          id="password"
          type="password"
          error={errors.password}
          registration={register("password")}
        />
      )}

      {/* Campo: Data de Nascimento */}
      {shouldShow("birthDate") && (
        <InputField
          label="Data de Nascimento:"
          id="birthDate"
          type="date"
          max={new Date().toISOString().split("T")[0]} // Impede datas futuras
          error={errors.birthDate}
          registration={register("birthDate")}
        />
      )}

      {/* Campo: Gênero (Select) */}
      {shouldShow("gender") && (
        <SelectField
          label="Gênero:"
          id="gender"
          control={control}
          error={errors.gender}
          options={[
            { value: "Masculino", label: "Masculino" },
            { value: "Feminino", label: "Feminino" },
            { value: "Outro", label: "Outro" },
          ]}
        />
      )}

      {/* Campo: Estado (Select customizado) */}
      {shouldShow("state") && (
        <StateSelectField
          label="Estado:"
          id="state"
          control={control}
          error={errors.state}
        />
      )}

      {/* Campo: Áreas de Interesse em TI (MultiSelect) */}
      {shouldShow("techAreas") && (
        <MultiSelectTI
          label="Áreas de TI de Interesse:"
          id="techAreas"
          control={control}
          error={errors.techAreas}
        />
      )}

      {/* Campo: Upload de Foto */}
      {shouldShow("profileImage") && (
        <div className="col-span-1">
          <label htmlFor="profileImage" className="block mb-1 text-white">
            Foto de Perfil:
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="w-full px-4 py-2 rounded bg-zinc-800 text-white
              file:mr-4 file:py-2 file:px-4 file:rounded
              file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            onChange={handleImageChange}
            aria-describedby={
              errors.profileImage ? "profileImage-error" : undefined
            }
          />
          {errors.profileImage && (
            <span id="profileImage-error" className="text-red-500 text-sm">
              {errors.profileImage.message}
            </span>
          )}
        </div>
      )}

      {/* Campo: Formação Acadêmica (múltiplas entradas) */}
      {shouldShow("academicBackground") && (
        <AcademicBackgroundField
          label="Formação Acadêmica"
          id="academicBackground"
          control={control}
          error={errors.academicBackground}
        />
      )}

      {/* Campo: Aceite dos termos (se showTerms for true) */}
      {showTerms && shouldShow("acceptTerms") && (
        <div className="col-span-2">
          <CheckboxField
            label="Aceito os termos e condições"
            id="acceptTerms"
            error={errors.acceptTerms}
            registration={register("acceptTerms")}
          />
        </div>
      )}

      {/* Botão de envio */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : submitText}
      </button>
    </form>
  );
}