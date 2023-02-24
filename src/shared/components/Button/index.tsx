import * as React from "react";

type CustomButtonReact = React.ButtonHTMLAttributes<HTMLButtonElement>;

const classes = {
  white:
    "rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
  accent:
    "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
  red: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm",
};

interface ButtonProps extends CustomButtonReact {
  center?: boolean;
  loading?: boolean;
  //   href?: string
  //   variant?: "default" | "light-gray" | "outlined" | "minimal";
  color?: keyof typeof classes;
  children?: React.ReactNode;
}

export default function Button({
  children,
  color = "accent",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button className={`${classes[color]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
