import { createContext, MutableRefObject, ReactNode } from 'react';
import {
  IAsyncValidationError,
  IFlagsSetters,
  IFlagsState,
  IFormValidationErrors,
  IToolboxComponent,
  IToolboxComponentGroup,
} from '../../interfaces';

import { IPropertyMetadata } from '../../interfaces/metadata';
import { StateWithHistory } from '../../utils/undoable';
import {
  DEFAULT_FORM_SETTINGS,
  IConfigurableFormComponent,
  IFlatComponentsStructure,
  IFormSettings,
  ROOT_COMPONENT_KEY,
} from '../form/models';
import { IDataSource, IFormDesignerActionFlag } from '../formDesigner/models';
import { IDataContextFullInstance } from 'providers/dataContextProvider';

export type IFlagProgressFlags = 'addComponent' | 'updateComponent' | 'deleteComponent' | 'moveComponent';
export type IFlagSucceededFlags = 'addComponent' | 'updateComponent' | 'deleteComponent' | 'moveComponent';
export type IFlagErrorFlags = 'addComponent' | 'updateComponent' | 'deleteComponent' | 'moveComponent';
export type IFlagActionedFlags = '__DEFAULT__' /* NEW_ACTIONED_FLAG_GOES_HERE */;

export interface IUndoableFormDesignerStateContext extends StateWithHistory<IFormDesignerStateContext> {}

export interface IHasComponentGroups {
  toolboxComponentGroups: IToolboxComponentGroup[];
}

export interface IFormDesignerStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags>,
    IHasComponentGroups,
    IFlatComponentsStructure {
  validationErrors?: IFormValidationErrors;

  selectedComponentId?: string;
  selectedComponentRef?: MutableRefObject<any>;
  isDragging: boolean;
  hasDragged: boolean;
  dataSources: IDataSource[];
  activeDataSourceId: string;
  isDebug: boolean;
  readOnly: boolean;

  // todo: move to persister
  formSettings: IFormSettings;
  /**
   * Action flag to determine event which was triggered
   */
  actionFlag?: { [key in IFormDesignerActionFlag]?: boolean };

  /**
   * External components rendered on the designer mode
   */
  renderToolbarRightButtons?: ReactNode[];
}

export interface AddComponentPayloadBase {
  index: number;
  containerId: string;
}

export interface IComponentAddPayload extends AddComponentPayloadBase {
  componentType: string;
}

export interface IComponentAddFromTemplatePayload extends AddComponentPayloadBase {}

export interface IAddDataPropertyPayload {
  propertyMetadata: IPropertyMetadata;
  index: number;
  containerId: string;
}

export interface IUpdateChildComponentsPayload {
  containerId: string;
  componentIds: string[];
}

export interface IComponentDeletePayload {
  componentId: string;
}

export interface IComponentDuplicatePayload {
  componentId: string;
}

export interface IComponentUpdatePayload {
  componentId: string;
  settings: IConfigurableFormComponent;
}

export interface IComponentUpdateSettingsValidationPayload {
  componentId: string;
  validationErrors: IAsyncValidationError[];
}

export interface ISetSelectedComponentPayload {
  id: string;
  componentRef?: MutableRefObject<any>;
  /** Id of the current source of metadata */
  dataSourceId: string;
}

export interface IFormDesignerActionsContext
  extends IFlagsSetters<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  getChildComponents: (id: string) => IConfigurableFormComponent[];
  getParentComponent: (componentId: string, type: string) => IConfigurableFormComponent;
  deleteComponent: (payload: IComponentDeletePayload) => void;
  duplicateComponent: (payload: IComponentDuplicatePayload) => void;
  updateComponent: (payload: IComponentUpdatePayload) => void;
  getComponentModel: (id: string) => IConfigurableFormComponent;

  setValidationErrors: (payload: IFormValidationErrors) => void;

  addDataProperty: (payload: IAddDataPropertyPayload) => void;
  addComponent: (payload: IComponentAddPayload) => void;
  addComponentsFromTemplate: (payload: IComponentAddFromTemplatePayload) => void;
  updateChildComponents: (payload: IUpdateChildComponentsPayload) => void;
  setDebugMode: (isDebug: boolean) => void;
  startDraggingNewItem: () => void;
  endDraggingNewItem: () => void;
  startDragging: () => void;
  endDragging: () => void;
  setSelectedComponent: (
    id: string,
    dataSourceId: string,
    dataContext: IDataContextFullInstance,
    componentRef?: MutableRefObject<any>
  ) => void;
  updateFormSettings: (settings: IFormSettings) => void;

  getToolboxComponent: (type: string) => IToolboxComponent;

  addDataSource: (dataSource: IDataSource) => void;
  removeDataSource: (id: string) => void;
  setActiveDataSource: (id: string) => void;
  getActiveDataSource: () => IDataSource | null;

  setReadOnly: (value: boolean) => void;
  /** Flag set to determine action triggered from external source */
  setActionFlag: (flag: IFormDesignerActionFlag) => void;

  /** Set form designer toolbar button */
  setToolbarRightButton: (button: ReactNode) => void;

  undo: () => void;
  redo: () => void;
}

/** Form initial state */
export const FORM_DESIGNER_CONTEXT_INITIAL_STATE: IFormDesignerStateContext = {
  isInProgress: {},
  succeeded: {},
  error: {},
  actioned: {},
  allComponents: {},
  componentRelations: { [ROOT_COMPONENT_KEY]: [] },
  hasDragged: false,
  isDragging: false,
  isDebug: false,
  formSettings: DEFAULT_FORM_SETTINGS,
  toolboxComponentGroups: [], //defaultToolboxComponents,
  dataSources: [],
  activeDataSourceId: null,
  readOnly: true,
  actionFlag: {},
  renderToolbarRightButtons: [],
};

export const UndoableFormDesignerStateContext = createContext<IUndoableFormDesignerStateContext>({
  past: [],
  present: FORM_DESIGNER_CONTEXT_INITIAL_STATE,
  future: [],
});

export interface ConfigurableFormInstance extends IFormDesignerActionsContext, IFormDesignerStateContext {}

export const FormDesignerStateContext = createContext<IFormDesignerStateContext>(FORM_DESIGNER_CONTEXT_INITIAL_STATE);

export const FormDesignerActionsContext = createContext<IFormDesignerActionsContext>(undefined);

export const FormDesignerStateConsumer = FormDesignerStateContext.Consumer;
