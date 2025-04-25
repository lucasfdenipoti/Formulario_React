import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "../schemas/validations";
import { InputField } from "../components/InputField";
import {
  SelectField,
  StateSelectField,
  MultiSelectTI,
} from "../components/SelectField";
import { CheckboxField } from "../components/CheckboxField";
import { useEffect } from "react";

type UserFormProps = {
  onSubmit: (data: FormData) => void;
  initialValues?: Partial<FormData>;
  submitText?: string;
  showTerms?: boolean;
  fieldsToShow?: (keyof FormData)[];
};

export function UserForm({
  onSubmit,
  initialValues = {},
  submitText = "Enviar",
  showTerms = true,
  fieldsToShow,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // Preenche valores iniciais ao editar
  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key as keyof FormData, value);
        }
      });
    }
  }, [initialValues, setValue]);

  const shouldShow = (field: keyof FormData) =>
    !fieldsToShow || fieldsToShow.includes(field);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
      {shouldShow("name") && (
        <InputField
          label="Nome:"
          id="name"
          error={errors.name}
          registration={register("name")}
        />
      )}

      {shouldShow("email") && (
        <InputField
          label="Email:"
          id="email"
          type="email"
          error={errors.email}
          registration={register("email")}
        />
      )}

      {shouldShow("password") && (
        <InputField
          label="Senha:"
          id="password"
          type="password"
          error={errors.password}
          registration={register("password")}
        />
      )}

      {shouldShow("birthDate") && (
        <InputField
          label="Data de Nascimento:"
          id="birthDate"
          type="date"
          max={new Date().toISOString().split("T")[0]}
          error={errors.birthDate}
          registration={register("birthDate")}
        />
      )}

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

      {shouldShow("state") && (
        <StateSelectField
          label="Estado:"
          id="state"
          control={control}
          error={errors.state}
        />
      )}

      {shouldShow("techAreas") && (
        <MultiSelectTI
          label="Áreas de TI de Interesse:"
          id="techAreas"
          control={control}
          error={errors.techAreas}
        />
      )}

      {shouldShow("profileImage") && (
        <div className="col-span">
          <label htmlFor="profileImage" className="block mb-1 text-white">
            Foto de Perfil:
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/jpeg"
            className="w-full px-4 py-2 rounded bg-zinc-800 text-white
              file:mr-4 file:py-2 file:px-4 file:rounded
              file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64Image = reader.result as string;
                    setValue("profileImage", base64Image);
                    trigger("profileImage");
                  };
                  reader.readAsDataURL(file);
              }
            }}
          />
          {errors.profileImage && (
            <span className="text-red-500 text-sm">
              {errors.profileImage.message}
            </span>
          )}
        </div>
      )}

      {showTerms && shouldShow("acceptTerms") && (
        <CheckboxField
          label="Aceito os termos e condições"
          id="acceptTerms"
          error={errors.acceptTerms}
          registration={register("acceptTerms")}
        />
      )}

      <button
        type="submit"
        className="col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
      >
        {submitText}
      </button>
    </form>
  );
}