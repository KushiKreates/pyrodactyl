import { useStoreState } from 'easy-peasy';
import { Fragment, Suspense, useEffect, useRef, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';

import routes from '@/routers/routes';

import DashboardContainer from '@/components/dashboard/DashboardContainer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/elements/DropdownMenu';
import MainSidebar from '@/components/elements/MainSidebar';
import MainWrapper from '@/components/elements/MainWrapper';
import Logo from '@/components/elements/PyroLogo';
import { NotFound } from '@/components/elements/ScreenBlock';
import HugeIconsApi from '@/components/elements/hugeicons/Api';
import HugeIconsDashboardSettings from '@/components/elements/hugeicons/DashboardSettings';
import HugeIconsHome from '@/components/elements/hugeicons/Home';
import HugeIconsSsh from '@/components/elements/hugeicons/Ssh';

import http from '@/api/http';
import { LucideSettings, LucideSidebar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default () => {
    const location = useLocation();
    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);

    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
    };

    const onTriggerLogout = () => {
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error this is valid
            window.location = '/';
        });
    };

    const onSelectAdminPanel = () => {
        window.open(`/admin`);
    };

    // Define refs for navigation buttons.
    const NavigationHome = useRef(null);
    const NavigationSettings = useRef(null);
    const NavigationApi = useRef(null);
    const NavigationSSH = useRef(null);

    const calculateTop = (pathname: string) => {
        // Get currents of navigation refs.
        const ButtonHome = NavigationHome.current;
        const ButtonSettings = NavigationSettings.current;
        const ButtonApi = NavigationApi.current;
        const ButtonSSH = NavigationSSH.current;

        // Perfectly center the page highlighter with simple math.
        // Height of navigation links (56) minus highlight height (40) equals 16. 16 devided by 2 is 8.
        const HighlightOffset: number = 8;

        if (pathname.endsWith(`/`) && ButtonHome != null) return (ButtonHome as any).offsetTop + HighlightOffset;
        if (pathname.endsWith(`/account`) && ButtonSettings != null)
            return (ButtonSettings as any).offsetTop + HighlightOffset;
        if (pathname.endsWith('/api') && ButtonApi != null) return (ButtonApi as any).offsetTop + HighlightOffset;
        if (pathname.endsWith('/ssh') && ButtonSSH != null) return (ButtonSSH as any).offsetTop + HighlightOffset;
        return '0';
    };

    const top = calculateTop(location.pathname);

    const [height, setHeight] = useState('40px');

    useEffect(() => {
        setHeight('34px');
        const timeoutId = setTimeout(() => setHeight('40px'), 200);
        return () => clearTimeout(timeoutId);
    }, [top]);

    return (
        <Fragment key={'dashboard-router'}>
            <button
                id='sidebarToggle'
                className={`lg:hidden fixed top-4 left-4 z-50 bg-transparent p-2 rounded-md text-white ${
                    isSidebarVisible ? 'left-[300px]' : 'left-4'
                }`}
                onClick={toggleSidebar}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-6'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                    />
                </svg>
            </button>

            <MainSidebar className={`lg:flex ${isSidebarVisible ? '' : 'hidden'}`}>
                <div
                    className='absolute bg-brand w-[3px] h-10 left-0 rounded-full pointer-events-none'
                    style={{
                        top,
                        height,
                        opacity: top === '0' ? 0 : 1,
                        transition:
                            'linear(0,0.006,0.025 2.8%,0.101 6.1%,0.539 18.9%,0.721 25.3%,0.849 31.5%,0.937 38.1%,0.968 41.8%,0.991 45.7%,1.006 50.1%,1.015 55%,1.017 63.9%,1.001) 390ms',
                    }}
                />
                <div
                    className='absolute bg-brand w-12 h-10 blur-2xl left-0 rounded-full pointer-events-none'
                    style={{
                        top,
                        opacity: top === '0' ? 0 : 0.5,
                        transition:
                            'top linear(0,0.006,0.025 2.8%,0.101 6.1%,0.539 18.9%,0.721 25.3%,0.849 31.5%,0.937 38.1%,0.968 41.8%,0.991 45.7%,1.006 50.1%,1.015 55%,1.017 63.9%,1.001) 390ms',
                    }}
                />
                <div className='relative flex flex-row items-center justify-between h-8'>
                    <NavLink to={'/'} className='flex shrink-0 h-full w-fit'>
                        <Logo />
                        {/* <h1 className='text-[35px] font-semibold leading-[98%] tracking-[-0.05rem] mb-8'>Panel</h1> */}
                    </NavLink>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className='w-10 h-10 flex items-center justify-center rounded-md text-white hover:bg-[#ffffff11] p-2'>
                                <LucideSidebar size={24} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='z-[99999]' sideOffset={8}>
                            {rootAdmin && (
                                <DropdownMenuItem onSelect={onSelectAdminPanel}>
                                    Admin Panel
                                    <span className='ml-2 z-10 rounded-full bg-brand px-2 py-1 text-xs text-white'>
                                        Staff
                                    </span>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={onTriggerLogout}>Log Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div aria-hidden className='mt-8 mb-4  '>
                    <Separator className='bg-zinc-400'/>
                </div>
                <ul data-pyro-subnav-routes-wrapper='' className='pyro-subnav-routes-wrapper'>
                    <NavLink to={'/'} end className='flex flex-row items-center' ref={NavigationHome}>
                        <HugeIconsHome fill='currentColor' />
                        <p>Servers</p>
                    </NavLink>
                    <NavLink to={'/account/api'} end className='flex flex-row items-center' ref={NavigationApi}>
                        <HugeIconsApi fill='currentColor' />
                        <p>API Keys</p>
                    </NavLink>
                    <NavLink to={'/account/ssh'} end className='flex flex-row items-center' ref={NavigationSSH}>
                        <HugeIconsSsh fill='currentColor' />
                        <p>SSH Keys</p>
                    </NavLink>
                    <NavLink to={'/account'} end className='flex flex-row items-center' ref={NavigationSettings}>
                        <HugeIconsDashboardSettings fill='currentColor' />
                        <p>Settings</p>
                    </NavLink>
                    
                    {rootAdmin && (
                        <a href='/admin' className='flex flex-row items-center'>
                            <LucideSettings />
                            <p>Admin</p>
                        </a>
                    )}
                    
                </ul>
            </MainSidebar>

            <Suspense fallback={null}>
                <MainWrapper>
                    <main
                        data-pyro-main=''
                        data-pyro-transitionrouter=''
                        className='relative inset-[1px] w-full h-full overflow-y-auto overflow-x-hidden rounded-md bg-[#08080875]'
                    >
                        <Routes>
                            <Route path='' element={<DashboardContainer />} />

                            {routes.account.map(({ route, component: Component }) => (
                                <Route
                                    key={route}
                                    path={`/account/${route}`.replace('//', '/')}
                                    element={<Component />}
                                />
                            ))}

                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </main>
                </MainWrapper>
            </Suspense>
        </Fragment>
    );
};
