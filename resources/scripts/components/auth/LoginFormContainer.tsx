import { Form } from 'formik';
import { forwardRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import FlashMessageRender from '@/components/FlashMessageRender';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
};

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => (
    <div className='w-full max-w-lg px-8'>
        <Card className="bg-black/45 border max-w-6xl border-zinc-800 shadow-lg">
            {title && (
                <CardHeader className="pb-2">
                    <CardTitle className="text-3xl text-center text-zinc-100 font-medium">{title}</CardTitle>
                </CardHeader>
            )}
            <CardContent className="pb-8 pt-4">
                <FlashMessageRender />
                <Form {...props} ref={ref}>
                    <div className="flex w-full">
                        <div className="flex-1">{props.children}</div>
                    </div>
                </Form>
            </CardContent>
        </Card>
    </div>
));