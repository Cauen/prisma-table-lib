/* eslint-disable react-hooks/rules-of-hooks */
import { DMMF } from "@prisma/generator-helper";
import * as React from "react";
import PrismaModel from "../../../Model";
import { useGetModelItemsQuery } from "../../../Model/data/useGetModelItemsQuery";
import { SlideOver } from "../../../shared/components/Modal";
import ModalFooter from "../../../shared/components/Modal/SlideOver/Footer";
import ModalHeader from "../../../shared/components/Modal/SlideOver/Header";
import useGetSchema2 from "../../../shared/data/useGetSchema2";
import useDeleteRow from "../../../shared/hooks/useDeleteRow";
import useOpenRowPopup from "../../../shared/hooks/useOpenRowPopup";
import useTranslate from "../../../shared/hooks/useTranslate";
import { useModal } from "../../../shared/providers/Modal/store";
import { getRowUniqueIdString } from "../../../shared/utils/selectors/getRowUniqueIdString";
import useRenderRelation from "../../../shared/hooks/useRenderRelation";
import NRelationModalFooter from "./NRelationModalFooter";

type ValueProps = {
  relationModel: DMMF.Model;
  row: any;
  onDelete: () => void;
  field: DMMF.Field;
  model: DMMF.Model;
};

export default function RelationValue({
  relationModel,
  row,
  onDelete,
  field,
  model,
}: ValueProps) {
  const { data: schemaData, loading } = useGetSchema2();
  const { models, customizations } = schemaData;
  const { getFieldName } = useRenderRelation();
  const value = row?.[field.name]; // Unique relation value, else is -> n relation

  const { addLayer, closeAll } = useModal();

  const uniqueID = getRowUniqueIdString({ row: value, model: relationModel });

  const { showDeletePopup } = useDeleteRow({
    model: relationModel,
    onDelete,
  });
  const { openRow } = useOpenRowPopup();

  const link = `/panel/${relationModel.name}/read/${uniqueID}`;
  const { translateLabel } = useTranslate();

  const classes = "hover:underline text-accent cursor-pointer";

  if (value)
    return (
      <div
        className={classes}
        onClick={() => {
          openRow({
            model: relationModel,
            id: uniqueID,
            row: value,
            showDeletePopup,
          });
        }}
      >
        {/* {JSON.stringify(value)} */}
        {getFieldName({ model, field, value })}
      </div>
    );

  return (
    <div
      className={classes}
      onClick={() => {
        const where = (() => {
          const relationField = relationModel.fields.find(
            (el) => el.relationName === field.relationName
          );
          if (!relationField) return {};
          const { relationFromFields, relationToFields } = relationField;
          // TODO ACCEPT WHERE TO MULTIPLE FIELDS
          const firstRelationFromFields = relationFromFields?.[0];
          const firstrelationToFields = relationToFields?.[0];
          if (!firstRelationFromFields) return {};
          if (!firstrelationToFields) return {};
          const idValue = row?.[firstrelationToFields];
          if (!idValue) return {};
          const where = {
            // TODO PARSE TO NUMBER??
            [firstRelationFromFields]: { equals: Number(idValue) },
          };
          return where;
        })();

        addLayer({
          options: {
            category: "Model",
          },
          Component: (
            <SlideOver
              ModalHeader={
                <ModalHeader
                  // bgColorClass="bg-red-600"
                  theme="accent"
                  title={field.name}
                />
              }
              ModalFooter={
                <NRelationModalFooter relationModel={relationModel} where={where} />
              }
            >
              <PrismaModel initialWhere={where} model={relationModel} />
            </SlideOver>
          ),
        });
      }}
    >
      {translateLabel("See relations")}
    </div>
  );
}
