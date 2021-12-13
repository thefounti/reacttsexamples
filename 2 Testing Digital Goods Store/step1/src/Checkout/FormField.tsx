import React from "react"

interface FormError {
  message: string
}

interface FormFieldProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  errors?: FormError
  normalize?: (value: string) => string
}

export const FormField = React.forwardRef(
  (
    { label, name, errors, normalize = (value) => value, ...inputProps }: FormFieldProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="nes-field">
        <label id={`${name}-label`} htmlFor={name}>{label}:</label>
        <input
          aria-labelledby={`${name}-label`}
          ref={ref}
          name={name}
          {...inputProps}
          className={`nes-input ${errors && "is-error"}`}
          onChange={(e) => (e.target.value = normalize(e.target.value))}
        />
        {errors && <p className="note nes-text is-error">Error: {errors.message}</p>}
      </div>
    )
  }
)
