import { LoadingOutlined } from '@ant-design/icons';
import { ModalProps } from 'antd/lib/modal';
import React, { CSSProperties, FC, Fragment, MutableRefObject, useEffect, useMemo } from 'react';
import { Column, SortingRule, TableProps } from 'react-table';
import { usePrevious } from 'react-use';
import { ValidationErrors } from '..';
import {
  FormMode,
  IFlatComponentsStructure,
  ROOT_COMPONENT_KEY,
  useConfigurableActionDispatcher,
  useDataTableStore,
  useForm,
  useGlobalState,
  useMetadata,
  useSheshaApplication,
} from '../../providers';
import { DataTableFullInstance } from '../../providers/dataTable/contexts';
import { removeUndefinedProperties } from '../../utils/array';
import { camelcaseDotNotation, toCamelCase } from '../../utils/string';
import ReactTable from '../reactTable';
import { IReactTableProps, OnRowsRendering, RowDataInitializer, RowRenderer } from '../reactTable/interfaces';
import { getCellRenderer } from './cell';
import { BackendRepositoryType, ICreateOptions, IDeleteOptions, IUpdateOptions } from 'providers/dataTable/repository/backendRepository';
import { isDataColumn, ITableDataColumn } from 'providers/dataTable/interfaces';
import { IColumnEditorProps, IFieldComponentProps, standardCellComponentTypes } from 'providers/datatableColumnsConfigurator/models';
import { useFormDesignerComponents } from 'providers/form/hooks';
import { executeScriptSync } from 'providers/form/utils';
import moment from 'moment';
import { axiosHttp } from 'utils/fetchers';
import { IAnyObject } from 'interfaces';
import { DataTableColumn, IShaDataTableProps, OnSaveHandler, OnSaveSuccessHandler, YesNoInherit } from './interfaces';
import { ValueRenderer } from '../valueRenderer/index';
import { isEqual } from "lodash";
import { Collapse, Typography } from 'antd';

export interface IIndexTableOptions {
  omitClick?: boolean;
}

export interface IIndexTableProps extends IShaDataTableProps, TableProps {
  tableRef?: MutableRefObject<Partial<DataTableFullInstance> | null>;
  options?: IIndexTableOptions;
  containerStyle?: CSSProperties;
  tableStyle?: CSSProperties;
  minHeight?: number;
  maxHeight?: number;
}

export interface IExtendedModalProps extends ModalProps {
  content?: string;
}

