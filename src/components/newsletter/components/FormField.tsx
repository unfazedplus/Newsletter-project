import React, { memo } from 'react';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export const FormField = memo(function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {type === 'textarea' ? (
        <textarea
          className="form-textarea"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          className="form-input"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
});