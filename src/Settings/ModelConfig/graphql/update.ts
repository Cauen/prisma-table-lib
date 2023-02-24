import { gql, useMutation } from "@apollo/client";
import { ModelOptions } from "..";

export const updatePrismaTableModel = gql`
mutation updatePrismaTableModel($config: String!) {
    updatePrismaTableModel(config: $config)
}
`

export const useUpdatePrismaTable = () => {
  return useMutation<{ updatePrismaTableModel: string }, { config: string }>(updatePrismaTableModel)

  // type ArgType = Parameters<typeof mutation>
  // const changedMutation = (options: ArgType[0]) => mutation({
  //   ...options,
  //   variables: options?.variables ? JSON.stringify(options.variables) : undefined
  // })

  // return [changedMutation, data]
}