export const DataTable: FC<Partial<IIndexTableProps>> = ({
  useMultiselect: useMultiSelect,
  selectedRowIndex,
  onSelectRow,
  onDblClick,
  onMultiRowSelect,
  tableRef,
  onRowsChanged,
  onExportSuccess,
  onExportError,
  onFetchDataSuccess,
  onSelectedIdsChanged,
  onRowsReordered,
  allowRowDragAndDrop,
  options,
  containerStyle,
  tableStyle,
  customCreateUrl,
  customUpdateUrl,
  customDeleteUrl,
  onRowSave,
  onRowSaveSuccessAction: onRowSaveSuccess,
  ...props
}) => {
  const store = useDataTableStore();
  const { formMode, formData, setFormData } = useForm(false) ?? { formMode: 'readonly', formData: {} };
  const { globalState, setState: setGlobalState } = useGlobalState();

  if (tableRef) tableRef.current = store;

  const {
    tableData,
    isFetchingTableData,
    totalPages,
    columns,
    groupingColumns,
    pageSizeOptions,
    currentPage,
    selectedPageSize,
    tableFilter,
    onSelectRow: onSelectRowDeprecated,
    onDblClick: onDblClickDeprecated,
    selectedRow,
    selectedIds,
    standardSorting,
    quickSearch,
    onSort,
    changeSelectedIds,
    setRowData,
    setSelectedRow,
    succeeded: { exportToExcel: exportToExcelSuccess },
    error: { exportToExcel: exportToExcelError },
    grouping,
    sortMode,
  } = store;

  const onSelectRowLocal = (index: number, row: any) => {
    if (onSelectRow) {
      onSelectRow(index, row);
    }

    if (setSelectedRow) {
      const rowId = row?.id;
      const currentId = store.selectedRow?.id;
      if (rowId !== currentId)
        setSelectedRow(index, row);
      else
        setSelectedRow(null, null);
    }
  };

  const previousIds = usePrevious(selectedIds);

  useEffect(() => {
    if (!(previousIds?.length === 0 && selectedIds?.length === 0) && typeof onSelectedIdsChanged === 'function') {
      onSelectedIdsChanged(selectedIds);
    }
  }, [selectedIds]);

  useEffect(() => {
    if (!isFetchingTableData && tableData?.length && onFetchDataSuccess) {
      onFetchDataSuccess();
    }
  }, [isFetchingTableData]);

  useEffect(() => {
    if (exportToExcelSuccess && onExportSuccess) {
      onExportSuccess();
    }
  }, [exportToExcelSuccess]);

  useEffect(() => {
    if (exportToExcelError && onExportError) {
      onExportError();
    }
  }, [exportToExcelError]);

  const handleSelectRow = onSelectRow || onSelectRowDeprecated;

  const dblClickHandler = onDblClick || onDblClickDeprecated;

  useEffect(() => {
    if (Boolean(handleSelectRow)) handleSelectRow(null, null);
  }, [
    tableData,
    isFetchingTableData,
    totalPages,
    columns,
    pageSizeOptions,
    currentPage,
    selectedPageSize,
    tableFilter,
    selectedRow,
    quickSearch,
    standardSorting,
  ]);

  useEffect(() => {
    if (onRowsChanged) {
      onRowsChanged(tableData);
    }
  }, [tableData]);

  const metadata = useMetadata(false)?.metadata;
  //const propertyMetadataAccessor = useNestedPropertyMetadatAccessor(isEntityMetadata(metadata) ? metadata.entityType : null);

  const { backendUrl } = useSheshaApplication();

  const toolboxComponents = useFormDesignerComponents();

  const onNewRowInitializeExecuter = useMemo<Function>(() => {
    return props.onNewRowInitialize
      ? new Function('formData, globalState, http, moment', props.onNewRowInitialize)
      : null;
  }, [props.onNewRowInitialize]);

  const onNewRowInitialize = useMemo<RowDataInitializer>(() => {
    const result: RowDataInitializer = props.onNewRowInitialize
      ? () => {
        // todo: replace formData and globalState with accessors (e.g. refs) and remove hooks to prevent unneeded re-rendering
        //return onNewRowInitializeExecuter(formData, globalState);
        const result = onNewRowInitializeExecuter(formData ?? {}, globalState, axiosHttp(backendUrl), moment);
        return Promise.resolve(result);
      }
      : () => {
        return Promise.resolve({});
      };

    return result;
  }, [onNewRowInitializeExecuter, formData, globalState]);

  const evaluateYesNoInheritJs = (
    value: YesNoInherit,
    jsExpression: string,
    formMode: FormMode,
    formData: any,
    globalState: IAnyObject
  ): boolean => {
    switch (value) {
      case 'yes':
        return true;
      case 'no':
        return false;
      case 'inherit':
        return formMode === 'edit';
      case 'js': {
        return (
          jsExpression &&
          executeScriptSync<boolean>(jsExpression, {
            formData: formData,
            globalState: globalState,
            moment: moment,
          })
        );
      }
    }
    return false;
  };

  const crudOptions = useMemo(() => {
    const result = {
      canDelete: evaluateYesNoInheritJs(
        props.canDeleteInline,
        props.canDeleteInlineExpression,
        formMode,
        formData,
        globalState
      ),
      canEdit: evaluateYesNoInheritJs(
        props.canEditInline,
        props.canEditInlineExpression,
        formMode,
        formData,
        globalState
      ),
      canAdd: evaluateYesNoInheritJs(props.canAddInline, props.canAddInlineExpression, formMode, formData, globalState),
      onNewRowInitialize,
    };
    return {
      ...result,
      enabled: result.canAdd || result.canDelete || result.canEdit,
    };
  }, [props.canDeleteInline, props.canEditInline, props.canAddInline, formMode, formData, globalState]);

  const preparedColumns = useMemo(() => {
    const localPreparedColumns = columns
      .filter((column) => {
        return column.show && !(column.columnType === 'crud-operations' && !crudOptions.enabled);
      })
      .map<DataTableColumn>((columnItem) => {
        const strictWidth =
          columnItem.minWidth && columnItem.maxWidth && columnItem.minWidth === columnItem.maxWidth
            ? columnItem.minWidth
            : undefined;

        const cellRenderer = getCellRenderer(columnItem, metadata);

        const column: DataTableColumn = {
          ...columnItem,
          accessor: camelcaseDotNotation(columnItem.accessor),
          Header: columnItem.header,
          minWidth: Boolean(columnItem.minWidth) ? columnItem.minWidth : undefined,
          maxWidth: Boolean(columnItem.maxWidth) ? columnItem.maxWidth : undefined,
          width: strictWidth,
          resizable: !strictWidth,
          disableSortBy: !columnItem.isSortable || sortMode === 'strict',
          disableResizing: Boolean(strictWidth),
          Cell: cellRenderer,
          originalConfig: columnItem,
        };
        return removeUndefinedProperties(column) as DataTableColumn;
      });

    return localPreparedColumns;
  }, [columns, crudOptions.enabled, sortMode]);

  // sort
  const defaultSorting = sortMode === 'standard'
    ? standardSorting
      ? standardSorting.map<SortingRule<string>>((c) => ({ id: c.id, desc: c.desc }))
      : columns
        .filter((c) => c.defaultSorting !== null)
        .map<SortingRule<string>>((c) => ({ id: c.id, desc: c.defaultSorting === 1 }))
    : undefined;

  // http, moment, setFormData
  const performOnRowSave = useMemo<OnSaveHandler>(() => {
    if (!onRowSave) return (data) => Promise.resolve(data);

    const executer = new Function('data, formData, globalState, http, moment', onRowSave);
    return (data, formData, globalState) => {
      const preparedData = executer(data, formData, globalState, axiosHttp(backendUrl), moment);
      return Promise.resolve(preparedData);
    };
  }, [onRowSave, backendUrl]);

  const { executeAction } = useConfigurableActionDispatcher();
  const performOnRowSaveSuccess = useMemo<OnSaveSuccessHandler>(() => {
    if (!onRowSaveSuccess)
      return () => {
        /*nop*/
      };

    return (data, formData, globalState, setGlobalState, setFormData) => {
      const evaluationContext = {
        data,
        formData,
        globalState,
        setGlobalState,
        setFormData,
        http: axiosHttp(backendUrl),
        moment,
      };
      // execute the action
      executeAction({
        actionConfiguration: onRowSaveSuccess,
        argumentsEvaluationContext: evaluationContext,
      });
    };
  }, [onRowSaveSuccess, backendUrl]);

  const updater = (rowIndex: number, rowData: any): Promise<any> => {
    const repository = store.getRepository();
    if (!repository) return Promise.reject('Repository is not specified');

    return performOnRowSave(rowData, formData ?? {}, globalState).then((preparedData) => {
      const options =
        repository.repositoryType === BackendRepositoryType
          ? ({ customUrl: customUpdateUrl } as IUpdateOptions)
          : undefined;

      return repository.performUpdate(rowIndex, preparedData, options).then((response) => {
        setRowData(rowIndex, preparedData/*, response*/);
        performOnRowSaveSuccess(preparedData, formData ?? {}, globalState, setGlobalState, setFormData);
        return response;
      });
    });
  };

  const creater = (rowData: any): Promise<any> => {
    const repository = store.getRepository();
    if (!repository) return Promise.reject('Repository is not specified');

    return performOnRowSave(rowData, formData ?? {}, globalState).then((preparedData) => {
      const options =
        repository.repositoryType === BackendRepositoryType
          ? ({ customUrl: customCreateUrl } as ICreateOptions)
          : undefined;

      return repository.performCreate(0, preparedData, options).then(() => {
        store.refreshTable();
        performOnRowSaveSuccess(preparedData, formData ?? {}, globalState, setGlobalState, setFormData);
      });
    });
  };

  const deleter = (rowIndex: number, rowData: any): Promise<any> => {
    const repository = store.getRepository();
    if (!repository) return Promise.reject('Repository is not specified');

    const options =
      repository.repositoryType === BackendRepositoryType
        ? ({ customUrl: customDeleteUrl } as IDeleteOptions)
        : undefined;

    return repository.performDelete(rowIndex, rowData, options).then(() => {
      store.refreshTable();
    });
  };

  const getCrudComponents = (
    allowEdit: boolean,
    componentAccessor: (col: ITableDataColumn) => IFieldComponentProps
  ): IFlatComponentsStructure => {
    const result: IFlatComponentsStructure = {
      allComponents: {},
      componentRelations: {},
    };
    // don't calculate components settings when it's not required
    if (!allowEdit) return result;

    const componentIds: string[] = [];
    columns?.forEach((col) => {
      if (col.columnType === 'data') {
        const dataCol = col as ITableDataColumn;
        const customComponent = componentAccessor(dataCol);
        const componentType = customComponent?.type ?? standardCellComponentTypes.notEditable;
        if (
          componentType &&
          componentType !== standardCellComponentTypes.notEditable &&
          componentType !== standardCellComponentTypes.defaultDisplay
        ) {
          // component found
          const component = toolboxComponents[customComponent.type];
          if (!component) {
            console.error(`Datatable: component '${customComponent.type}' not found - skipped`);
            return;
          }

          const propertyMeta = metadata?.properties?.find(({ path }) => toCamelCase(path) === dataCol.id);

          let model: IColumnEditorProps = {
            ...customComponent.settings,
            id: dataCol.columnId,
            type: customComponent.type,
            propertyName: dataCol.propertyName,
            label: null,
            hideLabel: true,
          };

          if (component.linkToModelMetadata && propertyMeta) {
            model = component.linkToModelMetadata(model, propertyMeta);
          }

          // ToDo: AS - use hidden and disable in JS mode
          //model.visibilityFunc = getCustomVisibilityFunc(model);
          //model.enabledFunc = getCustomEnabledFunc(model);

          result.allComponents[model.id] = model;
          componentIds.push(model.id);
        }
      }
    });
    result.componentRelations[ROOT_COMPONENT_KEY] = componentIds;

    return result;
  };

  const inlineEditorComponents = useMemo<IFlatComponentsStructure>(() => {
    return getCrudComponents(crudOptions.canEdit, (col) => col.editComponent);
  }, [columns, metadata, crudOptions.canEdit]);

  const inlineCreatorComponents = useMemo<IFlatComponentsStructure>(() => {
    return getCrudComponents(crudOptions.canAdd, (col) => col.createComponent);
  }, [columns, metadata, crudOptions.canAdd]);

  const inlineDisplayComponents = useMemo<IFlatComponentsStructure>(() => {
    const result = getCrudComponents(true, (col) => col.displayComponent);
    return result;
  }, [columns, metadata]);

  type Row = any;
  type RowOrGroup = Row | RowsGroup;
  interface RowsGroup {
    value: any;
    index: number;
    $childs: RowOrGroup[];
  }
  interface GroupLevelInfo {
    propertyName: string;
    index: number;
    currentGroup?: RowsGroup;
    propertyPath: string[];
  }
  type GroupLevels = GroupLevelInfo[];
  const isGroup = (item: RowOrGroup): item is RowsGroup => {
    return item && Array.isArray(item.$childs);
  };
  const convertRowsToGroups = (rows: any[]): RowsGroup[] => {
    const groupLevels: GroupLevels = grouping.map<GroupLevelInfo>((g, index) => ({
      currentGroup: null,
      propertyName: g.propertyName,
      index: index,
      propertyPath: g.propertyName.split('.')
    }));

    const getValue = (container: object, path: string[]) => {
      return path.reduce((prev, part) => prev ? prev[part] : undefined, container);
    };

    const result: RowsGroup[] = [];
    rows.forEach(row => {
      let parent: RowOrGroup[] = result;
      let differenceFound = false;
      groupLevels.forEach((g, index) => {
        const groupValue = getValue(row.original, g.propertyPath);

        if (!g.currentGroup || !isEqual(g.currentGroup.value, groupValue) || differenceFound) {
          g.currentGroup = {
            index: index,
            value: groupValue,
            $childs: []
          };
          parent.push(g.currentGroup);
          differenceFound = true;
        }
        parent = g.currentGroup.$childs;
      });
      parent.push(row);
    });
    return result;
  };

  const renderGroupTitle = (value: any, propertyName: string) => {
    if (!Boolean(value) && value !== false)
      return <Typography.Text type='secondary'>(empty)</Typography.Text>;
    const column = groupingColumns.find(c => isDataColumn(c) && c.propertyName === propertyName);
    const propertyMeta = isDataColumn(column) ? column.metadata : null;

    return <ValueRenderer value={value} meta={propertyMeta} />;
  };

  const renderGroup = (group: RowsGroup, key: number, rowRenderer: RowRenderer): React.ReactElement => {
    const title = renderGroupTitle(group.value, grouping[group.index].propertyName);
    return (
      <Collapse
        key={key}
        defaultActiveKey={['1']}
        expandIconPosition='start'
        className={`sha-group-level-${group.index}`}
      >
        <Collapse.Panel header={<>{title}</>} key="1">
          {group.$childs.map((child, index) => {
            return isGroup(child)
              ? renderGroup(child, index, rowRenderer)
              : rowRenderer(child, index);
          })}
        </Collapse.Panel>
      </Collapse>
    );
  };

  const onRowsRenderingWithGrouping: OnRowsRendering = ({ rows, defaultRender }) => {
    const groupped = convertRowsToGroups(rows);
    return (
      <>
        {groupped.map((group, index) => renderGroup(group, index, defaultRender))}
      </>
    );
  };

  const tableProps: IReactTableProps = {
    data: tableData,
    // Disable sorting if we're in create mode so that the new row is always the first
    defaultSorting: defaultSorting,
    useMultiSelect,
    onSelectRow: onSelectRowLocal,
    onRowDoubleClick: dblClickHandler,
    onSelectedIdsChanged: changeSelectedIds,
    onMultiRowSelect,
    onSort, // Update it so that you can pass it as param. Quick fix for now
    columns: preparedColumns as Column<any>[], // todo: make ReactTable generic and remove this cast
    selectedRowIndex,
    loading: isFetchingTableData,
    pageCount: totalPages,
    manualFilters: true, // informs React Table that you'll be handling sorting and pagination server-side
    manualPagination: true, // informs React Table that you'll be handling sorting and pagination server-side
    loadingText: (
      <span>
        <LoadingOutlined /> loading...
      </span>
    ),
    onRowsReordered,
    allowRowDragAndDrop,
    containerStyle,
    tableStyle,
    omitClick: options?.omitClick,

    canDeleteInline: crudOptions.canDelete,
    deleteAction: deleter,

    canEditInline: crudOptions.canEdit,
    updateAction: updater,

    canAddInline: crudOptions.canAdd,
    newRowCapturePosition: props.newRowCapturePosition,
    createAction: creater,
    newRowInitData: crudOptions.onNewRowInitialize,
    inlineEditMode: props.inlineEditMode,
    inlineSaveMode: props.inlineSaveMode,
    inlineEditorComponents,
    inlineCreatorComponents,
    inlineDisplayComponents,
    minHeight: props.minHeight,
    maxHeight: props.maxHeight,
    onRowsRendering: grouping && grouping.length > 0 ? onRowsRenderingWithGrouping : undefined,
  };

  return (
    <Fragment>
      <div className="sha-child-table-error-container">
        {exportToExcelError && <ValidationErrors error={'Error occurred while exporting to excel'} />}
      </div>

      {tableProps.columns && tableProps.columns.length > 0 && <ReactTable {...tableProps} />}
    </Fragment>
  );
};

export default DataTable;
