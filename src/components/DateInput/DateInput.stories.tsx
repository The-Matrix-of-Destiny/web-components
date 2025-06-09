import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateInputControlled } from './DateInputControlled';
import { DateInputUncontrolled } from './DateInputUncontrolled';

const meta = {
  title: 'Components/DateInput',
  tags: ['autodocs'],
  component: DateInputControlled,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A controlled date input component that allows users to input dates in MM/DD/YYYY format with validation and size customization.',
      },
    },
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the date input component',
      defaultValue: 'md',
    },
  },
} satisfies Meta<typeof DateInputControlled>;

export default meta;

type Story = StoryObj<typeof DateInputControlled>;

export const Default: Story = {
  args: {
    value: '2024-06-01',
    size: 'md',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="space-y-4">
        <DateInputControlled {...args} value={value} onChange={setValue} />
        <div>Value: <span className="font-mono">{value}</span></div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState('2024-06-01');
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Small</h3>
          <DateInputControlled value={value} onChange={setValue} size="sm" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Medium (Default)</h3>
          <DateInputControlled value={value} onChange={setValue} size="md" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Large</h3>
          <DateInputControlled value={value} onChange={setValue} size="lg" />
        </div>
        <div>Value: <span className="font-mono">{value}</span></div>
      </div>
    );
  },
};

export const WithValidation: Story = {
  args: {
    size: 'md',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    return (
      <div className="space-y-4">
        <DateInputControlled 
          {...args}
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
  args: {
    value: 'invalid-date',
    size: 'md',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="space-y-4">
        <DateInputControlled {...args} value={value} onChange={setValue} />
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