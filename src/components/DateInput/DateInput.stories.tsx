import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateInputControlled } from './DateInputControlled';
import { DateInputUncontrolled } from './DateInputUncontrolled';

const meta: Meta = {
  title: 'Components/DateInput',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

export const Controlled: Story = {
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

export const Uncontrolled: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <DateInputUncontrolled defaultValue="2024-06-01" onChange={val => {}} />
      </div>
    );
  },
}; 