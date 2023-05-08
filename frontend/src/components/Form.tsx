import React from 'react';
import { useForm } from 'react-hook-form';
export interface FormProps {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  className?: string;
}

export const Form = ({ onSubmit, children, className }: FormProps) => {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {React.Children.map(children, (child: any) => {
        return child?.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name
              }
            })
          : child;
      })}
    </form>
  );
};
