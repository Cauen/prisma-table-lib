import { FilterIcon, ViewListIcon } from "@heroicons/react/outline";
import { DMMF } from "@prisma/generator-helper";
import * as React from "react";
import { useModal } from "../../shared/providers/Modal/store";
import { tryParseJson } from "../../shared/utils/object";
import { useList, useListFilter, useSetListFilter } from "../store";
import { Tab } from "@headlessui/react";
import { AtSymbolIcon, CodeIcon, LinkIcon } from "@heroicons/react/solid";
import ModalFooter from "../../shared/components/Modal/SlideOver/Footer";
import ModalHeader from "../../shared/components/Modal/SlideOver/Header";
import { SlideOver } from "../../shared/components/Modal";
import { useSettings } from "../../shared/providers/Settings";
import { classNames } from "../../shared/utils/styles";
import SortIcon from "./Icon";
import ModelFields from "../../Settings/ModelFields";

export type SortProps = {
  model: DMMF.Model;
};


export default function Sort({ model }: SortProps) {
  const addLayer = useModal((s) => s.addLayer);
  const { router } = useSettings()

  return (
    <div>
      <SortIcon
        onClick={() => {
          addLayer({
            Component: (
              <SlideOver
                ModalHeader={<ModalHeader title="Define the columns" />}
                ModalFooter={<ModalFooter />}
              >
               <ModelFields model={model} />
              </SlideOver>
            ),
          });
        }}
        className={classNames(
          "w-6 h-6 cursor-pointer hover:opacity-80 text-black",
        )}
      />
    </div>
  );
}
