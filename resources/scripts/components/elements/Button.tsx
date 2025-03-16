import clsx from 'clsx';
import styled from 'styled-components';

import Spinner from '@/components/elements/Spinner';

interface Props {
    isLoading?: boolean;
    size?: 'xsmall' | 'small' | 'large' | 'xlarge';
    color?: 'green' | 'red' | 'primary' | 'grey' | 'secondary';
    isSecondary?: boolean;
}

interface Windows extends Window {

    ssr: {
        props: any;
    };
}

let secondaryColor = window.ssr.props.colors.secondary;

// Get the secondary color from SSR props
const getSecondaryColor = () => {
    if (window.ssr?.props?.colors?.secondary) {
        return window.ssr.props.colors.secondary;
    }
    
};

const ButtonStyle = styled.button<Omit<Props, 'isLoading'>>`
    ${props => props.color === 'secondary' && `
        background-color: ${getSecondaryColor()};
        &:hover {
            background-color: ${getSecondaryColor()}dd;
        }
    `}
`;

type ComponentProps = Omit<JSX.IntrinsicElements['button'], 'ref' | keyof Props> & Props;

const Button: React.FC<ComponentProps> = ({ children, isLoading, color = `bg-${window.ssr?.props?.colors?.secondary}`, ...props }) => (
    <ButtonStyle color={color} {...props}>
        {isLoading && (
            <div className={`flex absolute justify-center  items-center w-full h-full left-0 top-0`}>
                <Spinner size={'small'} />
            </div>
        )}
        <span
            className={clsx({
                'opacity-0': isLoading,
                'pointer-events-none': isLoading,
                
            })}
            style={{ 
                backgroundColor: `${window.ssr?.props?.colors?.secondary || 'purple'}90` 
            }}
        >
            {children}
        </span>
    </ButtonStyle>
);

type LinkProps = Omit<JSX.IntrinsicElements['a'], 'ref' | keyof Props> & Props;

const LinkButton: React.FC<LinkProps> = (props) => <ButtonStyle as={'a'} {...props} />;

export { LinkButton, ButtonStyle };
export default Button;