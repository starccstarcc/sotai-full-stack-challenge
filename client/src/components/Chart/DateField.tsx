import React, { ChangeEvent, useState } from 'react';

type DateFieldProps = {
  label: string;
  name: string;
  value: string;
  handleQueryChange: (field: string, value: string) => void;
};

export function DateField(props: DateFieldProps) {
  const { label, name, handleQueryChange, value } = props;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    handleQueryChange(name, e.currentTarget.value);
  };

  return (
    <div className='flex items-center content-center'>
      <label>{label}: </label>
      <input
        type='date'
        name={name}
        value={value}
        onChange={handleChange}
        className='w-full border p-2 mb-1 focus-visible:outline-blue-600'
      />
    </div>
  );
}
