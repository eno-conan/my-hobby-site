export type InputFieldProps = Omit<JSX.IntrinsicElements["input"], "ref"> & {
    errors?: string[]
    inputRef?: React.Ref<HTMLInputElement>
}

export const InputField = (props: InputFieldProps) => {
    const { errors, inputRef, ...others } = props
    return (
        <div>
            <input {...others} ref={inputRef} />
            {errors?.map((x) => (
                <p>
                    <small>{x}</small>
                </p>
            ))}
        </div>
    )
}