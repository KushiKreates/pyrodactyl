import { useContext } from 'react';

import { useDeepCompareEffect } from '@/plugins/useDeepCompareEffect';

import { DialogContext } from './';

export default ({ children }: { children: React.ReactNode }) => {
    const { setFooter } = useContext(DialogContext);

    useDeepCompareEffect(() => {
        setFooter(<div className={'px-4 py-4 flex items-center justify-end gap-4 rounded-b'}>{children}</div>);
    }, [children]);

    return null;
};
