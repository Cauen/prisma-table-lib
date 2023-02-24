import { ModelOptions } from "../../../../Settings/ModelConfig"
import { DMMF } from "@prisma/generator-helper"

export const getModelFieldsOrder = (
    fields: DMMF.Model['fields'],
    modelCustomization?: ModelOptions
) => {
    if (!modelCustomization) return fields
    const modelsSorted = fields.sort((a, b) => {
        const aPosition = modelCustomization?.fields?.[a.name]?.position ?? Number.MAX_SAFE_INTEGER
        const bPosition = modelCustomization?.fields?.[b.name]?.position ?? Number.MAX_SAFE_INTEGER
        if (bPosition > aPosition) return -1
        if (bPosition < aPosition) return 1
        return 0
    }) 

    return modelsSorted
}