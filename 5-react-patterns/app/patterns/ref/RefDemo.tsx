import { useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function RefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const handleSelectText = () => {
    inputRef.current?.select();
  };

  const handlePlayPause = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const handleMeasureElement = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    }
  };

  const handleToggleClass = () => {
    buttonRef.current?.classList.toggle("scale-110");
  };

  return (
    <div className="space-y-8">
      {/* Text Selection Examples */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Text Selection</h3>
        <div className="space-y-2">
          <input
            ref={inputRef}
            type="text"
            defaultValue="Try selecting this text!"
            className="border p-2 rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSelectText}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Select All Text
            </button>
          </div>
        </div>
      </section>

      {/* Element Measurement Example */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Element Measurement</h3>
        <div className="space-y-2">
          <button
            ref={buttonRef}
            onClick={handleMeasureElement}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-transform"
          >
            Measure Me
          </button>
          {position && (
            <div className="p-4 bg-gray-100 rounded">
              <p>X: {position.x.toFixed(2)}</p>
              <p>Y: {position.y.toFixed(2)}</p>
              <p>Width: {position.width.toFixed(2)}</p>
              <p>Height: {position.height.toFixed(2)}</p>
            </div>
          )}
        </div>
      </section>

      {/* Class Toggle Example */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Class Toggle</h3>
        <button
          ref={buttonRef}
          onClick={handleToggleClass}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-transform"
        >
          Toggle Scale
        </button>
      </section>
    </div>
  );
}
