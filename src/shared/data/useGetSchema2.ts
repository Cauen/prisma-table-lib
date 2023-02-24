import { gql, useQuery } from "@apollo/client";
import { DMMF } from "@prisma/generator-helper";
import { ModelOptions } from "../../Settings/ModelConfig";
import useGetSchemaCustom from "./useGetSchemaCustom";

const queryName = "getSchema2";
const GET_SCHENA_2 = gql`
  query {
    ${queryName}
  }
`;

type QueryType = { [queryName]: string };
type Customizations = Record<string, ModelOptions>
export type Schema = {
  models: DMMF.Model[];
  enums: DMMF.DatamodelEnum[];
  customizations?: Customizations;
};

const defaultSchema: Schema = { enums: [], models: [] };
const useGetSchema2 = () => {
  const schemaCustom = useGetSchemaCustom()

  if (schemaCustom.defined) return schemaCustom

  const { data: requestData, ...rest } = useQuery<QueryType>(GET_SCHENA_2, {
    fetchPolicy: "cache-first",
    // skip: schemaCustom.defined,
  });

  if (schemaCustom.defined) return schemaCustom

  const data: Schema = (() => {
    return requestData
    ? JSON.parse(requestData[queryName])
    : defaultSchema;
  })()

  // if (schemaCustom.loaded) return { data: schemaCustom.data.data, customizations: schemaCustom.customizations }
  return { ...rest, data, customizations: data?.customizations };
};

export default useGetSchema2;
