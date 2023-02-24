import * as React from "react";
import { ModalProvider } from "../../components/Modal/Context";
import { useModal } from "./store";

type ModalProps = {};

export default function Modals(props: ModalProps) {
  const { addLayer, layers } = useModal();

  return (
    <div>
      {/* Key = el.id cause render errors */}
      {[...layers].reverse().map((el, index) => {
        return <ModalProvider id={el.id} key={index} index={index}>{el.Component}</ModalProvider>;

        // if (el.options?.type === "centered")
        //   return (
        //     <CenteredModal index={index} key={index}>
        //       {el.Component}
        //     </CenteredModal>
        //   );

        // return (
        //   <SlideOver
        //     ModalHeader={el.Header}
        //     ModalFooter={el.Footer}
        //     key={index}
        //     index={index}
        //   >
        //     {el.Component}
        //   </SlideOver>
        // );
      })}
    </div>
  );
}
