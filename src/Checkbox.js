import { useEffect, useRef } from "react";

import { useField } from "@unform/core";

export default function Checkbox({ name, value, label, ...rest }) {
  const inputRef = useRef();
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const defaultChecked = defaultValue === value;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.checked;
      },
      clearValue: (ref) => {
        /**
         * If you want to change the default checked for false or true,
         * you can do so here. In this example, when resetting the form,
         * the checkbox goes back to its initial state.
         */
        ref.current.checked = defaultChecked;
      },
      setValue: (ref, value) => {
        ref.current.checked = value;
      },
    });
  }, [defaultValue, fieldName, registerField, defaultChecked]);

  return (
    <div>
      <label htmlFor={fieldName} key={fieldName}>
        <input
          defaultChecked={defaultChecked}
          ref={inputRef}
          type="checkbox"
          id={fieldName}
          {...rest}
        />
        {label}
      </label>

      {error && <span className="error">{error}</span>}
    </div>
  );
}
