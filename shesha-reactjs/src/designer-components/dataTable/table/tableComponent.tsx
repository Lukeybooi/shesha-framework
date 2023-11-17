import { TableOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import React, { FC, Fragment, useEffect, useRef } from 'react';
import { useDeepCompareEffect } from 'react-use';
import {
  CollapsibleSidebarContainer,
  DataTable,
  DatatableAdvancedFilter,
  DatatableColumnsSelector,
} from 'components';
import { IToolboxComponent } from 'interfaces';
import {
  useDataTableStore,
  useForm,
  useFormData,
  useGlobalState,
  useSheshaApplication,
} from 'providers';
import { SheshaActionOwners } from 'providers/configurableActionsDispatcher/models';
import { getStyle } from 'providers/form/utils';
import { migrateV0toV1 } from './migrations/migrate-v1';
import { migrateV1toV2 } from './migrations/migrate-v2';
import { ITableComponentProps } from './models';
import TableSettings from './tableComponent-settings';
import { filterVisibility } from './utils';
import { migrateCustomFunctions, migratePropertyName } from 'designer-components/_common-migrations/migrateSettings';
import { IDataColumnsProps } from 'providers/datatableColumnsConfigurator/models';
import { migrateVisibility } from 'designer-components/_common-migrations/migrateVisibility';

const TableComponent: IToolboxComponent<ITableComponentProps> = {
  type: 'datatable',
  name: 'Data Table',
  icon: <TableOutlined />,
  Factory: ({ model }) => {
    const store = useDataTableStore(false);

    return store ? (
      <TableWrapper {...model} />
    ) : (
      <Alert
        className="sha-designer-warning"
        message="Data Table must be used within a Data Table Context"
        type="warning"
      />
    );
  },
  initModel: (model: ITableComponentProps) => {
    return {
      ...model,
      items: [],
    };
  },
  migrator: (m) =>
    m
      .add<ITableComponentProps>(0, (prev) => {
        const items = prev['items'] && Array.isArray(prev['items']) ? prev['items'] : [];
        return {
          ...prev,
          items: items,
          useMultiselect: prev['useMultiselect'] ?? false,
          crud: prev['crud'] ?? false,
          flexibleHeight: prev['flexibleHeight'] ?? false,
        };
      })
      .add<ITableComponentProps>(1, migrateV0toV1)
      .add<ITableComponentProps>(2, migrateV1toV2)
      .add<ITableComponentProps>(3, (prev) => ({
        ...prev,
        canEditInline: 'no',
        inlineEditMode: 'one-by-one',
        inlineSaveMode: 'manual',
        canAddInline: 'no',
        newRowCapturePosition: 'top',
        newRowInsertPosition: 'top',
        canDeleteInline: 'no',
      }))
      .add<ITableComponentProps>(4, (prev) => ({
        ...prev,
        onRowSaveSuccessAction: prev['onRowSaveSuccess'] && typeof (prev['onRowSaveSuccess']) === 'string'
          ? {
            actionOwner: SheshaActionOwners.Common,
            actionName: 'Execute Script',
            actionArguments: {
              expression: prev['onRowSaveSuccess'],
            },
            handleFail: false,
            handleSuccess: false,
          }
          : null
      }))
      .add<ITableComponentProps>(5, (prev) => migratePropertyName(migrateCustomFunctions(prev)))
      .add<ITableComponentProps>(6, (prev) => {
        const columns = (prev.items ?? []).map(c => (c.columnType === 'data' ? { ...c, allowSorting: true } as IDataColumnsProps : c));
        return { ...prev, items: columns };
      })
      .add<ITableComponentProps>(7, (prev) => migrateVisibility(prev))
  ,
  settingsFormFactory: (props) => <TableSettings {...props}/>,
};

const NotConfiguredWarning: FC = () => {
  return <Alert className="sha-designer-warning" message="Table is not configured properly" type="warning" />;
};

export const TableWrapper: FC<ITableComponentProps> = (props) => {
  const { id, items, useMultiselect, tableStyle, containerStyle } = props;

  const { formMode } = useForm();
  const { data: formData } = useFormData();
  const { globalState } = useGlobalState();
  const { anyOfPermissionsGranted } = useSheshaApplication();

  const isDesignMode = formMode === 'designer';

  const {
    getRepository,
    isInProgress: { isFiltering, isSelectingColumns },
    setIsInProgressFlag,
    registerConfigurableColumns,
    tableData,
    selectedRow,
    setMultiSelectedRow,
    requireColumns,
    allowReordering,
  } = useDataTableStore();

  requireColumns(); // our component requires columns loading. it's safe to call on each render

  const repository = getRepository();

  useEffect(() => {
    // register columns
    const permissibleColumns = isDesignMode
      ? items
      : items
          ?.filter(({ permissions }) => anyOfPermissionsGranted(permissions || []))
          .filter(filterVisibility({ data: formData, globalState }));

    registerConfigurableColumns(id, permissibleColumns);
  }, [items, isDesignMode]);

  const renderSidebarContent = () => {
    if (isFiltering) {
      return <DatatableAdvancedFilter />;
    }

    if (isSelectingColumns) {
      return <DatatableColumnsSelector />;
    }

    return <Fragment />;
  };

  const tableDataItems = useRef(tableData);

  useDeepCompareEffect(() => {
    tableDataItems.current = tableData;
  }, [tableData]);

  if (isDesignMode && !repository) return <NotConfiguredWarning />;

  const toggleFieldPropertiesSidebar = () => {
    if (!isSelectingColumns && !isFiltering) setIsInProgressFlag({ isFiltering: true });
    else setIsInProgressFlag({ isFiltering: false, isSelectingColumns: false });
  };


  return (
    <CollapsibleSidebarContainer
      rightSidebarProps={{
        open: isSelectingColumns || isFiltering,
        onOpen: toggleFieldPropertiesSidebar,
        onClose: toggleFieldPropertiesSidebar,
        title: 'Table Columns',
        content: renderSidebarContent,
      }}
      allowFullCollapse
    >
      <DataTable
        onMultiRowSelect={setMultiSelectedRow}
        selectedRowIndex={selectedRow?.index}
        useMultiselect={useMultiselect}
        allowReordering={allowReordering}
        tableStyle={getStyle(tableStyle, formData, globalState)}
        containerStyle={getStyle(containerStyle, formData, globalState)}
        canAddInline={props.canAddInline}
        canAddInlineExpression={props.canAddInlineExpression}
        customCreateUrl={props.customCreateUrl}
        newRowCapturePosition={props.newRowCapturePosition}
        onNewRowInitialize={props.onNewRowInitialize}
        canEditInline={props.canEditInline}
        canEditInlineExpression={props.canEditInlineExpression}
        customUpdateUrl={props.customUpdateUrl}
        canDeleteInline={props.canDeleteInline}
        canDeleteInlineExpression={props.canDeleteInlineExpression}
        customDeleteUrl={props.customDeleteUrl}
        onRowSave={props.onRowSave}
        onRowSaveSuccessAction={props.onRowSaveSuccessAction}
        inlineSaveMode={props.inlineSaveMode}
        inlineEditMode={props.inlineEditMode}
        minHeight={props.minHeight}
        maxHeight={props.maxHeight}
      />
    </CollapsibleSidebarContainer>
  );
};

export default TableComponent;
