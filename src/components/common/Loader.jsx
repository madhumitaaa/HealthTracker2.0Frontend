import '../../styles/Loader.css';

export default function Loader({ text = 'Loading...', fullScreen = false }) {
  return (
    <div className={`loader-container ${fullScreen ? 'loader-full' : ''}`}>
      <div className="loader-spinner" aria-hidden="true"></div>
      <p className="loader-text" role="status">{text}</p>
    </div>
  );
}