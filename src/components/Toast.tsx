import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface Props {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Toast({ message, isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-right duration-300">
      <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3">
        <CheckCircle size={20} />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}