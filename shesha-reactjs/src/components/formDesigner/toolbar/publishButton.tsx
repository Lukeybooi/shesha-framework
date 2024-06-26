import React, { FC } from 'react';
import { Button, message, Modal } from 'antd';
import { ConfigurationItemVersionStatus } from '@/utils/configurationFramework/models';
import { DeploymentUnitOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useFormPersister } from '@/providers/formPersisterProvider';
import { useSheshaApplication } from '@/providers';
import {
    updateItemStatus,
} from '@/utils/configurationFramework/actions';

export interface IPublishButtonProps {
    onPublished?: () => void;
}

export const PublishButton: FC<IPublishButtonProps> = ({ onPublished }) => {
    const { backendUrl, httpHeaders } = useSheshaApplication();
    const { loadForm, formProps } = useFormPersister();

    const onPublishClick = () => {
        const onOk = () => {
            message.loading('Publishing in progress..', 0);
            updateItemStatus({
                backendUrl: backendUrl,
                httpHeaders: httpHeaders,
                id: formProps.id,
                status: ConfigurationItemVersionStatus.Live,
                onSuccess: () => {
                    if (onPublished)
                        onPublished();
                    else {
                        message.success('Form published successfully');
                        loadForm({ skipCache: true });
                    }
                },
            });
        };
        Modal.confirm({
            title: 'Publish Item',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to publish this form?',
            okText: 'Yes',
            cancelText: 'No',
            onOk,
        });
    };

    return formProps.isLastVersion && formProps.versionStatus === ConfigurationItemVersionStatus.Ready
        ? (
            <Button onClick={onPublishClick} type="link">
                <DeploymentUnitOutlined /> Publish
            </Button>
        )
        : null;
};