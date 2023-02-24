import * as React from 'react';
import { classNames } from '../../utils/styles';
import Label from '../Label';

type CustomInputReact = React.InputHTMLAttributes<HTMLInputElement>;
export interface CustomInputProps extends CustomInputReact {
  label?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<
  HTMLTextAreaElement & HTMLInputElement,
  CustomInputProps
>(({ label, fullWidth = true, id, type = 'text', ...rest }, ref) => {
  return (
    <div>
      <div className="col-span-6 sm:col-span-3">
        {label && <Label id={id} label={label} />}
        <input
          ref={ref}
          id={id}
          autoComplete="given-name"
          type={type}
          className={classNames(
            'mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            fullWidth ? 'w-full' : '',
          )}
          {...rest}
        />
      </div>
    </div>
  );
});
Input.displayName = "Input";

export default Input;
