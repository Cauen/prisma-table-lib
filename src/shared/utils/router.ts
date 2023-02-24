import { ConfigType, useSettings } from "../providers/Settings";

export const useGetRouterPath = (defaultRouter?: ConfigType['router']) => {
  // Disabled, bacause its for tests
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = defaultRouter || useSettings().router;
  const navQueryKey = router?.navQueryKey ?? "admin"

  const routerQuery = router?.query[navQueryKey]
  const adminQuery =
    typeof routerQuery === "string"
      ? [routerQuery]
      : routerQuery || [];
  const [...rest] = adminQuery;
  return rest;
};