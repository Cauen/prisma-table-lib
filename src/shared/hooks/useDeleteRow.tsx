import { FetchResult, useApolloClient } from "@apollo/client";
import { DMMF } from "@prisma/generator-helper";
import * as React from "react";
import CenteredModal from "../components/Modal/Centered";
import ModalFooter from "../components/Modal/SlideOver/Footer";
import ModalHeader from "../components/Modal/SlideOver/Header";
import useModelMutation from "../data/useModelMutation";
import { useModal } from "../providers/Modal/store";
import { getRowUniqueIdString } from "../utils/selectors/getRowUniqueIdString";
import { getWhereUnique } from "../utils/selectors/getWhereUnique";
import useHandleError from "./useHandleError";
import useTranslate from "./useTranslate";

type useDeleteRowProps = {
  model: DMMF.Model;
  onDelete?: (
    deletedData?: FetchResult<any, Record<string, any>, Record<string, any>>
  ) => void;
};

export default function useDeleteRow({ model, onDelete }: useDeleteRowProps) {
  const { addLayer, closeOne } = useModal();
  const rowName =  model.name;
  const client = useApolloClient();
  const { translateLabel, translateModel } = useTranslate()

  const [deletor, mutationResult] = useModelMutation({
    model,
    mutation: "delete",
  });
  const { handle } = useHandleError();

  const confirmDelete = async (row: any) => {
    const id = getRowUniqueIdString({ row, model });
    const deleted = await deletor({
      variables: {
        where: getWhereUnique({
          idOrObjectString: id,
          model,
        }),
      },
    });
    handle(deleted.errors);
    if (onDelete) onDelete(deleted);
    client.reFetchObservableQueries();
    return deleted;
  };

  const showDeletePopup = (row: any) => {
    addLayer({
      Component: (
        <CenteredModal
          Footer={
            <ModalFooter
              padding={false}
              actions={[
                { preset: "cancel" },
                {
                  title: translateLabel("Confirm"),
                  variant: "red",
                  action: async () => {
                    const awaited = await confirmDelete(row);
                    if (!awaited.errors) {
                      closeOne(); // close confirm
                      const layers = useModal.getState().layers;
                      if (layers.length) closeOne(); // close the panel with Read
                    }
                  },
                },
              ]}
            />
          }
          title={`${translateLabel('Are you sure you want to delete this')} ${translateModel(model)}?`}
        >
          {translateLabel('Once deleted, this action cant be undone.')}
        </CenteredModal>
      ),
      options: { type: "centered" },
    });
  };

  return {
    confirmDelete,
    showDeletePopup,
    mutationResult,
  };
}
