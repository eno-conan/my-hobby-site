import { render, screen, fireEvent } from "@testing-library/react";
import LoadingPart from "./LoadingPart";
// import { vi } from 'vitest'
// import { CircularProgress } from '@mui/material'

// jest.mock('@mui/material', () => ({
//     ...jest.requireActual('@mui/material'),
//     CircularProgress: jest.fn(() => <div>HELLOOOOOO</div>),
// }));

// vi.mock('@mui/material', async () => {
//     const actual = await vi.importActual("@mui/material")
//     return {
//         // ...actual,
//         Container: vi.fn(() => <div>Container</div>),
//         Grid: vi.fn(() => <div>Grid</div>),
//         CircularProgress: vi.fn(() => <div>CircularProgress</div>),
//     }
// });

{/* <body>
  <div>
    <div>
      <div>
        Container
      </div>
    </div>
  </div>
</body> */}

describe("LoadingPart Component Test", () => {
    it("初期表示", () => {
        render(<LoadingPart />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
        // expect(screen.getByText('HELLOOOOOO')).toBeInTheDocument();
        // fireEvent.click(screen.getByText("Orange"));
        // expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    });
});