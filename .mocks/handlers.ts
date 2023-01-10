import { rest } from "msw";
import type { Source } from "../types";

interface IData {
  id: number,
  userId: number,
  title: string,
  completed: boolean
}

const TestData: Array<IData> = [
  {
    id: 1,
    userId: 1,
    title: 'Something',
    completed: false
  },
];

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/todos", (_, res, ctx) => {
    return res(
      ctx.json(TestData)
    );
  }),
  // rest.get("https://myapi.dev/csr", (_, res, ctx) => {
  //   return res(
  //     ctx.json({
  //       title: "CSR Source",
  //       text:
  //         "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
  //     } as Source)
  //   );
  // }),
];
