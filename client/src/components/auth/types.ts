// client/src/components/auth/types.ts
// Props every auth form accepts. Integration passes real values from the API hooks.
export interface FieldError {
  path: string;
  message: string;
}

export interface AuthFormProps<TValues> {
  onSubmit: (values: TValues) => void | Promise<void>;
  isSubmitting?: boolean;
  /** Message shown above the form, e.g. "Incorrect email or password" */
  serverError?: string | null;
  /** Field errors from a 400 response, shown under the matching inputs */
  fieldErrors?: FieldError[];
}
