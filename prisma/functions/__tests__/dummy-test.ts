import { prismaMock } from '../singleton'
import { createDummy } from '../tests_functions/dummy-functions'

test('create new dummy', async () => {
    const dummy = {
        id: 1,
        name: 'Rich',
    }
    prismaMock.dummy.create.mockResolvedValue(dummy)

    await expect(createDummy(dummy)).resolves.toEqual({
        id: 1,
        name: 'Rich',
    });
});