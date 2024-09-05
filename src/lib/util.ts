import { differenceInYears, format } from 'date-fns'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { ZodIssue } from 'zod'

// Function to calculate age based on date of birth
export const calculateAge = (dob: Date) => {
  return differenceInYears(new Date(), dob)
}

export const formatShortDateTime = (date: Date) => {
  return format(date, 'dd MMMM yy h:mm:a')
}

/**
 * Handles form server errors by setting appropriate error messages on form fields.
 *
 * @template TFieldValues - A generic type extending FieldValues, representing the structure of the form data.
 * @param {object} errorResponse - The error response object from the server.
 * @param {string | ZodIssue[]} errorResponse.error - The error information which could be a string or an array of Zod issues.
 * @param {UseFormSetError<TFieldValues>} setError - The setError function from react-hook-form to set field-specific errors.
 */
export const handleFormServerErrors = <TFieldValues extends FieldValues>(
  errorResponse: { error: string | ZodIssue[] }, // Type annotation for the error response parameter
  setError: UseFormSetError<TFieldValues>, // Type annotation for the setError function
) => {
  // Check if error is an array of errors (Zod error array)
  if (Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((e) => {
      // Check if the error path exists and get field name
      if (e.path) {
        const fieldName = e.path.join('.') as Path<TFieldValues> // Convert the path array to a dot-separated string and cast it to Path<TFieldValues>
        setError(fieldName, { message: e.message }) // Use setError to set the error message on the corresponding field
      }
    })
  } else {
    // Handle general server errors by setting a root-level error
    setError('root.serverError', { message: errorResponse.error })
  }
}

export function transformImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return null

  if (!imageUrl.includes('cloudinary')) return imageUrl

  const uploadIndex = imageUrl.indexOf('/upload/') + '/upload/'.length

  const transformation = 'c_fill,w_300,h_300,g_faces/'

  return `${imageUrl.slice(0, uploadIndex)}${transformation}${imageUrl.slice(
    uploadIndex,
  )}`
}
