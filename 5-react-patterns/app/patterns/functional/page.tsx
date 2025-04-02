import { Wrapper } from "./Wrapper";
import {
  FancyMessage,
  AlertMessage,
  InfoMessage,
  SuccessMessage,
} from "./MessageComponents";

export default function FunctionalPattern() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Functional Components as Props
      </h1>

      <div className="prose max-w-none mb-8">
        <p className="text-gray-600">
          This pattern allows you to pass React components as props, enabling
          flexible and reusable layouts while maintaining full control over the
          rendering of child components.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Fancy Message Example */}
        <Wrapper component={FancyMessage} title="Fancy Messages" />

        {/* Alert Message Example */}
        <Wrapper component={AlertMessage} title="Alert Messages" />

        {/* Info Message Example */}
        <Wrapper component={InfoMessage} title="Info Messages" />

        {/* Success Message Example */}
        <Wrapper component={SuccessMessage} title="Success Messages" />
      </div>
    </div>
  );
}
