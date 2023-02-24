import { gql, OperationVariables, useQuery } from "@apollo/client";
import { DMMF } from "@prisma/generator-helper";
import { ModelOptions } from "../../../Settings/ModelConfig";
import { useSettings } from "../../../shared/providers/Settings";
import { getFieldsQueryString } from "./utils/getFieldsQueryString";
import { filterModelFieldsFromCustomization } from "./utils/getModelFieldsFromCustomization";
import { getQueryString } from "./utils/getQueryString";

export type ItemsQueryProps = {
    // models: SchemaModel[],
    model: DMMF.Model | undefined;
    models: DMMF.Model[];
    queryType?: "findUnique" | "findMany";
    viewType?: "tableView.read" | "actions.read";
    variables?: OperationVariables | undefined;
    customizations?: Record<string, ModelOptions> | undefined;
    skip?: boolean
    // update = false
}
export const useGetModelItemsQuery = (props: ItemsQueryProps) => {
    const {
        model,
        models,
        queryType = "findMany",
        viewType = "tableView.read",
        customizations,
        variables,
        skip,
    } = props
    const modelName = model?.name || "";
    const showFields = filterModelFieldsFromCustomization(model, viewType, customizations);
    
    const { list } = useSettings()
    const { handleFieldsQueryString, handleQueryCompleted } = list || {}
    const fields = getFieldsQueryString({ model, customizations, models, showFields })
    const handledFields = handleFieldsQueryString ? handleFieldsQueryString({ ...props, fields }) : fields
    const queryString = getQueryString({ fields: handledFields, modelName, queryType })
    const query = gql`${queryString}`
    const queryName = `${queryType}${modelName}`

    const queryResult = useQuery<any>(query, {
        skip: !modelName || skip,
        variables,
        onCompleted: handleQueryCompleted
            ? (data) => {
                handleQueryCompleted({
                    data,
                    queryName,
                    items: data?.[queryName],
                    count: data?.[`count${modelName}`],
                    modelName,
                });
            }
            : undefined
    });

    return { ...queryResult, queryName };
};