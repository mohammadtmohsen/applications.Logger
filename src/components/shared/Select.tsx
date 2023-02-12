import React, { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { classNames } from '../../utils/HelperFunctions';
import { BsCheck, BsChevronCompactDown } from "react-icons/bs";


type Option = {
  value: React.Key;
  label: string;
};
type SelectProps = {
  options: Array<Option>;
  label?: JSX.Element;
  value?: React.Key;
  preValue?: string;
  disabled?: boolean;
  onChange: (value: Option | undefined) => void;
  className?: string;
  placeholder?: string;
  id?: string;
  textStyle?: React.CSSProperties;
};
export const Select: React.FC<SelectProps> = React.memo(
  ({
    options,
    label,
    disabled = false,
    value,
    preValue,
    className,
    placeholder,
    onChange,
    textStyle,
    id,
  }) => {
    const [selectedValue, setSelectedValue] = useState<Option | undefined>({
      value: '',
      label: '',
    });
    useEffect(() => {
      if (value != undefined) {
        setSelectedValue(options.find(option => option.value === value));
      }
    }, [value]);

    return (
      <Listbox
        value={selectedValue?.value}
        disabled={disabled}
        onChange={(selected) => {
          const valueAfterSelect =
            selected === selectedValue?.value
              ? undefined
              : options?.find((option) => option?.value === selected);
          setSelectedValue(valueAfterSelect);
          onChange(valueAfterSelect);
        }}
      >
        {({ open }) => (
          <>
            {label && (
              <Listbox.Label className="block text-sm font-medium text-white">
                {label}
              </Listbox.Label>
            )}
            <div className="relative">
              <Listbox.Button
                disabled={disabled}
                className={
                  className
                    ? className
                    : " relative w-full border rounded-md shadow-sm border-gray-300 focus:border-primary-blue focus:ring-primary-blue pl-3 pr-10 xpy-2 text-left cursor-default focus:outline-none sm:text-sm h-10"
                }
              >
                <span
                  className="block align-middle truncate text-primary-dark text-sm"
                  style={textStyle}
                >
                  {preValue ? `${preValue}: ` : ""}
                  {selectedValue?.label ? (
                    selectedValue?.label
                  ) : (
                    <span className="text-gray-400 text-lg truncate">
                      {placeholder ? placeholder : "All"}
                    </span>
                  )}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <BsChevronCompactDown
                    style={textStyle}
                    className="h-5 w-5 text-primary-dark"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  id={id}
                  className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  {options?.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "text-white bg-primary-blue"
                            : "text-primary-dark",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={option?.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {option.label}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-primary-blue",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <BsCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    );
  }
);
