import React, { FC } from 'react';
import { Collapse, Skeleton } from 'antd';
import { CollapseProps } from 'antd/lib/collapse';
import classNames from 'classnames';

const { Panel } = Collapse;

export interface ICollapsiblePanelProps extends CollapseProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  extraClassName?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  disabled?: boolean;
  extra?: React.ReactNode;
  noContentPadding?: boolean;
  loading?: boolean;
  collapsedByDefault?: boolean;
}

export const CollapsiblePanel: FC<ICollapsiblePanelProps> = ({
  expandIconPosition = 'end',
  onChange,
  header,
  extra,
  children,
  noContentPadding,
  loading,
  className,
  extraClassName,
  style,
  collapsedByDefault = false,
  showArrow,
  collapsible,
  ghost,
}) => {
  // Prevent the CollapsiblePanel from collapsing every time you click anywhere on the extra and header
  const onContainerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event?.stopPropagation();

  return (
    <Collapse
      defaultActiveKey={collapsedByDefault ? [] : ['1']}
      onChange={onChange}
      expandIconPosition={expandIconPosition}
      className={classNames('sha-collapsible-panel', className, { 'no-content-padding': noContentPadding })}
      style={style}
      ghost={ghost}
    >
      <Panel
        key="1"
        collapsible={collapsible}
        showArrow={showArrow}
        header={<span className={`ant-collapse-header-text`}>{header || ' '}</span>}
        extra={
          <span onClick={onContainerClick} className={extraClassName}>
            {extra}
          </span>
        }
      >
        <Skeleton loading={loading}>{children}</Skeleton>
      </Panel>
    </Collapse>
  );
};

export default CollapsiblePanel;
