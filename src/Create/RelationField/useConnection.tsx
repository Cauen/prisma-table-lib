import { DMMF } from "@prisma/generator-helper";
import shallow from "zustand/shallow";
import { getDefaultIdField } from "../../Model/data/useGetModelItemsQuery/utils/getFieldsQueryString";
import useGetSchema2 from "../../shared/data/useGetSchema2";
import { useCreate } from "../store";
import { isObjectEquals } from "./LinkCreate/utils";

type Obj = Record<string, any>;
export type OptionalConnect =
  | {
      connect: Obj[] | Obj;
    }
  | undefined;

export const useConnection = ({
  model,
  type,
}: {
  model: DMMF.Model;
  type: "create" | "update";
}) => {
  const {
    data: { models },
  } = useGetSchema2();
  
  const { setFieldValue } = useCreate(
    (state) => ({
      setFieldValue: (value: any, field: DMMF.Field) =>
        state.setFieldValue({
          fieldName: field.name,
          modelName: model.name,
          type,
          value,
        }),
    }),
    shallow
  );

  const getCurrentFieldStateConnection = (field: DMMF.Field) => {
    const currentFieldState =
    useCreate.getState()[type][model.name]?.[field.name] as OptionalConnect;
    const defaultConnect = field.isList ? [] as Obj[] : undefined
    return { connect: currentFieldState?.connect || defaultConnect }
  }

  const getConnectList = (value?: OptionalConnect): Obj[] => {
    const connect = value?.connect;
    if (!connect) return [];
    return Array.isArray(connect) ? connect : [connect];
  };

  const removeConnection = (connection: Obj, field: DMMF.Field) => {
    if (!field.isList) return setFieldValue(undefined, field);

    const { connect } = getCurrentFieldStateConnection(field)
    const newConnections = (connect || []).filter(
      (el: any) => !isObjectEquals(el, connection)
    );
    setFieldValue({ connect: newConnections }, field);
  };

  // toConnect = { id: 1 } | { compositeId: { ... } } ...
  const addConnection = (toConnect: any, field: DMMF.Field) => {
    if (!field.isList) return setFieldValue({ connect: toConnect }, field);

    const { connect } = getCurrentFieldStateConnection(field)
    const currentConnectArray = connect as Obj[] // is list

    setFieldValue({ connect: [...currentConnectArray, toConnect] }, field)
  }

  const toggleConnectRow = (row: any, field: DMMF.Field) => {
    const { isConnected, toConnect } = getIsConnected(row, field)

    if (isConnected) return removeConnection(toConnect, field)
    return addConnection(toConnect, field)
  }

  const getRelationModel = (field: DMMF.Field) => {
    const relationModel = models.find((el) => el.name === field.type);
    if (!relationModel) throw new Error(`Model not found ${field.type}`);
    return relationModel;
  };

  const getRelationOrDefaultFields = (field: DMMF.Field) => {
    const { relationToFields, isList } = field;
    const relationModel = getRelationModel(field);
    if (!relationToFields) throw new Error(`Model to relation not found`);

    const relationOrDefaultFields = relationToFields.length
      ? relationToFields
      : [getDefaultIdField(relationModel.fields).name];
    return relationOrDefaultFields;
  };

  const getValueToConnect = ({ row, field }: { row: any, field: DMMF.Field }) => {
    if (!row) return {}

    const relationModel = getRelationModel(field);
    const relationOrDefaultFields = getRelationOrDefaultFields(field);

    const toConnect = relationOrDefaultFields.reduce((prev, current) => {
      const fieldType = relationModel.fields.find(
        (el) => el.name === current
      )?.type;
      const isFieldNumber = ["Int", "Decimal", "Float", "BigInt"].includes(
        fieldType || ""
      );
      const parsedValue = isFieldNumber ? Number(row[current]) : row[current];
      prev[current] = parsedValue;
      return prev;
    }, {} as Record<string, string | number>);

    return toConnect as Record<string, string | number>;
  };

  const getIsConnected = (row: any, field: DMMF.Field) => {
    const relationOrDefaultFields = getRelationOrDefaultFields(field);
    const toConnect = getValueToConnect({ row, field });
    
    const { connect } = getCurrentFieldStateConnection(field)
    const isConnected = relationOrDefaultFields.reduce(
      (prevValue, fieldName) => {
        if (
          !Array.isArray(connect) &&
          !isObjectEquals(connect || {}, toConnect)
        )
          return false;
        if (
          Array.isArray(connect) &&
          !connect.find((connection) => isObjectEquals(connection, toConnect))
        )
          return false;
        return prevValue;
      },
      true
    );
    return { isConnected, toConnect };
  };

  return {
    removeConnection,
    getRelationModel,
    getConnectList,
    getValueToConnect,
    getIsConnected,
    addConnection,
    toggleConnectRow,
  };
};
