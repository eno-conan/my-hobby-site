import { zodResolver } from '@hookform/resolvers/zod'
import { string, z } from 'zod'
import { useForm } from "react-hook-form"


interface IRef {
    linkTitle: string,
    linkUrl: string
}

const RefInfo = z.object({
    linkTitle: z.string().min(1),
    linkUrl: z.string().min(1),
})

const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    detail: z.string().min(3),
    reference: z.array(RefInfo)
})

type FormValues = z.infer<typeof schema>
let defaultValues: FormValues = { title: '', description: '', detail: '', reference: [{ linkTitle: '', linkUrl: '' }] }

const inputRecordForm = () => {
    const { register, handleSubmit, getValues, formState: { errors }, control } = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });
    return {
        register,
        handleSubmit,
        getValues,
        control,
        errors
    }
}

export default inputRecordForm
