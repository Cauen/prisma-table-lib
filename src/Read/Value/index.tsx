/* eslint-disable react-hooks/rules-of-hooks */
import { DMMF } from "@prisma/generator-helper";
import * as React from "react";
import PrismaModel from "../../Model";
import { useGetModelItemsQuery } from "../../Model/data/useGetModelItemsQuery";
import { SlideOver } from "../../shared/components/Modal";
import ModalFooter from "../../shared/components/Modal/SlideOver/Footer";
import ModalHeader from "../../shared/components/Modal/SlideOver/Header";
import useGetSchema2 from "../../shared/data/useGetSchema2";
import useDeleteRow from "../../shared/hooks/useDeleteRow";
import useOpenRowPopup from "../../shared/hooks/useOpenRowPopup";
import useTranslate from "../../shared/hooks/useTranslate";
import { useModal } from "../../shared/providers/Modal/store";
import { getRowUniqueIdString } from "../../shared/utils/selectors/getRowUniqueIdString";
import useRenderRelation from "../../shared/hooks/useRenderRelation";
import RelationValue from "./Relation";

type ValueProps = {
  field: DMMF.Field;
  model: DMMF.Model;
  row: any;
  onDelete: () => void;
};

export default function Value({ field, model, row, onDelete }: ValueProps) {
  const { data: schemaData, loading } = useGetSchema2();
  const { models, customizations } = schemaData;
  const { getFieldName } = useRenderRelation();

  const { addLayer, layers } = useModal();

  const isRelation = !!field.relationName;
  const value = row?.[field.name];
  const relationModel = models.find((el) => el.name === field.type);

  const { type } = field;
  // if (!value) return settings.list?.nullValuesUi;
  if (type === "DateTime") {
    return <span>{new Date(value).toLocaleString()}</span>;
  }
  if (typeof value === "string") {
    return (
      <span>{value.length > 50 ? `${value.substring(0, 50)}...` : value}</span>
    );
  }

  if (!relationModel) return <div>{JSON.stringify(value)}</div>;

  return (
    <RelationValue
      field={field}
      model={model}
      onDelete={onDelete}
      relationModel={relationModel}
      row={row}
    />
  );
}
