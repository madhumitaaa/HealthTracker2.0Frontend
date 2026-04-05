import { useState, useEffect, useCallback } from 'react';
import '../../styles/ErrorBanner.css';

export default function ErrorBanner({
  message,
  onClose,
  autoClose = true,
  type = 'error', // error | success | info
}) {
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
    <div
      className={`error-banner error-${type}`}
      role="alert"
    >
      <span className="error-message">{message}</span>

      <button
        onClick={handleClose}
        className="error-close"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}