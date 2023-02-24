import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import * as React from "react";
import { SlideOver } from "../components/Modal";
import ModalFooter from "../components/Modal/SlideOver/Footer";
import ModalHeader from "../components/Modal/SlideOver/Header";
import { useModal } from "../providers/Modal/store";
import { useSettings } from "../providers/Settings";

export default function useHandleError() {
  const { addLayer } = useModal();
  const settings = useSettings();

  const handle = (err: any) => {
    if (settings.ui?.showErrorsOnModal === false) return;
    if (err) {
      addLayer({
        Component: (
          <SlideOver
            ModalHeader={
              <ModalHeader
                // bgColorClass="bg-red-600"
                theme="red"
                title="Error on request"
              />
            }
            ModalFooter={<ModalFooter actions={[{ preset: "cancel" }]} />}
          >
            <div>
              <pre>{JSON.stringify(err, null, 2)}</pre>
            </div>
          </SlideOver>
        ),
      });
    }
  };

  return { handle };
}
