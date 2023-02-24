import { fakeTestData } from "../../shared/tests/fakeData";
import { test, expect } from 'vitest'

test('Test', async () => {
    const model = fakeTestData.models.find(el => el.name === "CommonUser")

    expect(1).toBe(1)
});