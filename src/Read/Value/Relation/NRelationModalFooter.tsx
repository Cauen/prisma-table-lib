import React from "react";
import ModalFooter from "../../../shared/components/Modal/SlideOver/Footer";
import { useModal } from "../../../shared/providers/Modal/store";
import useTranslate from "../../../shared/hooks/useTranslate";
import { DMMF } from "@prisma/generator-helper";
import { useSetListFilter } from "../../../Model/store";

// import { Container } from './styles';

const NRelationModalFooter = ({
  relationModel,
  where,
}: {
  relationModel: DMMF.Model;
  where: any;
}) => {
  const { closeAll } = useModal();
  const { translateLabel } = useTranslate();
  const { set } = useSetListFilter({ model: relationModel });

  return (
    <ModalFooter
      actions={[
        { preset: "cancel" },
        {
          title: translateLabel("Open"),
          variant: "accent",
          side: "right",
          href: `/panel/${relationModel.name}/?filters=${encodeURI(JSON.stringify(where))}`,
          action: () => {
            console.log({ where });
            console.log(encodeURI(JSON.stringify(where)));
            closeAll()
          },
        },
      ]}
    />
  );
};

export default NRelationModalFooter;
