import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from "react-hook-form"

const schema = z.object({
    title: z.string().min(5),
    url: z.string().max(3),
})

type FormValues = z.infer<typeof schema>
const defaultValues: FormValues = { title: '', url: '' } as const

const inputReferenceForm = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });
    return {
        register,
        handleSubmit,
        getValues,
        errors
    }
}

export default inputReferenceForm
