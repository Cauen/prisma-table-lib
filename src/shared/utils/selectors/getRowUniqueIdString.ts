import { DMMF } from "@prisma/generator-helper";
import { getDefaultIdField } from "../../../Model/data/useGetModelItemsQuery/utils/getFieldsQueryString";
import { tryParseJson } from "../object";

export const getRowUniqueIdString = ({
    row,
    model,
  }: {
    model: DMMF.Model;
    row: Record<string, string>;
  }) => {
    const { primaryKey } = model
    const { name, type } = getDefaultIdField(model.fields)
    
    if (!primaryKey) return row?.[name]

    return JSON.stringify(primaryKey.fields.reduce((obj, fieldName) => {
      obj[fieldName] = row?.[fieldName]
      return obj
    }, {} as Record<string, string | number>))
  };