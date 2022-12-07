import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from "react-hook-form"

const RefInfo = z.object({
    linkTitle: z.string().max(10),
    linkUrl: z.string().max(10),
})
const schema = z.object({
    title: z.string().min(1, '最低1文字は入力してください'),
    description: z.string().min(1, '最低1文字は入力してください'),
    githubRepo: z.string().max(100).or(z.literal('')),
    detail: z.string().min(1, '最低1文字は入力してください').or(z.literal('')),
    reference: z.array(RefInfo)
})

export interface RefForm {
    linkTitle: string
    linkUrl: string
}

export interface RecordForm {
    title: string;
    description: string
    githubRepo: string
    detail: string
    reference: RefForm[]
}

const inputRecordForm = () => {
    const { register, handleSubmit, getValues, setValue, formState: { errors }, control, reset, setFocus } = useForm<RecordForm>({
        mode: 'onSubmit',
        resolver: zodResolver(schema),
        defaultValues: { title: '', description: '', githubRepo: '', detail: '', reference: [] },
    });
    return {
        control,
        register,
        handleSubmit,
        getValues,
        setValue,
        errors,
        reset,
        setFocus
    }
}

export default inputRecordForm
