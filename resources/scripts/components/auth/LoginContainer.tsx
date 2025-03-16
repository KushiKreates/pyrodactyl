import { useStoreState } from 'easy-peasy';
import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Reaptcha from 'reaptcha';
import { object, string } from 'yup';

import LoginFormContainer from '@/components/auth/LoginFormContainer';
import Button from '@/components/elements/Button';
import Field from '@/components/elements/Field';

import login from '@/api/auth/login';

import useFlash from '@/plugins/useFlash';

import Logo from '../elements/PyroLogo';

interface Values {
    username: string;
    password: string;
}

function LoginContainer() {
    const ref = useRef<Reaptcha>(null);
    const [token, setToken] = useState('');

    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const { enabled: recaptchaEnabled, siteKey } = useStoreState((state) => state.settings.data!.recaptcha);

    const navigate = useNavigate();

    useEffect(() => {
        clearFlashes();
    }, []);

    const onSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        clearFlashes();

        // If there is no token in the state yet, request the token and then abort this submit request
        // since it will be re-submitted when the recaptcha data is returned by the component.
        if (recaptchaEnabled && !token) {
            ref.current!.execute().catch((error) => {
                console.error(error);

                setSubmitting(false);
                clearAndAddHttpError({ error });
            });

            return;
        }

        login({ ...values, recaptchaData: token })
            .then((response) => {
                if (response.complete) {
                    // @ts-expect-error this is valid
                    window.location = response.intended || '/';
                    return;
                }

                navigate('/auth/login/checkpoint', { state: { token: response.confirmationToken } });
            })
            .catch((error) => {
                console.error(error);

                setToken('');
                // https://github.com/jsardev/reaptcha/issues/218
                if (ref.current) {
                    setTimeout(() => {
                        if (ref.current) {
                            ref.current.reset();
                        }
                    }, 500);
                }

                setSubmitting(false);
                clearAndAddHttpError({ error });
            });
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Login Form Side */}
            <div className="flex flex-col justify-center w-full md:w-1/2 p-4">
                <Formik
                    onSubmit={onSubmit}
                    initialValues={{ username: '', password: '' }}
                    validationSchema={object().shape({
                        username: string().required('A username or email must be provided.'),
                        password: string().required('Please enter your account password.'),
                    })}
                >
                    {({ isSubmitting, setSubmitting, submitForm }) => (
                        <LoginFormContainer title="Log in to your account" className={`w-full flex`}>
                            <div className='flex h-12 mb-4 items-center w-full justify-center'>
                                <Logo />
                            </div>
                            <div aria-hidden className='my-8 bg-[#ffffff33] min-h-[1px]'></div>
                            <h2 className='text-xl font-extrabold mb-2'>Login</h2>
                            <Field
                                id='usernameOrEmail'
                                type={'text'}
                                label={'Username or Email'}
                                name={'username'}
                                disabled={isSubmitting}
                            />
                            <div className={`relative mt-6`}>
                                <Field
                                    id='password'
                                    type={'password'}
                                    label={'Password'}
                                    name={'password'}
                                    disabled={isSubmitting}
                                />
                                <Link
                                    to={'/auth/password'}
                                    className={`text-xs text-zinc-500 tracking-wide no-underline hover:text-zinc-600 absolute top-1 right-0`}
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className={`mt-6`}>
                                <Button
                                    className={`relative mt-4 w-full rounded-full bg-${window.ssr?.props?.colors?.secondary} border-0 ring-0 outline-none capitalize font-bold text-sm py-2`}
                                    type={'submit'}
                                    size={'xlarge'}
                                    isLoading={isSubmitting}
                                    disabled={isSubmitting}
                                >
                                    Login
                                </Button>
                            </div>
                            
                            {recaptchaEnabled && (
                                <Reaptcha
                                    ref={ref}
                                    size={'invisible'}
                                    sitekey={siteKey || '_invalid_key'}
                                    onVerify={(response) => {
                                        setToken(response);
                                        setTimeout(submitForm, 100);
                                    }}
                                    onExpire={() => {
                                        setSubmitting(false);
                                        setToken('');
                                    }}
                                />
                            )}
                        </LoginFormContainer>
                    )}
                </Formik>
            </div>
            
            {/* Image Side */}
            <div className="hidden md:block md:w-1/2 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1000"
                    alt="Server Infrastructure"
                    className="object-cover h-full w-full"
                />
                <div className="absolute bottom-8 left-8 right-8 text-white z-20">
                    <h2 className="text-3xl font-bold mb-2">Manage Your Servers</h2>
                    <p className="text-zinc-300">Control your game servers with ease using our powerful panel.</p>
                </div>
            </div>
        </div>
    );
}

export default LoginContainer;