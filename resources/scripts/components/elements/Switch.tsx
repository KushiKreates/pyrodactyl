import { useMemo } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';

const ToggleContainer = styled.div``;

// const ToggleContainer = styled.div`
//     ${tw`relative select-none w-12 leading-normal`};

//     & > input[type='checkbox'] {
//         ${tw`hidden`};

//         &:checked + label {
//             ${tw`bg-zinc-500 border-zinc-700 shadow-none`};
//         }

//         &:checked + label:before {
//             right: 0.125rem;
//         }
//     }

//     & > label {
//         ${tw`mb-0 block overflow-hidden cursor-pointer bg-zinc-950 border border-zinc-700 rounded-full h-6 shadow-inner`};
//         transition: all 75ms linear;

//         &::before {
//             ${tw`absolute block bg-white border h-5 w-5 rounded-full`};
//             top: 0.125rem;
//             right: calc(50% + 0.125rem);
//             //width: 1.25rem;
//             //height: 1.25rem;
//             content: '';
//             transition: all 75ms ease-in;
//         }
//     }
// `;

export interface SwitchProps {
    name: string;
    label?: string;
    description?: string;
    defaultChecked?: boolean;
    readOnly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

const Switch = ({ name, label, description, defaultChecked, readOnly, onChange, children }: SwitchProps) => {
    const uuid = useMemo(() => v4(), []);

    return (
        <div className={`flex items-center`}>
            <ToggleContainer className={`flex-none`}>
                {children || (
                    <Input
                        id={uuid}
                        name={name}
                        type={'checkbox'}
                        onChange={(e) => onChange && onChange(e)}
                        defaultChecked={defaultChecked}
                        disabled={readOnly}
                    />
                )}
                <Label htmlFor={uuid} />
            </ToggleContainer>
            {(label || description) && (
                <div className={`ml-4 w-full`}>
                    {label && <Label htmlFor={uuid}>{label}</Label>}
                    {description && <p className={`text-zinc-400 text-sm mt-2`}>{description}</p>}
                </div>
            )}
        </div>
    );
};
Switch.displayName = 'Switch';

export default Switch;
