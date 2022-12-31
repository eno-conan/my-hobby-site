import { render, screen, fireEvent } from "@testing-library/react";
import ErrorHandling from "./ErrorHandling";

beforeEach(() => {
    render(<ErrorHandling />);
})

describe("ErrorHandling Component Test", () => {
    it("初期表示", () => {
        expect(screen.getByText("予期せぬエラーが発生しました")).toBeInTheDocument();
        expect(screen.getByText("記録一覧に戻る")).toBeInTheDocument();
    });
    it("記録一覧画面へのリンククリック", () => {
        expect(screen.getByText("予期せぬエラーが発生しました")).toBeInTheDocument();
    });
});