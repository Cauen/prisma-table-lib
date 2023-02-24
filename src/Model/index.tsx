import React, { useEffect, useState } from "react";
import { DMMF } from "@prisma/generator-helper";
import Table from "./Table";
import { useGetModelItemsQuery } from "./data/useGetModelItemsQuery";
import useGetSchema2 from "../shared/data/useGetSchema2";
import { filterModelFieldsFromCustomization } from "./data/useGetModelItemsQuery/utils/getModelFieldsFromCustomization";
import { useSettings, WhereProps } from "../shared/providers/Settings";
import { SortOrder, TableColumn } from "react-data-table-component";
import { useGetRouterPath } from "../shared/utils/router";
import { useModal } from "../shared/providers/Modal/store";
import Create from "../Create";
import Read from "../Read";
import ModalFooter from "../shared/components/Modal/SlideOver/Footer";
import { getRowUniqueIdString } from "../shared/utils/selectors/getRowUniqueIdString";
import useModelMutation from "../shared/hooks/useDeleteRow";
import { getWhereUnique } from "../shared/utils/selectors/getWhereUnique";
import useDeleteRow from "../shared/hooks/useDeleteRow";
import Filter from "./Filter";
import { useList, useListFilter, useSetListFilter } from "./store";
import { deepAssign, tryParseJson } from "../shared/utils/object";
import {
  SlideOver,
  SlideOverFooter,
  SlideOverHeader,
} from "../shared/components/Modal";
import useOpenRowPopup from "../shared/hooks/useOpenRowPopup";
import Button from "../shared/components/Button";
import { getModelFieldsOrder } from "./data/useGetModelItemsQuery/utils/getModelFieldsOrder";
import useTranslate from "../shared/hooks/useTranslate";
import { useModalIndex } from "../shared/components/Modal/Context";
import Sort from "./Sort";
import ModalHeader from "../shared/components/Modal/SlideOver/Header";
import useRenderRelation from "../shared/hooks/useRenderRelation";
import Value from "../Read/Value";

export type SortProps = { field: string; direction: "asc" | "desc" } | undefined

