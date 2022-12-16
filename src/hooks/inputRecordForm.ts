import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from "react-hook-form"

const RefInfo = z.object({
    linkTitle: z.string().max(200),
    linkUrl: z.string().max(200),
})
const schema = z.object({
    title: z.string().min(1, '最低1文字は入力してください').max(100, '最大100文字です'),
    description: z.string().min(1, '最低1文字は入力してください').max(300, '最大300文字です'),
    githubRepo: z.string().max(100).or(z.literal('')),
    detail: z.string().min(1, '最低1文字は入力してください').max(1000, '最大1000文字です').or(z.literal('')),
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
        errors
    }
}

export default inputRecordForm
