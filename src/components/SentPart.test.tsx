import { render, screen, fireEvent } from "@testing-library/react";
import SentPart from "./SentPart";
import { vi, test } from 'vitest'

describe("SentPart Component Test", () => {
    test.todo('setFinished SetStateAction should be mock')
    const props = {
        setFinished: vi.fn()
    }
    it("初期表示", () => {
        render(<SentPart setFinished={props.setFinished} />);
        expect(screen.getByText("送信完了しました")).toBeInTheDocument();
    });
});