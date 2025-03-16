import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Globe } from '../ui/globe';
import Button from '@/components/elements/Button';
import clsx from 'clsx';


const ScreenBlock = ({ title, message }) => {
    return (
        <>
            <div className='w-full h-full flex gap-12 items-center p-8 max-w-3xl mx-auto'>
                <div className='flex flex-col gap-8 max-w-sm text-left'>
                    <h1 className='text-[32px] font-extrabold leading-[98%] tracking-[-0.11rem]'>{title}</h1>
                    <p className=''>{message}</p>
                </div>
            </div>
        </>
    );
};

const ServerError = ({ title, message }) => {
    return (
        <>
            <div className='w-full h-full flex gap-12 items-center p-8 max-w-3xl mx-auto'>
                <div className='flex flex-col gap-8 max-w-sm text-left'>
                    <h1 className='text-[32px] font-extrabold leading-[98%] tracking-[-0.11rem]'>{title}</h1>
                    <p className=''>{message}</p>
                </div>
            </div>
        </>
    );
};

const NotFound = () => {
    // Get the current URL path
    const url = window.location.pathname;

    const secondaryColor = window.ssr?.props?.colors?.secondary || 'purple-500';
    
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 p-4 text-center relative z-10">
                <Card className="p-6 shadow-lg border-0 bg-black/45  max-w-3xl rounded-2xl outline-none" style={{ outline: 'none' }}>
                    <CardContent className="pt-6">
                        <div className="rounded-full p-6">
                            <img 
                                src="https://media.tenor.com/i2alOMp8NXAAAAAC/sousou-no-frieren-frieren.gif" 
                                alt="Frieren looking confused" 
                                className="mx-auto rounded-2xl shadow-md"
                                width="256"
                                height="256"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        
                        <h1 className="text-4xl font-bold tracking-tight mt-6">Page Not Found</h1>
                        
                        <p className="max-w-[600px] text-lg text-muted-foreground mt-4 mb-6">
                            We couldn't find what you wanted at <span className="font-mono font-medium">{url}</span>. 
                            It may have been removed or you might not have access.
                        </p>
                        
                        <div className="flex gap-4 justify-center">
                        <div className="flex gap-4 justify-center">
                            <Button 
                                className={clsx(
                                    'rounded-full py-4 px-4',
                                    `bg-${window.ssr?.props?.colors?.secondary || 'purple-600'}`
                                )} 
                            >
                                <Link to="/">Back to Dashboard</Link>
                            </Button>
</div>
                                
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            {/* Decorative Globe in background */}
            <div className="fixed top-1/2 opacity-25 ">
                <div className="w-[5200px] h-[5200px] bg-transparent">
                    <Globe />
                </div>
            </div>
        </div>
    );
};

export { ServerError, NotFound };
export default ScreenBlock;
