import { DMMF } from "@prisma/generator-helper";
import { createContext, useContext } from "react";
import { IDataTableProps, TableColumn } from "react-data-table-component";
import { SortProps } from "../../Model";
import { ItemsQueryProps } from "../../Model/data/useGetModelItemsQuery";
import { Schema } from "../data/useGetSchema2";
import { deepAssign } from "../utils/object";

const translatableLabels = [
  "create",
  "update",
  "Relation",
  "See relations",
  "Read",
  "Add filters",
  "Delete",
  "Close",
  "Update",
  "Open",
  "Send",
  "Set",
  "Connect a",
  "Are you sure you want to delete this",
  "Once deleted, this action cant be undone.",
  "Confirm",
] as const;
export type TranslatableLabels = Partial<
  Record<typeof translatableLabels[number], string>
>;
export type WhereProps = Record<string, any>
export type HandleUiProps = { Ui: () => JSX.Element, schema: Schema, model?: DMMF.Model, routerPath: string[], setExtraWhere: React.Dispatch<React.SetStateAction<WhereProps | undefined>>, extraWhere: WhereProps | undefined }
export type HandleWhereProps = { where: WhereProps, model: DMMF.Model }
export type ConfigType = {
  components: {
    Link: (prps: { href?: string, onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void, children: React.ReactNode; }) => JSX.Element;
  },
  router?: {
    push: (route: string) => Promise<boolean | void>;
    query: Record<string, string | string[] | undefined>;
    navQueryKey?: string; // "admin" by default
  };
  systemVersion?: string; // TODO reset cache
  table?: {
    dataTableProps?: (
      dataList: any[]
    ) => Omit<IDataTableProps<any>, "columns" | "data">;
    rowsPerPageText?: string;
    rangeSeparatorText?: string;
    noRowsPerPage?: boolean;
    selectAllRowsItem?: boolean;
    selectAllRowsItemText?: string;
  };
  list?: {
    nullValuesUi?: string;
    handleColumns?: (handleColumnsProps: { columns: TableColumn<any>[], model: DMMF.Model }) => TableColumn<any>[];
    handleQueryCompleted?: (handleQueryCompletedProps: { data: any, items: any[], count: number, queryName: string, modelName: string }) => void;
    handleSort?: (handleSortProps: { currentSort: SortProps, model: DMMF.Model, schema: Schema }) => SortProps
    handleFieldsQueryString?: (handleFieldsQueryStringProps: ItemsQueryProps & { fields: string }) => string
    handleWhere?: (whereProps: HandleWhereProps) => WhereProps
    // Like userId
    globalHideRelationFields?: boolean
  };
  read?: {
    // Like userId
    globalHideRelationFields?: boolean
  };
  data?: {
    loadSchema?: () => Promise<Schema>
    schema?: Schema
  };
  ui?: {
    handleUi?: (handleUiProps: HandleUiProps) => JSX.Element
    showErrorsOnModal?: boolean;
  };
  language?: (schema: Schema) => TranslatableLabels;
};

const defaultConfig: ConfigType = {
  components: {
    Link: () => <></>,
  },
  // Its used to invalidate storage each update
  systemVersion: "1.0.0",
  table: {
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    noRowsPerPage: false,
    selectAllRowsItem: false,
    selectAllRowsItemText: "All",
  },
  list: {
    // Default: "null", examples: "-", "empty"...
    nullValuesUi: "null",
  },
  ui: {
    showErrorsOnModal: false,
  },
};

const StoreContext = createContext<ConfigType>(defaultConfig);

export const SettingsProvider = ({
  children,
  configs,
}: {
  children: React.ReactNode;
  configs?: ConfigType;
}) => (
  <StoreContext.Provider
    value={deepAssign(defaultConfig, configs || {}) as ConfigType}
  >
    {children}
  </StoreContext.Provider>
);

export function useSettings(): ConfigType & { merged?: true } {
  const context = useContext(StoreContext);

  return context;
}
