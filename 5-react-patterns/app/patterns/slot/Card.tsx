interface CardProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}

export function Card({ header, body, footer }: CardProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">{header}</div>
      <div className="p-4">{body}</div>
      <div className="p-4 bg-gray-50 border-t border-gray-200">{footer}</div>
    </div>
  );
}
