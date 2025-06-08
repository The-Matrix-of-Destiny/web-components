import React from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent, CardFooter } from './index'

export const ExamplePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Component Library Examples</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="space-x-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
          <div className="mt-4 space-x-4">
            <Button size="sm">Small Button</Button>
            <Button size="md">Medium Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
          <div className="mt-4">
            <Button isLoading>Loading Button</Button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is a basic card with some content.</p>
              </CardContent>
              <CardFooter>
                <Button variant="primary">Action</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Custom Styles</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-50 rounded-md p-4">
                <p>This card has custom styles applied to its content.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button variant="primary">Confirm</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
} 