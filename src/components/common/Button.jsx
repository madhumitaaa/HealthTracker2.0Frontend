import '../../styles/Button.css';

export default function Button({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  type = 'button',
  fullWidth = false,
  loading = false 
}) {
  return (
    <button
      className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${loading ? 'btn-loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? '...' : children}
    </button>
  );
}
