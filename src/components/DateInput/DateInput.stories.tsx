import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateInputControlled } from './DateInputControlled';
import { DateInputUncontrolled } from './DateInputUncontrolled';

const meta: Meta = {
  title: 'Components/DateInput',
  tags: ['autodocs'],
  component: DateInputControlled,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The date value in YYYY-MM-DD format',
    },
    onChange: {
      description: 'Callback fired when the date changes',
    },
    formSubmitted: {
      control: 'boolean',
      description: 'Whether the form has been submitted (for validation)',
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('2024-06-01');
    return (
      <div className="space-y-4">
        <DateInputControlled value={value} onChange={setValue} />
        <div>Value: <span className="font-mono">{value}</span></div>
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    return (
      <div className="space-y-4">
        <DateInputControlled 
          value={value} 
          onChange={setValue} 
          formSubmitted={formSubmitted} 
        />
        <div>Value: <span className="font-mono">{value}</span></div>
        <button 
          onClick={() => setFormSubmitted(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Form
        </button>
      </div>
    );
  },
};

export const InvalidDate: Story = {
  render: () => {
    const [value, setValue] = useState('invalid-date');
    return (
      <div className="space-y-4">
        <DateInputControlled value={value} onChange={setValue} />
        <div>Value: <span className="font-mono">{value}</span></div>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <DateInputUncontrolled defaultValue="2024-06-01" onChange={val => {}} />
      </div>
    );
  },
}; 