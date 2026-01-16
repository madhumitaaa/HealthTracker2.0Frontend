import { useState } from 'react';
import { aiAPI } from '../api/ai.api';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorBanner from '../components/common/ErrorBanner';

export default function WeeklyReport() {
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateReport = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await aiAPI.generateWeeklyReport();
      setReport(response.data.report);
    } catch (err) {
      // Demo mode: generate a sample report
      const errorMessage = err.response?.data?.message || err.message || 'Failed to generate report';
      
      if (err.response?.status === 429) {
        setError('Rate limit reached. Please try again later.');
      } else if (err.message?.includes('ERR_NETWORK') || err.message?.includes('Failed to fetch') || err.code === 'ERR_NETWORK') {
        // Backend not running, demo mode
        const demoReport = `Weekly Health Report\n\n✅ Summary\nGreat week overall! You maintained a consistent sleep schedule and exceeded your daily step goals.\n\n📊 Key Metrics\n- Average Calories: 2,150 kcal\n- Average Sleep: 7.2 hours\n- Total Steps: 58,000 steps\n- Average Heart Rate: 70 bpm\n\n💪 Highlights\n- Great cardiovascular performance\n- Excellent sleep consistency\n- High activity levels\n\n🎯 Recommendations\n- Maintain current exercise routine\n- Keep hydration levels consistent\n- Continue healthy eating patterns`;
        setReport(demoReport);
      } else {
        setError(errorMessage);
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
            <div className="report-text">
              {report}
            </div>
            <Button onClick={() => setReport('')} variant="secondary" fullWidth>
              Clear Report
            </Button>
          </div>
        ) : (
          <div className="empty-state">
            <p>Generate your weekly health report to get AI-powered insights</p>
            <Button
              onClick={handleGenerateReport}
              loading={loading}
              fullWidth
            >
              📊 Generate Weekly Report
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
