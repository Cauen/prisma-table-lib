import { DMMF } from "@prisma/generator-helper";
import { getDefaultIdField } from "../../../Model/data/useGetModelItemsQuery/utils/getFieldsQueryString";
import { tryParseJson } from "../object";

export const getWhereUnique = ({
    idOrObjectString,
    model,
  }: {
    model: DMMF.Model;
    idOrObjectString: string;
  }) => {
    if (model.primaryKey) {
      const parameter = tryParseJson(idOrObjectString);
      if (typeof parameter !== "object" || Array.isArray(parameter))
        throw new Error("Needed object to filter custom primary keys");
      const paramObject: Record<string, any> = parameter
  
      const idFields = model.primaryKey.fields.map((fieldString) => {
        const found = model.fields.find((f) => f.name === fieldString);
        if (!found) throw new Error("PRIMARY KEY DONT EXIST IN MODEL SCHEMA");
        return found;
      });
  
      const compositeContent = idFields.reduce((obj, field) => {
        const value = paramObject[field.name] || paramObject;
        obj[field.name] = value;
        return obj;
      }, {} as Record<string, any>);
  
      const getCompositeName = (fields: string[]) =>
        fields.map((f) => f).join("_");
      const compositeName =
        model.primaryKey.name || getCompositeName(model.primaryKey.fields);
  
      return { [compositeName]: compositeContent };
    }
  
    const paramString = idOrObjectString
    const { name, type } = getDefaultIdField(model.fields)
    const parsedValue = ["Int", "Float", "Decimal", "BigInt"].includes(type) ? Number(paramString) : paramString
  
    return { [name]: parsedValue }
  };