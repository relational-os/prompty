import React from 'react';

type ClickHandler = (
  // eslint-disable-next-line no-unused-vars
  event:
    | React.MouseEventHandler<HTMLDivElement>
    | React.ChangeEventHandler<HTMLInputElement>,
  // eslint-disable-next-line no-unused-vars
  value: string
) => void;

interface RadioButtonProps {
  label: string;
  checked: boolean;
  id: string;
  value: string;
  disabled?: boolean;
  onClick?: ClickHandler;
}

const RadioButton = ({
  id,
  label,
  checked,
  value,
  onClick,
  disabled,
}: RadioButtonProps) => {
  const handleClick = (
    event:
      | React.MouseEventHandler<HTMLDivElement>
      | React.ChangeEventHandler<HTMLInputElement>
  ) => {
    if (onClick && !disabled) onClick(event, value);
  };

  return (
    <div
      // @ts-ignore
      onClick={handleClick}
      className={`
        form-check
        rounded-lg
        px-4
        py-3
        mr-4
        ${disabled ? 'focus:outline-none bg-white/50' : `bg-white`}
      `}
      disabled={disabled}
    >
      <input
        className={`
          form-check-input
          appearance-none
          rounded-full
          h-4
          w-4 border
          border-gray-300
          bg-white
          checked:bg-blue-600
          checked:border-blue-600
          focus:outline-none
          transition
          duration-200
          mt-1
          align-top
          bg-no-repeat
          bg-center
          bg-contain
          float-left
          mr-2
          ${disabled ? 'cursor-default disabled:opacity-75' : 'cursor-pointer'}
        `}
        type="radio"
        id={id}
        checked={checked}
        value={value}
        disabled={disabled}
        // @ts-ignore
        onChange={handleClick}
      />
      <label
        className={`
          form-check-label
          inline-block
          text-gray-800
          select-none
          ${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'}
        `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default React.memo(RadioButton);
