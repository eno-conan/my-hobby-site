import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useFieldArray, useForm } from "react-hook-form"

const RefInfo = z.object({
    linkTitle: z.string().max(10),
    linkUrl: z.string().max(10),
})


const schema = z.object({
    title: z.string().min(1, '最低1文字は入力してください'),
    description: z.string().min(1, '最低1文字は入力してください'),
    githubRepo: z.string().max(100).or(z.literal('')),
    detail: z.string().min(1, '最低1文字は入力してください'),
    reference: z.array(RefInfo)
})

type FormValues = z.infer<typeof schema>
export let defaultValues: FormValues = { title: '', description: '', githubRepo: '', detail: '', reference: [] }

const inputRecordForm = () => {
    const { register, handleSubmit, getValues, setValue, formState: { errors }, control, reset, setFocus } = useForm({
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
        setValue,
        getValues,
        errors,
        reset,
        setFocus
    }
}

export default inputRecordForm
