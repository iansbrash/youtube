"use client";

import { BadButton } from "@/components/0-bad-component";
import { Button, SpecialButton } from "@/components/1-component-props";
import { Button as Button2 } from "@/components/2-forward-ref";
import { Button as Button3 } from "@/components/3-cn";
import { Button as Button4 } from "@/components/4-variants";
import { useRef } from "react";

export default function ButtonsPage() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="p-8 flex flex-col gap-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Bad Component Example</h2>
        <div className="space-y-2">
          <BadButton
            variant="primary"
            onClick={() => alert("Primary Bad Button")}
          >
            Primary Bad Button
          </BadButton>
          <BadButton variant="secondary" disabled>
            Secondary Disabled Bad Button
          </BadButton>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Component Props Examples</h2>
        <div className="space-x-2">
          <Button
            customProp="basic"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Basic Button
          </Button>
          <SpecialButton
            customProp="special"
            specialProp={true}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Special Button
          </SpecialButton>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Forward Ref Example</h2>
        <Button2
          ref={buttonRef}
          customProp="forwarded"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Forwarded Ref Button
        </Button2>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">CN Utility Example</h2>
        <Button3 customProp="cn" className="hover:bg-teal-600">
          CN Button
        </Button3>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Variants Example</h2>
        <div className="space-x-2">
          <Button4>Default Button</Button4>
          <Button4 variant="destructive" size="sm">
            Small Destructive Button
          </Button4>
        </div>
      </section>
    </div>
  );
}
