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

export default function useTranslate() {
  const { data: schemaData } = useGetSchema2();
  const { models, customizations } = schemaData;
  const { language } = useSettings();

  const translateModel = (model: DMMF.Model) => {
    return customizations?.[model.name]?.title || model.name;
  };

  const translateLabel = (label: keyof TranslatableLabels) => {
    if (!language) return label;
    const translations = language(schemaData);
    return translations[label] || label;
  };

  const translateField = ({
    model,
    field,
    decoration = "none",
  }: {
    model: DMMF.Model;
    field: DMMF.Field;
    decoration?: "none" | "create" | "update";
  }) => {

    // return `${relationText}${cameCaseSplit(field.name)} ${
    //   field.isList ? "[]" : ""
    // } ${field.isRequired && !field.isList ? "*" : "(optional)"}`;
    const isNone = decoration === "none"

    const pre = field.relationName && !isNone ? `${translateLabel('Relation')} ` : "";
    const fieldName =
      customizations?.[model.name]?.fields?.[field.name]?.title ||
      cameCaseSplit(field.name);
    const post = (() => {
      if (isNone) return "";
      return ` ${
        field.isList ? "[]" : ""
      } ${field.isRequired && !field.isList ? "*" : "(optional)"}`;
    })();

    return `${pre}${fieldName}${post}`;
  };

  return {
    translateModel,
    translateLabel,
    translateField,
  };
}
