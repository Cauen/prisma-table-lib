import { test, expect } from 'vitest'
import { useGetRouterPath } from './router';

test('router getRouterPath', async () => {
    const case1: any = { query: { admin: "adminPath" } } as any as any
    expect(useGetRouterPath(case1)).toEqual(["adminPath"])

    const case2: any = { query: { admin: ["adminPath", "otherPath"] } } as any as any
    expect(useGetRouterPath(case2)).toEqual(["adminPath", "otherPath"])
});