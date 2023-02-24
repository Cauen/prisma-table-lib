import { DMMF } from "@prisma/generator-helper";
import * as React from "react";
import Read from "../../Read";
import { SlideOver, SlideOverHeader } from "../components/Modal";
import ModalFooter from "../components/Modal/SlideOver/Footer";
import useGetSchema2 from "../data/useGetSchema2";
import { ModalActions, useModal } from "../providers/Modal/store";
import useDeleteRow from "./useDeleteRow";
import useTranslate from "./useTranslate";

type useOpenRowPopupProps = {
  model: DMMF.Model;
  id: string;
  row: any;
  // modalHook: ModalActions
  showDeletePopup: (row: any) => void;
};

export default function useOpenRowPopup() {
  const { addLayer, closeAll, closeOne } = useModal();

  const { data: schemaData } = useGetSchema2();
  const { models, customizations } = schemaData;
  const { translateLabel } = useTranslate()

  const openRow = ({
    model,
    row,
    id,
    showDeletePopup,
  }: useOpenRowPopupProps) => {
    const deletable = customizations?.[model.name]?.actions?.delete !== false;
    const updatable = customizations?.[model.name]?.actions?.update !== false;
    const displayName = customizations?.[model.name]?.title || model.name

    return addLayer({
      Component: (
        <SlideOver
          ModalHeader={
            <SlideOverHeader
              title={`${translateLabel('Read')} ${displayName} ${JSON.stringify({
                id: id,
              })}`}
            />
          }
          ModalFooter={
            <ModalFooter
              actions={[
                ...(deletable
                  ? [
                      {
                        title: translateLabel("Delete"),
                        variant: "white",
                        side: "left",
                        action: () => showDeletePopup(row),
                      } as const,
                    ]
                  : []),
                {
                  title: translateLabel("Close"),
                  action: closeOne,
                  side: "right",
                  variant: "white",
                },
                ...(updatable
                  ? ([
                      {
                        title: translateLabel("Update"),
                        variant: "white",
                        side: "right",
                        href: `/panel/${model.name}/update/${id}`,
                        action: closeAll,
                      },
                    ] as const)
                  : []),
                {
                  title: translateLabel("Open"),
                  variant: "accent",
                  side: "right",
                  href: `/panel/${model.name}/read/${id}`,
                  action: closeAll,
                },
              ]}
            />
          }
        >
          <Read id={id} model={model} />
        </SlideOver>
      ),
    });
  };

  return {
    openRow,
  };
}
