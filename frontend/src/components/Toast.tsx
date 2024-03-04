import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onclose: () => void;
};

const Toast = ({ message, type, onclose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onclose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onclose]);

  const styles =
    type === "success"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="font-semibold text-lg">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
