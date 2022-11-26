import { zodResolver } from "@hookform/resolvers/zod"
import {
  SubmitErrorHandler as SubmitErrorHandlerOriginal,
  SubmitHandler as SubmitHandlerOriginal,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
})
type FormValues = z.infer<typeof schema>
const defaultValues: FormValues = { name: "", email: "" } as const

export type UserForm = ReturnType<typeof useUserForm>
export type SubmitHandler = SubmitHandlerOriginal<FormValues>
export type SubmitErrorHandler = SubmitErrorHandlerOriginal<FormValues>

export const useUserForm = () => {
  const {
    register,
    handleSubmit: handleSubmitOriginal,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = (
    onValid: SubmitHandler,
    onInvalid: SubmitErrorHandler
  ) => handleSubmitOriginal(onValid, onInvalid)

  return {
    handleSubmit,
    errors: {
      name: resolve(errors.name),
      email: resolve(errors.email),
    },
    fieldValues: {
      name: convert(register("name")),
      email: convert(register("email")),
    },
  }
}

// InputField.tsxはrefの代わりにinputRefを定義しているので、ref->inputRefにセットし直します。
function convert({ ref, ...others }: UseFormRegisterReturn) {
  return { inputRef: ref, ...others }
}

function resolve(field?: { message?: string }) {
  return field?.message ? [field?.message] : undefined
}
