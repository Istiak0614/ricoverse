// client/src/components/auth/useServerFieldErrors.ts
// Puts API validation errors (errorSources) under the right inputs.
import { useEffect } from 'react';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { FieldError } from './types';

export function useServerFieldErrors<T extends FieldValues>(
  fieldErrors: FieldError[] | undefined,
  setError: UseFormSetError<T>,
  knownFields: readonly Path<T>[],
) {
  useEffect(() => {
    fieldErrors?.forEach(({ path, message }) => {
      if ((knownFields as readonly string[]).includes(path)) {
        setError(path as Path<T>, { type: 'server', message });
      }
    });
  }, [fieldErrors, setError, knownFields]);
}
