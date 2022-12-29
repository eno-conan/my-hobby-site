import { render, screen, fireEvent } from "@testing-library/react";
import LoadingPart from "./LoadingPart";
// import { vi } from 'vitest'
// import { CircularProgress } from '@mui/material'

// jest.mock('@mui/material', () => ({
//     ...jest.requireActual('@mui/material'),
//     CircularProgress: jest.fn(() => <div>HELLOOOOOO</div>),
// }));

describe("LoadingPart Component Test", () => {
    it("render and init literal", () => {
        render(<LoadingPart />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
        // expect(screen.getByText('HELLOOOOOO')).toBeInTheDocument();
        // fireEvent.click(screen.getByText("Orange"));
        // expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    });
});