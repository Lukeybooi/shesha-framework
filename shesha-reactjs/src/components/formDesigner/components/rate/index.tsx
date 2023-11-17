import { LikeOutlined, StarFilled } from '@ant-design/icons';
import { message, Rate } from 'antd';
import React from 'react';
import {
  ConfigurableFormItem,
  IConfigurableFormComponent,
  IToolboxComponent,
  ShaIcon,
  useForm,
  useFormData,
  useGlobalState,
  useSheshaApplication,
  validateConfigurableComponentSettings,
} from '../../../..';
import { axiosHttp } from 'utils/fetchers';
import { getStyle } from 'providers/form/utils';
import { IconType } from '../../../shaIcon';
import { getSettings } from './settings';
import moment from 'moment';
import { customRateEventHandler } from '../utils';
import _ from 'lodash';
import classNames from 'classnames';
import { migrateCustomFunctions, migratePropertyName } from 'designer-components/_common-migrations/migrateSettings';
import { migrateVisibility } from 'designer-components/_common-migrations/migrateVisibility';

export interface IRateProps extends IConfigurableFormComponent {
  value?: number;
  defaultValue?: number;
  allowClear?: boolean;
  allowHalf?: boolean;
  icon?: string;
  disabled?: boolean;
  count?: number;
  tooltips?: string[];
  onChange?: (value: number) => void;
  className?: string;
}

const RateComponent: IToolboxComponent<IRateProps> = {
  type: 'rate',
  name: 'Rate',
  icon: <LikeOutlined />,
  Factory: ({ model, form }) => {
    const { formMode, setFormDataAndInstance } = useForm();
    const { data: formData } = useFormData();
    const { globalState, setState: setGlobalState } = useGlobalState();
    const { backendUrl } = useSheshaApplication();

    const { allowClear, icon, disabled, count, tooltips, className, style, readOnly } = model;

    const eventProps = {
      model,
      form,
      formData,
      formMode,
      globalState,
      http: axiosHttp(backendUrl),
      message,
      moment,
      setFormData: setFormDataAndInstance,
      setGlobalState,
    };

    if (model.hidden) return null;

    const localCount = !_.isNaN(count) ? count : 5;

    return (
      <ConfigurableFormItem model={model}>
        {(value, onChange) =>
          <Rate
            allowClear={allowClear}
            //allowHalf={allowHalf}
            character={icon ? <ShaIcon iconName={icon as IconType} /> : <StarFilled />}
            disabled={disabled || readOnly}
            count={localCount}
            tooltips={tooltips}
            className={classNames(className, 'sha-rate')}
            style={getStyle(style, formData)} // Temporary. Make it configurable
            {...customRateEventHandler(eventProps)}
            value={value}
            onChange={onChange}
          />
        }
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: (data) => getSettings(data),
  validateSettings: (model) => validateConfigurableComponentSettings(getSettings(model), model),
  migrator: (m) => m
    .add<IRateProps>(0, (prev) => migratePropertyName(migrateCustomFunctions(prev)))
    .add<IRateProps>(1, (prev) => migrateVisibility(prev))
  ,
};

export default RateComponent;
