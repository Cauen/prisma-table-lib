import { DMMF } from "@prisma/generator-helper";
import { filterModelFieldsFromCustomization } from "../../Model/data/useGetModelItemsQuery/utils/getModelFieldsFromCustomization";
import useGetSchema2 from "../../shared/data/useGetSchema2";
import { useConnection } from "../RelationField/useConnection";

export const useParseRowDataStoreData = ({ model }: { model: DMMF.Model }) => {
    const { data: schemaData } = useGetSchema2();
    const { models, customizations } = schemaData;
    const columns = filterModelFieldsFromCustomization(
        model,
        `actions.update`,
        customizations
    );
    const { getValueToConnect } = useConnection({ model, type: "update" })

    const parse = ({ row }: { row: any }) => {
        const parsed = columns.reduce((obj, column) => {
            const { relationName, name } = column
            const columnValue = row[name]
            if (relationName) {
                // todo make dynamic
                const field = model.fields.find(el => el.name === name)
                if (!field) throw new Error("Field to relation not found")
                const connect = getValueToConnect({ row: row[name], field })
                obj[name] = { connect }
            } else {
                obj[name] = columnValue
            }

            return obj
        }, {} as Record<string, any>)

        return parsed
    }

    return {
        parse
    }
}