import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type CheckboxFieldProps = {
  label: string;
  id: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
};

export function CheckboxField({ label, id, error, registration }: CheckboxFieldProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={id}
          {...registration}
          className="w-4 h-4"
        />
        <label htmlFor={id} className="text-sm">{label}</label>
      </div>
      {error && <p className="text-red-400 text-sm">{error.message}</p>}
    </div>
  );
}