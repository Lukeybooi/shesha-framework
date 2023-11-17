import { SwitcherOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { IToolboxComponent } from 'interfaces';
import { FormMarkup } from 'providers/form/models';
import React from 'react';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { getStyle, validateConfigurableComponentSettings } from 'providers/form/utils';
import { useFormData } from 'providers';
import { DataTypes } from 'interfaces/dataTypes';
import ReadOnlyDisplayFormItem from '../../../readOnlyDisplayFormItem';
import { SwitchSize } from 'antd/lib/switch';
import { ISwitchComponentProps } from './interfaces';
import { migrateCustomFunctions, migratePropertyName } from 'designer-components/_common-migrations/migrateSettings';
import { migrateVisibility } from 'designer-components/_common-migrations/migrateVisibility';

const settingsForm = settingsFormJson as FormMarkup;

const SwitchComponent: IToolboxComponent<ISwitchComponentProps> = {
  type: 'switch',
  name: 'Switch',
  icon: <SwitcherOutlined />,
  canBeJsSetting: true,
  dataTypeSupported: ({ dataType }) => dataType === DataTypes.boolean,
  Factory: ({ model: passedModel }) => {
    const { size, ...model } = passedModel;
    const { data: formData } = useFormData();

    const isReadOnly = model?.readOnly;

    const disabled = model?.disabled;

    const style = getStyle(model?.style, formData);

    return (
      <ConfigurableFormItem model={model} valuePropName="checked" initialValue={model?.defaultValue}>
        {(value, onChange) => {
          return isReadOnly ? (
              <ReadOnlyDisplayFormItem type="switch" disabled={disabled} value={value} />
            ) : (
              <Switch className="sha-switch" disabled={disabled} style={style} size={size as SwitchSize} checked={value} onChange={onChange}/>
            );
        }}
      </ConfigurableFormItem>
    );
  },
  initModel: (model) => {
    return {
      ...model,
      label: 'Switch',
    };
  },
  settingsFormMarkup: settingsForm,
  validateSettings: (model) => validateConfigurableComponentSettings(settingsForm, model),
  migrator: (m) => m
    .add<ISwitchComponentProps>(0, (prev) => migratePropertyName(migrateCustomFunctions(prev)))
    .add<ISwitchComponentProps>(1, (prev) => migrateVisibility(prev))
  ,
};

export default SwitchComponent;
