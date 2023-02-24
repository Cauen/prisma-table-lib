import { DMMF } from "@prisma/generator-helper";

export const getCreatableOrUpdatableFields = (fields: DMMF.Field[], type: "create" | "update") => {
    return fields.filter(field => {
        const fieldDefault = field.default
        if (field.isReadOnly) return false
        if (typeof fieldDefault === "object" && !Array.isArray(fieldDefault) && fieldDefault.name) return false
        if (field.isUpdatedAt) return false
        if (type === "update" && field.relationName && field.isList) return false
        return true
    })
}