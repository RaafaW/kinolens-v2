import React from 'react';
import { FormFieldProps } from '@/types';

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  icon: Icon,
  register,
  errors,
  validation,
}) => {
  const error = errors[name];

  return (
    <label className="block">
      <span className="text-sm text-gray-200">{label}</span>
      <div className="mt-1 relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
          className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:border-red-500 focus:outline-none"
        />
      </div>
      {error && <span className="text-xs text-red-400">{error.message as string}</span>}
    </label>
  );
};