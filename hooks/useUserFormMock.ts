import { UserForm } from "./useUserForm"

// ⭐
export const useUserForm = (): UserForm => {
    const handleSubmit = (onValid: any) => () => {
        onValid()
        return Promise.resolve()
    }

    return {
        handleSubmit,
        errors: {
            name: undefined,
            email: undefined,
        },
        fieldValues: {
            name: { ...mockFieldValue, name: "name" },
            email: { ...mockFieldValue, name: "email" },
        },
    }
}

const mockFieldValue = {
    name: "mock",
    onChange: () => Promise.resolve(),
    onBlur: () => Promise.resolve(),
    inputRef: () => { },
}