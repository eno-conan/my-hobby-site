import { render, screen, fireEvent } from "@testing-library/react";
import { vi, test } from 'vitest'
import TextPart from "./TextPart";
import { useForm } from 'react-hook-form';
import { renderHook } from '@testing-library/react-hooks';
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from "../hooks/inputRecordForm";

vi.mock('@mui/material', async () => {
    const actual = await vi.importActual("@mui/material")
    return {
        // ...actual,
        Container: vi.fn(() => <div>Container</div>),
        Grid: vi.fn(() => <div>Grid</div>),
        CircularProgress: vi.fn(() => <div>CircularProgress</div>),
    }
});

// const reactHookFormResult = renderHook(() =>
//     useForm({
//         resolver: zodResolver(schema),
//         mode: 'onSubmit',
//     })
// );

describe("TextPart Component Test", () => {
    test.todo('setFinished SetStateAction should be mock')
    // const props = {
    //     register: vi.fn(),
    //     errors: vi.fn(),
    //     label: 'Test',
    // }
    // it("初期表示", () => {
    //     render(<TextPart register={props.register} label={props.label} />);
    //     expect(screen.getByText("送信完了しました")).toBeInTheDocument();
    // });
});