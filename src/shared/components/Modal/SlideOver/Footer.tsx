import { useSettings } from "../../../providers/Settings";
import * as React from "react";
import useTranslate from "../../../hooks/useTranslate";
import { useModal } from "../../../providers/Modal/store";
import Button from "../../Button";

type Action = {
  side?: "right" | "left";
  title?: string;
  variant?: "white" | "accent" | "red";
  action?: () => void;
  href?: string;
  preset?: "cancel";
};
type ModalFooterProps = {
  actions?: Action[];
  padding?: boolean;
};

const ConditionalLink = ({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) => {
  const { components: { Link } } = useSettings()
  if (!href) return <>{children}</>;
  return <Link href={href}>{children}</Link>;
};

export default function ModalFooter({
  actions: propsActions,
  padding = true,
}: ModalFooterProps) {
  const closeOne = useModal((s) => s.closeOne);
  const { translateLabel } = useTranslate();
  const closeAction: Action = {
    title: translateLabel("Close"),
    action: closeOne,
    side: "right",
    variant: "white",
  };

  const actions = propsActions ?? [closeAction];
  const leftSide = actions.filter((el) => el.side === "left");
  const rightSide = actions.filter((el) => el.side === "right" || !el.side);

  const RenderActions = ({ actions }: { actions: Action[] }) => {
    return (
      <div className="flex gap-4">
        {actions.map((theAction) => {
          const action =
            (theAction.preset === "cancel" && closeAction) || theAction;

          return (
            <ConditionalLink key={action.title} href={action.href}>
              <Button
                type="button"
                color={action.variant}
                onClick={(e) => {
                  if (!action.action) return
                  if (e.ctrlKey) {
                    return undefined
                  }
                  return action.action()
                }}
              >
                {action.title}
              </Button>
            </ConditionalLink>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`flex flex-shrink-0 justify-between ${padding ? "p-4" : ""}`}
    >
      <RenderActions actions={leftSide} />
      <RenderActions actions={rightSide} />
    </div>
  );
}
