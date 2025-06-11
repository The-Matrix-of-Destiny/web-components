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
    width: {
      control: 'select',
      options: ['w-40', 'w-56', 'w-72'],
      description: 'The width of the date input component (Tailwind width class)',
      defaultValue: 'w-56',
    },
    focusBgColor: {
      control: 'select',
      options: ['purple', 'green', 'blue', 'maroon'],
      description: 'Focus background color (purple, green, blue, maroon)',
      defaultValue: 'purple',
    },
    focusTextColor: {
      control: 'select',
      options: ['white', 'black', 'gray'],
      description: 'Focus text color (white, black, gray)',
      defaultValue: 'white',
    },
  },
} satisfies Meta<typeof DateInputControlled>;

export default meta;

type Story = StoryObj<typeof DateInputControlled>;

export const Default: Story = {
  args: {
    value: '2024-06-01',
    width: 'w-56',
  },
  render: (args: any) => {
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
          <h3 className="text-sm font-medium text-gray-500">Small (w-40)</h3>
          <DateInputControlled value={value} onChange={setValue} width="w-40" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Medium (Default, w-56)</h3>
          <DateInputControlled value={value} onChange={setValue} width="w-56" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Large (w-72)</h3>
          <DateInputControlled value={value} onChange={setValue} width="w-72" />
        </div>
        <div>Value: <span className="font-mono">{value}</span></div>
      </div>
    );
  },
};

export const WithValidation: Story = {
  args: {
    width: 'w-56',
  },
  render: (args: any) => {
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
    width: 'w-56',
  },
  render: (args: any) => {
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

export const FocusColors: Story = {
  render: () => {
    const [value, setValue] = useState('2024-06-01');
    const bgColors = ['purple', 'green', 'blue', 'maroon'];
    const textColors = ['white', 'black', 'gray'];
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Focus Background Colors</h3>
          {bgColors.map(bg => (
            <div key={bg} className="flex items-center gap-4">
              <span className="w-24">{bg}</span>
              <DateInputControlled value={value} onChange={setValue} focusBgColor={bg as any} />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Focus Text Colors</h3>
          {textColors.map(tc => (
            <div key={tc} className="flex items-center gap-4">
              <span className="w-24">{tc}</span>
              <DateInputControlled value={value} onChange={setValue} focusTextColor={tc as any} />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Combined Example</h3>
          <DateInputControlled value={value} onChange={setValue} focusBgColor="maroon" focusTextColor="gray" />
        </div>
        <div>Value: <span className="font-mono">{value}</span></div>
      </div>
    );
  },
}; 