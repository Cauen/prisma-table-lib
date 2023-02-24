import { DMMF } from "@prisma/generator-helper";
import { filterModelFieldsFromCustomization } from "../../Model/data/useGetModelItemsQuery/utils/getModelFieldsFromCustomization";
import useGetSchema2 from "../../shared/data/useGetSchema2";
import { useCreate } from "../store";

export const useParseStoreDataUpdateMutationData = ({ model }: { model: DMMF.Model }) => {
    const { data: schemaData } = useGetSchema2();
    const { models, customizations } = schemaData;
    
    const parse = () => {
        const columns = filterModelFieldsFromCustomization(
            model,
            `actions.update`,
            customizations
        );
        const updateState = useCreate.getState().update
        const updateStateModel = updateState[model.name]
        const { _touchedFields } = updateState

        if (!updateStateModel) return {}
            const touchedOnly = columns.filter(el => _touchedFields.includes(el.name))

        return touchedOnly.reduce((obj, field) => {
            const updateFieldValue = updateStateModel[field.name]
            if (field.relationName) { // JSON is direct setten
                obj[field.name] = updateFieldValue
            } else if (field.type === "Json") {
                // Trying to parse string to JSON
                const updateFieldValueTryToParseJson = (() => {
                    try {
                        return JSON.parse(updateFieldValue)
                    } catch (err) {
                        return updateFieldValue
                    }
                })()
                obj[field.name] = updateFieldValueTryToParseJson
            } else {
                obj[field.name] = { set: updateFieldValue }
            }
            
            return obj
        }, {} as Record<string, any>)
    }

    return { parse }
}