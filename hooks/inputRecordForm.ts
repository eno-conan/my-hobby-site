import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from "react-hook-form"

const schema = z.object({
    title: z.string().min(5),
    description: z.string().max(3),
    detail: z.string().min(3)
})

type FormValues = z.infer<typeof schema>
const defaultValues: FormValues = { title: '', description: '', detail: '' } as const

const inputRecordForm = () => {
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

export default inputRecordForm
