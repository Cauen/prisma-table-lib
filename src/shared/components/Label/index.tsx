import * as React from "react";

type LabelProps = {
    id?: string
    label?: string
    children?: React.ReactNode
};

export default function Label({ id, label, children }: LabelProps) {
  return (
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
      {children}
    </label>
  );
}
