import React from "react";

export interface InputGroupProps {
  label: string;
}

const InputGroup = (props: InputGroupProps) => {
  return (
    <input placeholder={props.label} />
  );
};

export default InputGroup;
