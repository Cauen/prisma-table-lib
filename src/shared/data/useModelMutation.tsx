import { ApolloCache, DefaultContext, gql, MutationHookOptions, OperationVariables, useMutation, useQuery } from "@apollo/client";
import { DMMF } from "@prisma/generator-helper";
import { getDefaultIdField } from "../../Model/data/useGetModelItemsQuery/utils/getFieldsQueryString";
import useHandleError from "../hooks/useHandleError";

const mutationDocument = ({
  modelName,
  fields,
  mutation,
}: {
  modelName: string;
  fields: string;
  mutation: "create" | "update" | "delete";
}) => {
  switch (mutation) {
    case "create":
      return gql`mutation createOne${modelName}($data: ${modelName}CreateInput!) {
    createOne${modelName}(data: $data) {
        ${fields}
    }
  }`;
    case "delete":
      return gql`mutation deleteOne${modelName} ($where: ${modelName}WhereUniqueInput!) {
    deleteOne${modelName} (where: $where) {
        ${fields}
    }
  }`;
    case "update":
      return gql`mutation updateOne${modelName} ($where: ${modelName}WhereUniqueInput!, $data: ${modelName}UpdateInput!) {
    updateOne${modelName} (where: $where, data: $data) {
      ${fields}
    }
  }`;
  }
};

export default function useModelMutation({
  model,
  mutation,
  options,
}: {
  model: DMMF.Model;
  mutation: "create" | "update" | "delete";
  options?: MutationHookOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>,
}) {
  const { handle } =useHandleError()
  //Todo remove any
  return useMutation<any>(
    mutationDocument({
      fields: getDefaultIdField(model.fields).name,
      modelName: model.name,
      mutation,
    }),
    {
      onError: ({ clientErrors, networkError, graphQLErrors, extraInfo, message, name, cause, stack }) => {
        console.log({ clientErrors, networkError, graphQLErrors, extraInfo, message, name, cause, stack })
        handle({ clientErrors, networkError, graphQLErrors })
      },
    },
  );
}
