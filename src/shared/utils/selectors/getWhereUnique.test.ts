import { fakeTestData } from '../../tests/fakeData';
import { getWhereUnique } from './getWhereUnique';
import { test, expect } from 'vitest'

test('getWhereUnique.test', async () => {
    const where = getWhereUnique({
      idOrObjectString: `{"fromId":1,"toId":2}`,
      model: fakeTestData.models.find(el => el.name === "Follow")!,
    })
    expect(where.compositeID).toHaveProperty("toId", 2)
    expect(where.compositeID).toHaveProperty("fromId", 1)

    const where2 = getWhereUnique({
      idOrObjectString: `2`,
      model: fakeTestData.models.find(el => el.name === "Profile")!,
    })
    expect(where2.id).toEqual(2)
});