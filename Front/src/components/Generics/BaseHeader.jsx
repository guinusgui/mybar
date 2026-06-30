export default function BaseHeader({ children, style, className }) {
  return (
    <h3
      className={`w-full m-0 text-center bg-gray-50 border-b border-gray-200/0 p-2 font-bold shadow-sm ${className}`}
      style={style}
    >
      {children}
    </h3>
  );
}
