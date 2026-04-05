import { useState } from 'react';
import { aiAPI } from '../api/ai.api';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorBanner from '../components/common/ErrorBanner';
import '../styles/WeeklyReport.css';
export default function WeeklyReport() {
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateReport = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await aiAPI.generateWeeklyReport();
      setReport(response.report || response.data?.report);
    } catch (err) {
      const demoReport = `Weekly Health Report (Demo)...`; // keep your full demo text
      if (err.response?.status === 429) {
        setError('Rate limit reached. Try again later.');
      } else {
        setReport(demoReport);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Weekly Health Report</h1>
      <p className="page-subtitle">Get AI-generated insights about your health</p>

      <ErrorBanner message={error} onClose={() => setError('')} />

      <div className="report-container">
        {report ? (
          <div className="report-content">
            <div className="report-text" style={{ color: '#fff', whiteSpace: 'pre-wrap' }}>
  {report}
</div>
            <Button onClick={() => setReport('')} variant="secondary" fullWidth>
              Clear Report
            </Button>
          </div>
        ) : (
          <div className="empty-state">
            <p>Generate your weekly health report to get AI-powered insights</p>
            <Button onClick={handleGenerateReport} loading={loading} fullWidth>
              📊 Generate Weekly Report
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}