import Link from "next/link";
import { Card } from "./Card";
import { MyButton } from "./MyButton";

export default function SlotPattern() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        React Slot Patterns
      </h1>

      {/* Basic Slot Pattern */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          1. Basic Slot Pattern
        </h2>
        <p className="text-gray-600">
          The slot pattern allows for flexible layouts by passing named elements
          as props.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card
            header={<h3 className="text-lg font-semibold">User Profile</h3>}
            body={
              <div className="space-y-2">
                <p className="text-gray-600">Name: John Doe</p>
                <p className="text-gray-600">Email: john@example.com</p>
              </div>
            }
            footer={<MyButton variant="primary">Edit Profile</MyButton>}
          />

          <Card
            header={<h3 className="text-lg font-semibold">Settings</h3>}
            body={
              <div className="space-y-2">
                <p className="text-gray-600">Theme: Dark</p>
                <p className="text-gray-600">Notifications: Enabled</p>
              </div>
            }
            footer={<MyButton variant="secondary">Save Changes</MyButton>}
          />
        </div>
      </section>

      {/* Radix UI Slot Pattern */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          2. Radix UI Slot Pattern
        </h2>
        <p className="text-gray-600">
          The Radix UI slot pattern allows components to change their underlying
          element while maintaining their styling.
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <MyButton>Regular Button</MyButton>
            <MyButton variant="secondary">Secondary Button</MyButton>
            <MyButton variant="outline">Outline Button</MyButton>
          </div>

          <div className="flex gap-4">
            <MyButton asChild>
              <Link href="/dashboard">Button as Link</Link>
            </MyButton>
            <MyButton asChild variant="secondary">
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Button as External Link
              </a>
            </MyButton>
          </div>
        </div>
      </section>
    </div>
  );
}
