import { DMMF } from "@prisma/generator-helper";
import * as React from "react";
import Read from "../../Read";
import { cameCaseSplit } from "../../Read/utils/string";
import { SlideOver, SlideOverHeader } from "../components/Modal";
import ModalFooter from "../components/Modal/SlideOver/Footer";
import useGetSchema2 from "../data/useGetSchema2";
import { ModalActions, useModal } from "../providers/Modal/store";
import { TranslatableLabels, useSettings } from "../providers/Settings";
import useDeleteRow from "./useDeleteRow";
import { getCustomizedFieldsToShow } from "../../Model/data/useGetModelItemsQuery/utils/getFieldsQueryString";

export default function useRenderRelation() {
  const { data: schemaData } = useGetSchema2();
  const { models, customizations } = schemaData;

  const getFieldName = ({
    model,
    field,
    value,
  }: {
    model: DMMF.Model;
    field: DMMF.Field;
    value: any;
  }) => {
    const customizedFields = getCustomizedFieldsToShow({ field, models, customizations })
    const [id, ...fieldsToShow] = customizedFields
    // const displayFields = customizations?.[field.type]?.displayFields
    if (!fieldsToShow.length) return JSON.stringify(value)
    return fieldsToShow.map(el => {
      if (Array.isArray(value)) return value.map(valueItem => valueItem[el.name]).join(" ")
      return value[el.name]
    }).join(" ")
  }

  return {
    getFieldName,
  };
}
