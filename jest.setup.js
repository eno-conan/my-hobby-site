import 'whatwg-fetch'; //テスト環境ではfetchがないため、別ライブラリから用意

import { server } from './mocks/server';

beforeAll(() => {
    server.listen(); //モックサーバーの起動
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close(); //モックサーバーの停止
});