const PrismaModel: React.FC<{
  model: DMMF.Model;
  extraWhere?: WhereProps | undefined;
  initialWhere?: WhereProps | undefined;
  handleColumns?: (props: { columns: TableColumn<any>[] }) => TableColumn<any>[];
}> = ({
  model, handleColumns, initialWhere, extraWhere }) => {
    const [filters, setFilters] = useState({
      page: 1,
      rowsPerPage: 10,
    });
    const { page, rowsPerPage } = filters; // { page: 1, rowsPerPage: 10 }; //
    const skip = (page - 1) * rowsPerPage;
    const settings = useSettings();
    const Link = settings.components.Link

    const { data: schemaData } = useGetSchema2();
    const { models, customizations } = schemaData;

    const [sort, setSort] = useState<SortProps>(undefined);

    useEffect(() => {
      setSort(undefined);
    }, [model]);

    const { set } = useSetListFilter({ model })

    const deleteTemp = useList((s) => s.deleteTemp);
    const { state: listWhere } = useListFilter({ model })
    const isFilterConfigured = !initialWhere ||
      (initialWhere && listWhere)

    useEffect(() => {
      if (initialWhere)
        set(JSON.stringify(initialWhere))
    }, [initialWhere])

    // console.log({ listWhere, listWhere, where, allWhere })

    // useHandleClearModalFilters()
    const { addLayer, layers, closeOne } = useModal();
    const { id, index } = useModalIndex()

    useEffect(function () {
      return function () {
        // Anything in here is fired on component unmount.
        if (index === 0) // latest modal
          deleteTemp()
      }
    }, [])

    console.log({isFilterConfigured })
    const variables = {
      take: rowsPerPage,
      skip,
      where: (() => {
        const defaultHandleWhere = settings.list?.handleWhere
        const defaultHandle: typeof defaultHandleWhere = ({ where, model }) => where
        const handleWhere = defaultHandleWhere || defaultHandle

        const whereToHandle = deepAssign({ ...listWhere, ...extraWhere })
        return handleWhere({ where: whereToHandle, model })
      })(),
      orderBy: (() => {
        const sortProps = settings.list?.handleSort ? settings.list.handleSort({ currentSort: sort, model, schema: schemaData }) : sort
        if (!sortProps) return undefined
        return { [sortProps.field]: sortProps.direction }
      })(),
    }
    console.log({ variables, schemaData })
    const queried = useGetModelItemsQuery({
      model,
      queryType: "findMany",
      variables,
      customizations,
      models,
      skip: !isFilterConfigured,
    });

    const columns = filterModelFieldsFromCustomization(
      model,
      "tableView.read",
      customizations,
      settings,
    );
    const columnsSorted = getModelFieldsOrder(
      columns,
      customizations?.[model.name]
    );

    // const columns = model.fields.filter((el) => !el.relationName);
    const data: any[] = (queried.data as any)?.[queried.queryName] || [];
    const count: number = (queried.data as any)?.[`count${model.name}`] || [];

    const { showDeletePopup } = useDeleteRow({
      model,
      onDelete: queried.refetch,
    });

    const { translateLabel, translateModel, translateField } = useTranslate();
    const { getFieldName } = useRenderRelation()

    const columnsRender: TableColumn<any>[] = [
      ...columnsSorted.map((field) => {
        const column: TableColumn<any> = {
          name: translateField({ model, field }),
          id: field.name,
          sortable: !field.relationName,
          width: customizations?.[model.name]?.fields?.[field.name]?.width,
          cell: (item: any) => {
            return <Value field={field} model={model} row={item} onDelete={queried.refetch} />
          },
        };
        return column;
      }),
    ];

    const columnsRenderHandled = [
      handleColumns,
      settings.list?.handleColumns,
    ].reduce((prev, theFunc) => {
      if (theFunc) return theFunc({ columns: prev, model });
      return prev;
    }, columnsRender);

    const { openRow } = useOpenRowPopup();

    return (
      <div>
        <Table
          title={
            <span className="text-lg pb-4 font-medium">
              {translateModel(model)}
            </span>
          }
          loading={!data.length && queried.loading}
          count={count}
          page={filters.page}
          // TODO GET IDS DYNAMICALLY
          onRowClicked={(row) => {
            const model = models.find((el) => el.name === row.__typename);
            if (!model) return;
            const id = getRowUniqueIdString({ row, model });

            openRow({
              model,
              id,
              row,
              showDeletePopup,
            });
          }}
          onSort={(column, direction) => {
            if (column.name)
              setSort({
                field: `${column.id}`,
                direction: direction === "asc" ? "asc" : "desc",
              });
          }}
          actions={
            // TODO CREATE A INTERNAL ROUTER
            <div className="flex gap-2 items-center">
              {customizations?.[model.name]?.actions?.filter !== false && (
                <Filter model={model} />
              )}
              <Sort model={model} />
              {customizations?.[model.name]?.actions?.create !== false && (
                <Link
                  onClick={(
                    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                  ) => {
                    if (!layers.length) return;

                    e.preventDefault();
                    e.stopPropagation();
                    addLayer({
                      Component: (
                        <SlideOver
                          ModalHeader={
                            <ModalHeader
                              title={translateLabel("create")}
                            // description={`Link ${field.isList ? "A LIST" : "ONE"} ${
                            //   field.name
                            // }(${field.type}) to${" "}`}
                            />
                          }
                        >
                          <Create model={model} />
                        </SlideOver>
                      ),
                    });
                  }}
                  href={`/panel/${model.name}/create`}
                >
                  <Button loading={queried.loading} className="capitalize">
                    {translateLabel("create")}
                  </Button>
                </Link>
              )}
            </div>
          }
          perPage={filters.rowsPerPage}
          setData={setFilters}
          columns={columnsRenderHandled}
          data={data}
          {...(() => {
            if (!settings.table?.dataTableProps) return {};
            return settings.table?.dataTableProps(data);
          })()}
        />
      </div>
    );
  };

export default PrismaModel;
