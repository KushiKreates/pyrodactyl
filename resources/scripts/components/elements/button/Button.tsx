import clsx from 'clsx';
import { forwardRef } from 'react';

import { ButtonProps, Options } from '@/components/elements/button/types';

import styles from './style.module.css';

// Using optional chaining and providing fallback to avoid errors
const secondaryColorClass = window.ssr?.props?.colors?.secondary || 'purple-500';
console.log("Secondary color class:", secondaryColorClass);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, shape, size, variant, className, ...rest }, ref) => {
        return (
            <button
                ref={ref}
                className={clsx(
                    styles.button,
                    variant !== Options.Variant.Secondary ? `bg-${secondaryColorClass}` : styles.primary,
                    {
                        [styles.secondary]: variant === Options.Variant.Secondary,
                        [styles.square]: shape === Options.Shape.IconSquare,
                        [styles.small]: size === Options.Size.Small,
                        [styles.large]: size === Options.Size.Large,
                    },
                    className,
                )}
                {...rest}
            >
                {children}
            </button>
        );
    },
);

const TextButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => (
    <Button ref={ref} className={clsx(styles.text, className)} {...props} />
));

const DangerButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => (
    <Button ref={ref} className={clsx(styles.danger, className)} {...props} />
));

const _Button = Object.assign(Button, {
    Sizes: Options.Size,
    Shapes: Options.Shape,
    Variants: Options.Variant,
    Text: TextButton,
    Danger: DangerButton,
});

export default _Button;