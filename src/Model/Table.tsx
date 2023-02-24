import React, { useRef, useState } from 'react'
import DataTable, { IDataTableProps, SortOrder, TableColumn } from 'react-data-table-component'
import { useSettings } from '../shared/providers/Settings'

interface TableProps extends IDataTableProps<any> {
  actions?: React.ReactNode
  title: React.ReactNode
  columns: TableColumn<any>[]
  data: any[]
  count: number
  filters?: JSX.Element
  expand?: JSX.Element
  loading?: boolean
  page: number
  perPage: number
  setData: (anyValue: any) => void
  onRowClicked?: ((row: any, e: React.MouseEvent<Element, MouseEvent>) => void) | undefined
  onSort?: ((selectedColumn: TableColumn<any>, sortDirection: SortOrder, sortedRows: any[]) => void) | undefined
}
export const Table: React.FC<TableProps> = ({
  actions,
  title,
  columns,
  data,
  count,
  filters,
  expand,
  loading = false,
  page = 1,
  perPage,
  setData,
  onRowClicked,
  onSort,
  ...rest
}) => {
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const settings = useSettings()

  const setDefaultPage = () => {
    setResetPaginationToggle(!resetPaginationToggle)
  }

  return (
    <div>
      <DataTable
        title={title}
        columns={columns}
        data={data}
        progressComponent={<div>Carregando consultas...</div>}
        progressPending={loading}
        pagination
        paginationDefaultPage={page}
        paginationTotalRows={count}
        paginationPerPage={perPage}
        paginationServer
        paginationResetDefaultPage={resetPaginationToggle}
        paginationComponentOptions={settings.table}
        noDataComponent={<div>Nenhum registro disponível</div>}
        expandableRows={!!expand}
        highlightOnHover
        // selectableRows
        subHeaderWrap
        subHeader={!!filters}
        subHeaderComponent={filters}
        actions={actions}
        onChangePage={(pagee, totalRows) => {
          setData((curr: any) => ({ ...curr, page: pagee }))
        }}
        onChangeRowsPerPage={(rowsPerPage, page) => {
          setData((curr: any) => ({ ...curr, rowsPerPage, page }))
        }}
        onSort={onSort}
        sortServer={!!onSort}
        onRowClicked={onRowClicked}
        pointerOnHover={!!onRowClicked}
        {...rest}
      />
    </div>
  )
}

export default Table
