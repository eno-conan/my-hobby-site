import { render, screen, fireEvent } from "@testing-library/react";
import { vi, test } from 'vitest'
import FieldNamePart from "./FieldNamePart";

describe("FieldNamePart Component Test", () => {
    test.todo('set FieldName to Props')
    const props = {
        fieldName: 'fieldName'
    }
    it("初期表示", () => {
        render(<FieldNamePart fieldName={props.fieldName} />);
        expect(screen.getByText("fieldName")).toBeInTheDocument();
    });
});