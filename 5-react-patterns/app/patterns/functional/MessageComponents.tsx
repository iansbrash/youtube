interface MessageProps {
  message: string;
}

export function FancyMessage({ message }: MessageProps) {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}

export function AlertMessage({ message }: MessageProps) {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      <p className="font-medium">⚠️ {message}</p>
    </div>
  );
}

export function InfoMessage({ message }: MessageProps) {
  return (
    <div className="p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
      <p className="font-medium">ℹ️ {message}</p>
    </div>
  );
}

export function SuccessMessage({ message }: MessageProps) {
  return (
    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
      <p className="font-medium">✅ {message}</p>
    </div>
  );
}
