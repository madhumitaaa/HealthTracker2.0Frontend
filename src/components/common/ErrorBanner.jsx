import { useState, useEffect, useCallback } from 'react';

export default function ErrorBanner({ message, onClose, autoClose = true }) {
  const [visible, setVisible] = useState(!!message);

  const handleClose = useCallback(() => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!message) return;
    
    setVisible(true);
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, autoClose, handleClose]);

  if (!visible || !message) return null;

  return (
    <div className="error-banner">
      <span>{message}</span>
      <button onClick={handleClose} className="error-close">
        ×
      </button>
    </div>
  );
}