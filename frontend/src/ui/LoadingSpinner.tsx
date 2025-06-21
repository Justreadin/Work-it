import React from "react";

interface SpinnerProps {
  size?: number; // diameter in pixels
  color?: string; // Tailwind color class
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40, color = "text-blue-500" }) => {
  const spinnerSize = `${size}px`;

  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent ${color}`}
      style={{ width: spinnerSize, height: spinnerSize }}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;



interface SectionLoaderProps {
  message?: string;
  height?: string; // Tailwind height class e.g. 'h-40'
}

export const SectionLoader: React.FC<SectionLoaderProps> = ({
  message = "Loading...",
  height = "h-40",
}) => {
  return (
    <div
      className={`w-full ${height} flex flex-col items-center justify-center bg-gray-100 rounded-md`}
    >
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </div>
  );
};



