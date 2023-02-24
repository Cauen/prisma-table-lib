import * as React from "react";
import { DMMF } from "@prisma/generator-helper";
import PrismaModel from "../../../Model";
import { useConnection } from "../useConnection";
import Button from "../../../shared/components/Button";

type LinkCreateProps = {
  field: DMMF.Field;
  model: DMMF.Model;
  type: "create" | "update";
};

export default function LinkCreate({ field, model, type }: LinkCreateProps) {
  const { getRelationModel, getIsConnected, toggleConnectRow } = useConnection({
    model,
    type,
  });

  return (
    <div>
      <PrismaModel
        model={getRelationModel(field)}
        handleColumns={({ columns }) => [
          {
            name: "Actions",
            width: "150px",
            cell: (row: any) => {
              const { isConnected } = getIsConnected(row, field);

              return (
                <Button
                  color={isConnected ? "accent" : "white"}
                  className="w-36"
                  type="button"
                  onClick={() => toggleConnectRow(row, field)}
                >
                  {isConnected ? "Disconnect" : "Connect"}
                </Button>
              );
            },
          },
          ...columns,
        ]}
      />
    </div>
  );
}
