import { useState } from 'react';
import Select from 'react-tailwindcss-select';

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

interface SelectFieldProps {
  name: string;
  options: Option[];
  label: string;
  value: OptionValue | null;
  handleQueryChange: (field: string, value: OptionValue) => void;
}

export type OptionValue = Option | Option[];

export const SelectField = (props: SelectFieldProps) => {
  const [animal, setAnimal] = useState<OptionValue | null>(null);
  const { name, label, options, value, handleQueryChange } = props;

  const handleChange = (currentValue?: OptionValue | null) => {
    if (currentValue) handleQueryChange(name, currentValue);
    if (currentValue) setAnimal(currentValue);
  };

  return (
    <div className='flex items-center w-[400px]'>
      <label className='w-[100px]'>{label}: </label>
      <Select
        value={value}
        onChange={handleChange}
        options={options}
        classNames={{
          menuButton: ({ isDisabled }) =>
            `w-full flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
              isDisabled
                ? 'bg-gray-200'
                : 'bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20'
            }`,
          menu: 'absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700',
          listItem: ({ isSelected }) =>
            `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
              isSelected
                ? `text-white bg-blue-500`
                : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
            }`,
        }}
        primaryColor={''}
      />
    </div>
  );
};
