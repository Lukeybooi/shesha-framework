import React, { FC } from 'react';
import { Button, Tooltip, Typography } from 'antd';
import { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { useSidebarMenuConfigurator } from '@/providers/sidebarMenuConfigurator';
import DragHandle from './dragHandle';
import ShaIcon, { IconType } from '@/components/shaIcon';
import classNames from 'classnames';
import { ISidebarMenuItem } from '@/interfaces/sidebar';

const { Text } = Typography;

export interface IProps extends ISidebarMenuItem {
  index: number[];
}

export const SidebarMenuItem: FC<IProps> = props => {
  const { deleteItem, selectedItemId } = useSidebarMenuConfigurator();

  const onDeleteClick = () => {
    deleteItem(props.id);
  };

  const { icon } = props;

  const renderedIcon = icon ? (
    typeof icon === 'string' ? (
      <ShaIcon iconName={icon as IconType} />
    ) : React.isValidElement(icon) ? (
      icon
    ) : null
  ) : null;

  return (
    <div className={classNames('sha-sidebar-item', { selected: selectedItemId === props.id })}>
      <div className="sha-sidebar-item-header">
        <DragHandle id={props.id} />
        {props.itemType === 'button' && (
          <>
            {renderedIcon}
            <span className="sha-sidebar-item-name">{props.title}</span>
            {props.tooltip && (
              <Tooltip title={props.tooltip}>
                <QuestionCircleOutlined className="sha-help-icon" />
              </Tooltip>
            )}
          </>
        )}
        {props.itemType === 'divider' && (<Text type="secondary">— divider —</Text>)}

        <div className="sha-sidebar-item-controls">
          <Button icon={<DeleteFilled color="red" />} onClick={onDeleteClick} size="small" danger />
        </div>
      </div>
    </div>
  );
};

export default SidebarMenuItem;
