import { setupServer, SetupServerApi } from 'msw/node';
import { handlers } from './handlers';

export * from 'msw';

export const server: SetupServerApi = setupServer(...handlers);