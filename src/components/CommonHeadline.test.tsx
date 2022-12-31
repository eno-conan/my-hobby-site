import { render, screen, fireEvent } from "@testing-library/react";
import { vi, test } from 'vitest'
import CommonHeadline from "./CommonHeadline";

describe("CommonHeadline Component Test", () => {
    test.todo('set headLineName to Props')
    const props = {
        headLineName: 'headLineName'
    }
    it("初期表示", () => {
        render(<CommonHeadline headLine={props.headLineName} />);
        expect(screen.getByText("headLineName")).toBeInTheDocument();
    });
});