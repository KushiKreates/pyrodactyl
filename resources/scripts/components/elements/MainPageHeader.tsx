import clsx from 'clsx';
import styled from 'styled-components';

const HeaderWrapper = styled.div``;

interface MainPageHeaderProps {
    children?: React.ReactNode;
    direction?: 'row' | 'column';
    titleChildren?: JSX.Element;
    title?: string;
    user?: any;
}

export const MainPageHeader: React.FC<MainPageHeaderProps> = ({
    children,
    titleChildren,
    title,
    direction = 'row',
    user
}) => {

    console.log(user);

    const getWelcomeMessage = () => {
        const hour = new Date().getHours();
        
        if (hour < 12) return "Good morning,";
        if (hour < 18) return "Good afternoon,";
        return "Good evening,";
      };
      
      const getGreetingEmoji = () => {
        const emojis = ["👋", "✨", "🚀", "🎮", "💻", "👾"];
        return emojis[Math.floor(Math.random() * emojis.length)];
      };

    return (
        <HeaderWrapper
            className={clsx(
                'flex',
                direction === 'row' ? 'items-center flex-col md:flex-row' : 'items-start flex-col',
                'justify-between',
                'mb-8 gap-8 mt-8 md:mt-0 select-none',
            )}
        >
            
            <div className='grid-cols-1 items-center gap-4 flex-col md:flex-row '>

                <h1 className='text-[52px] font-extrabold leading-[98%] tracking-[-0.14rem]'>{title}</h1>
                <span className='font-medium  ml-3'>
                    {getWelcomeMessage()} {user?.username} {getGreetingEmoji()}
                </span>
                {titleChildren}
            </div>
            {children}
        </HeaderWrapper>
    );
};
