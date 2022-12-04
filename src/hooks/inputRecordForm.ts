import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useFieldArray, useForm } from "react-hook-form"

const RefInfo = z.object({
    linkTitle: z.string().max(10),
    linkUrl: z.string().max(10),
})


const schema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    githubRepo: z.string().min(1).or(z.literal('')),
    detail: z.string().min(1),
    reference: z.array(RefInfo)
})

type FormValues = z.infer<typeof schema>
let defaultValues: FormValues = { title: '', description: '', githubRepo: '', detail: '', reference: [] }

const inputRecordForm = () => {
    const { register, handleSubmit, getValues, formState: { errors }, control } = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });
    const { fields, append, remove } = useFieldArray({ control, name: 'reference' });
    return {
        fields,
        append,
        remove,
        register,
        handleSubmit,
        getValues,
        errors
    }
}

export default inputRecordForm
