import { Schema } from "../../../../shared/data/useGetSchema2";
import { DMMF } from "@prisma/generator-helper";

export const getDefaultIdField = (fields: DMMF.Field[]) => {
  if (fields.length) new Error("Received empty list at getDefaultIdField")
  const idField = fields.find(el => el.isId)
  if (idField) return idField
  const uniqueField = fields.find(el => el.isUnique)
  if (uniqueField) return uniqueField
  return fields[0]!
}

export const getCustomizedFieldsToShow = ({ field, models, customizations }: { field: DMMF.Field, models: DMMF.Model[], customizations: Schema['customizations'] }) => {
  const relationModel = models.find((md) => md.name === field.type)
  if (!relationModel) return []
  const { displayFields, idField } = customizations?.[relationModel.name] || {};
  const customizedFieldsToShow = [
    ...(idField ? [idField] : [getDefaultIdField(relationModel.fields).name]),
    ...(displayFields || []),
  ];
  const relationFieldsToGet = relationModel.fields.filter((fd) => customizedFieldsToShow.includes(fd.name));
  return relationFieldsToGet
}

/**
 * Returns the string content to query the model based on the fields to show
 * 
 * When model is "undefined" the query is skiped
 */
export const getFieldsQueryString = ({ models, showFields, model, customizations }: { showFields: DMMF.Field[], model?: DMMF.Model, models: DMMF.Model[], customizations: Schema['customizations'] }) => {
  return showFields.map((field) => {
    if (!field.relationName) return field.name // Retuning scalar by name, like string, int...
    if (field.isList) return "" // dont query lists

    /**
     * QUERYING RELATION TO ONE
     */
    // Relations, get [...displayFields, idField] if customized or [defaultIdField]
    const relationModel = models.find((md) => md.name === field.type)
    if (!relationModel) return ""

    const relationFieldsToGet = getCustomizedFieldsToShow({ field, models, customizations })

    const fieldString = `${field.name} {
            ${relationFieldsToGet.map((fd) => fd.name).join("\n")}
        }`
    return fieldString;
  }).join("\n") ?? "";
}