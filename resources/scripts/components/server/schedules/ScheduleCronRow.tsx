import clsx from 'clsx';

import { Schedule } from '@/api/server/schedules/getServerSchedules';

interface Props {
    cron: Schedule['cron'];
    className?: string;
}

const ScheduleCronRow = ({ cron, className }: Props) => (
    <div className={clsx('flex flex-wrap gap-4 justify-center m-auto', className)}>
        <div className={'text-center'}>
            <p className={'font-medium'}>{cron.minute}</p>
            <p className={'text-xs text-zinc-500 uppercase'}>Minute</p>
        </div>
        <div className={'text-center'}>
            <p className={'font-medium'}>{cron.hour}</p>
            <p className={'text-xs text-zinc-500 uppercase'}>Hour</p>
        </div>
        <div className={'text-center'}>
            <p className={'font-medium'}>{cron.dayOfMonth}</p>
            <p className={'text-xs text-zinc-500 uppercase'}>Day (Month)</p>
        </div>
        <div className={'text-center'}>
            <p className={'font-medium'}>{cron.month}</p>
            <p className={'text-xs text-zinc-500 uppercase'}>Month</p>
        </div>
        <div className={'text-center'}>
            <p className={'font-medium'}>{cron.dayOfWeek}</p>
            <p className={'text-xs text-zinc-500 uppercase'}>Day (Week)</p>
        </div>
    </div>
);

export default ScheduleCronRow;
