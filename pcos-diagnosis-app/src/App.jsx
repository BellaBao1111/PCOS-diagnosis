import { useState } from 'react'
import Header from './components/Header'
import DiagnosisForm from './components/DiagnosisForm'
import ResultsDisplay from './components/ResultsDisplay'
import InfoPanel from './components/InfoPanel'
import './App.css'

function App() {
  const [diagnosisResult, setDiagnosisResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    epitestosterone: '',
    insulin: '',
    androstanolone: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleDiagnose = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Call the API
      const response = await fetch('http://localhost:3001/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          epitestosterone: parseFloat(formData.epitestosterone),
          insulin: parseFloat(formData.insulin),
          androstanolone: parseFloat(formData.androstanolone),
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error connecting to diagnosis service')
      }
      
      const result = await response.json()
      
      // Set the diagnosis result
      setDiagnosisResult({
        hasPCOS: result.hasPCOS,
        riskScore: result.riskScore,
        featureImportance: result.featureImportance,
        probability: result.probability,
        decisionBoundaryDistance: result.decisionBoundaryDistance,
        hormoneData: {
          epitestosterone: parseFloat(formData.epitestosterone),
          insulin: parseFloat(formData.insulin),
          androstanolone: parseFloat(formData.androstanolone),
        }
      })
    } catch (err) {
      console.error('Diagnosis error:', err)
      setError(err.message || 'Error performing diagnosis')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <Header />
      <main className="dashboard">
        <div className="dashboard-section">
          <DiagnosisForm 
            formData={formData} 
            onChange={handleInputChange} 
            onDiagnose={handleDiagnose}
            loading={loading}
          />
          <InfoPanel />
        </div>
        <div className="dashboard-section">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          {diagnosisResult && !error && (
            <ResultsDisplay result={diagnosisResult} />
          )}
          {!diagnosisResult && !error && (
            <div className="placeholder-message">
              Enter hormone values and click "Run Diagnosis" to see results
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
