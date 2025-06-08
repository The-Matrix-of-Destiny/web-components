import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './index';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Card',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a basic card with some content.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Custom Card</CardTitle>
      </CardHeader>
      <CardContent className="bg-gray-50 rounded-md p-4">
        <p>This card has custom styles applied to its content.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </CardFooter>
    </Card>
  ),
}; 