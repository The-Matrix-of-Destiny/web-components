import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}
declare const Button: React.FC<ButtonProps>;

interface CardProps {
    children: React.ReactNode;
    className?: string;
}
declare const Card: React.FC<CardProps>;
declare const CardHeader: React.FC<CardProps>;
declare const CardTitle: React.FC<CardProps>;
declare const CardContent: React.FC<CardProps>;
declare const CardFooter: React.FC<CardProps>;

type DateInputSize = "sm" | "md" | "lg";
interface DateInputControlledProps {
    value: string;
    onChange: (val: string) => void;
    formSubmitted?: boolean;
    size?: DateInputSize;
}
declare const DateInputControlled: ({ value, onChange, formSubmitted, size }: DateInputControlledProps) => react_jsx_runtime.JSX.Element;

interface DateInputUncontrolledProps {
    defaultValue?: string;
    onChange?: (val: string) => void;
    formSubmitted?: boolean;
}
declare const DateInputUncontrolled: ({ defaultValue, onChange, formSubmitted }: DateInputUncontrolledProps) => react_jsx_runtime.JSX.Element;

export { Button, type ButtonProps, Card, CardContent, CardFooter, CardHeader, type CardProps, CardTitle, DateInputControlled, DateInputUncontrolled, type DateInputUncontrolledProps };
