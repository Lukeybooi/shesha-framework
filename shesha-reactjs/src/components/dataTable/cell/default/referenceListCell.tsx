import { useReferenceListItem } from 'providers/referenceListDispatcher';
import React from 'react';
import { IDataCellProps } from '../interfaces';
import { asNumber } from '../utils';

export interface IReferenceListCellProps<D extends object = {}, V = any> extends IDataCellProps<D, V> {
}

export const ReferenceListCell = <D extends object = {}, V = any>(props: IReferenceListCellProps<D, V>) => {
    const itemValue = asNumber(props.value);
    if (!itemValue || !props.columnConfig)
        return null;
    
    const { referenceListName, referenceListModule } = props.columnConfig;
        
    const item = useReferenceListItem(referenceListModule, referenceListName, itemValue);
    return <>{item?.data?.item}</>;
};

export default ReferenceListCell;