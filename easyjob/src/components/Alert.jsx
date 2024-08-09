export function Alert({ message }) {
  return (
    <div className="bg-alert border border-alert_border text-alert_text px-4 py-3 rounded relative mb-2 text-center">
      <span className="text-red-500">{message}</span>
    </div>
  );
}
