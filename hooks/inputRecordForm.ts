import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useFieldArray, useForm } from "react-hook-form"

const RefInfo = z.object({
    linkTitle: z.string().max(10),
    linkUrl: z.string().max(10),
})


const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    detail: z.string().min(3),
    reference: z.array(RefInfo)
})

type FormValues = z.infer<typeof schema>
let defaultValues: FormValues = { title: '', description: '', detail: '', reference: [] }

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
