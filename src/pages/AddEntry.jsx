
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { entriesAPI } from '../api/entries.api';
import Button from '../components/common/Button';
import ErrorBanner from '../components/common/ErrorBanner';

export default function AddEntry() {

  const { entryId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    calories: '',
    sleep: '',
    steps: '',
    heartRate: '',
    mood: 'neutral',
    waterIntake: '',
    symptoms: [],
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const symptomsList = [
    'Headache',
    'Fatigue',
    'Dizziness',
    'Nausea',
    'Cough'
  ];

  useEffect(() => {

    if (!entryId) return;

    const fetchEntry = async () => {

      try {

        setLoading(true);

        const res = await entriesAPI.getById(entryId);

        // ✅ FIX
        const entry = res.data.data;

        setFormData({
          date: new Date(entry.date).toISOString().split('T')[0],
          calories: entry.calories || '',
          sleep: entry.sleep || '',
          steps: entry.steps || '',
          heartRate: entry.heartRate || '',
          mood: entry.mood || 'neutral',
          waterIntake: entry.waterIntake || '',
          symptoms: entry.symptoms || [],
          notes: entry.notes || ''
        });

      } catch (err) {

        setError(err.response?.data?.message || 'Failed to fetch entry');

      } finally {

        setLoading(false);

      }
    };

    fetchEntry();

  }, [entryId]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSymptomToggle = (symptom) => {

    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');
    setLoading(true);

    const payload = {
      ...formData,
      date: new Date(formData.date).toISOString()
    };

    try {

      if (entryId) {
        await entriesAPI.update(entryId, payload);
      } else {
        await entriesAPI.create(payload);
      }

      navigate('/history');

    } catch (err) {

      setError(err.response?.data?.message || 'Failed to save entry');

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async () => {

    if (!entryId) return;

    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    try {

      setLoading(true);

      await entriesAPI.delete(entryId);

      navigate('/history');

    } catch (err) {

      setError(err.response?.data?.message || 'Failed to delete entry');

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="page-container">

      <h1>{entryId ? 'Edit Entry' : 'Add New Entry'}</h1>
      <p className="page-subtitle">Track your health today</p>

      <ErrorBanner message={error} onClose={() => setError('')} />

      <form onSubmit={handleSubmit} className="form-layout">

        <div className="form-section">

          <h3>📅 Date & Stats</h3>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Calories</label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Sleep (hours)</label>
              <input
                type="number"
                step="0.5"
                name="sleep"
                value={formData.sleep}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Steps</label>
              <input
                type="number"
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Heart Rate</label>
              <input
                type="number"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

          </div>

        </div>

        <div className="form-section">

          <h3>😊 Mood & Hydration</h3>

          <div className="form-group">
            <label>Mood</label>

            <select
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="poor">Poor</option>
              <option value="neutral">Neutral</option>
              <option value="good">Good</option>
              <option value="excellent">Excellent</option>
            </select>

          </div>

          <div className="form-group">
            <label>Water Intake (cups)</label>
            <input
              type="number"
              name="waterIntake"
              value={formData.waterIntake}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

        </div>

        <div className="form-section">

          <h3>🏥 Symptoms</h3>

          <div className="chips-group">

            {symptomsList.map(s => (

              <button
                key={s}
                type="button"
                className={`chip ${formData.symptoms.includes(s) ? 'chip-active' : ''}`}
                onClick={() => handleSymptomToggle(s)}
                disabled={loading}
              >
                {s}
              </button>

            ))}

          </div>

        </div>

        <div className="form-section">

          <h3>📝 Notes</h3>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Additional notes..."
            disabled={loading}
          />

        </div>

        <div className="form-actions">

          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/history')}
            disabled={loading}
          >
            Cancel
          </Button>

          {entryId && (
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </Button>
          )}

          <Button type="submit" loading={loading}>
            {entryId ? 'Update Entry' : 'Save Entry'}
          </Button>

        </div>

      </form>

    </div>
  );
}
