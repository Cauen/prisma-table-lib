import React, { useState } from "react";
import { useGetRouterPath } from "./shared/utils/router";
import Settings from "./Settings";
import PrismaModel from "./Model";
import useGetSchema2 from "./shared/data/useGetSchema2";
import CreateOrUpdate from "./Create";
import {
  ConfigType,
  SettingsProvider,
  useSettings,
  WhereProps,
} from "./shared/providers/Settings";
import Modal from "./shared/providers/Modal";
import Read from "./Read";

const Runner: React.FC = () => {
  const { data: schemaData, loading } = useGetSchema2();
  const { models } = schemaData;
  const routerPath = useGetRouterPath();
  const [path, type, routerId] = routerPath;
  const model = models.find((el) => el.name === path);
  const settings = useSettings();
  const [extraWhere, setExtraWhere] = useState<WhereProps | undefined>(
    undefined
  );

  const handleUi = settings.ui?.handleUi;

  const Ui = () => {
    if (loading) return <div>Loading...</div>;

    if (!model) return <Settings />;
    if (type === "create") return <CreateOrUpdate model={model} />;
    if (type === "read")
      return (
        <div className="bg-white p-4 rounded-lg">
          <Read model={model} />
        </div>
      );
    if (type === "update") return <CreateOrUpdate model={model} />;

    return <PrismaModel extraWhere={extraWhere} model={model} />;
  };

  return handleUi ? (
    handleUi({
      Ui,
      schema: schemaData,
      routerPath,
      model,
      setExtraWhere,
      extraWhere,
    })
  ) : (
    <Ui />
  );
};

export type PrismaTableProps = {
  configs?: ConfigType;
};

const PrismTable = () => {
  return (
    <>
      <Runner />
      <Modal />
    </>
  );
};

export default function PrismaTableWithProvider(props: PrismaTableProps) {
  return <SettingsProvider configs={props.configs}>
    <PrismTable />
  </SettingsProvider>;
}

PrismaTableWithProvider.SettingsProvider = SettingsProvider
PrismaTableWithProvider.Table = PrismTable

// export { SettingsProvider as PrismaTableSettingsProvider, PrismTable };
