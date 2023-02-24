import { ModelOptions } from "../../../../Settings/ModelConfig";
import { getCreatableOrUpdatableFields } from "../../../../shared/utils/selectors/getCreatableOrUpdatableFields";
import { DMMF } from "@prisma/generator-helper";
import { ConfigType } from "../../../../shared/providers/Settings";

export const filterModelFieldsFromCustomization = (
    model: DMMF.Model | undefined,
    type: "tableView.read" | "tableView.filter" | "tableView.sort" | "actions.read" | "actions.create" | "actions.update",
    customizations?: Record<string, ModelOptions> | undefined,
    settings?: ConfigType,
): DMMF.Field[] => {
    if (!model) return [];
    // return model.fields
    const fieldsByType = (() => {
        if (type === "actions.create") return getCreatableOrUpdatableFields(model.fields, "create");
        if (type === "actions.update") return getCreatableOrUpdatableFields(model.fields, "update");
        if (settings?.list?.globalHideRelationFields && type === "tableView.read") return model.fields.filter(el => !el.isReadOnly)
        if (settings?.read?.globalHideRelationFields && type === "actions.read") return model.fields.filter(el => !el.isReadOnly)
        return model.fields
    })()
    if (!customizations) return fieldsByType;
    const modelCustomization = customizations[model.name];
    if (!modelCustomization) return fieldsByType;
    const { fields, idField, displayFields } = modelCustomization;

    if (!fields) return fieldsByType; // no field excluded
    const excludedFields = Object.entries(fields)
        .filter(([name, options]) => {
            return type === "tableView.read" && options.tableView?.read === false
                || type === "tableView.filter" && options.tableView?.filter === false
                || type === "tableView.sort" && options.tableView?.sort === false
                || type === "tableView.sort" && options.tableView?.sort === false
                || type === "actions.read" && options.actions?.read === false
                || type === "actions.create" && options.actions?.create === false
                || type === "actions.update" && options.actions?.update === false
                || false
        })
        .map(([name]) => name);
        
    const withoutExcluded = fieldsByType.filter((field) => !excludedFields.includes(field.name))
   
    return withoutExcluded;
};