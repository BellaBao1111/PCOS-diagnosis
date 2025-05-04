import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Radar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  RadialLinearScale, 
  PointElement, 
  LineElement
);

const ResultsCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
`;

const CardTitle = styled.h2`
  color: var(--text-light);
  font-size: 1.25rem;
  font-weight: 600;
`;

const ActionButton = styled.button`
  background-color: rgba(106, 76, 147, 0.15);
  color: var(--text-light);
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const ResultsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ResultsSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  border-radius: var(--border-radius);
  background-color: ${props => props.isPCOS 
    ? 'rgba(255, 89, 94, 0.15)' 
    : 'rgba(75, 192, 192, 0.15)'};
  margin-bottom: 1.5rem;
  border: 1px solid ${props => props.isPCOS 
    ? 'rgba(255, 89, 94, 0.2)' 
    : 'rgba(75, 192, 192, 0.2)'};
`;

const ResultIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  background-color: ${props => props.isPCOS 
    ? 'rgba(255, 89, 94, 0.25)' 
    : 'rgba(75, 192, 192, 0.25)'};
  color: ${props => props.isPCOS 
    ? 'var(--danger)' 
    : 'var(--success)'};
`;

const ResultDetails = styled.div`
  flex: 1;
`;

const ResultText = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.isPCOS 
    ? 'var(--danger)' 
    : 'var(--success)'};
`;

const RiskScore = styled.div`
  margin-top: 0.25rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const ChartsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: var(--border-radius);
  padding: 1rem;
  border: 1px solid var(--border-color);
  height: auto;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const ChartTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-light);
`;

const ChartLegend = styled.div`
  display: flex;
  gap: 0.75rem;
  font-size: 0.7rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--text-secondary);
`;

const LegendColor = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background-color: ${props => props.color};
`;

const ChartBox = styled.div`
  height: 200px;
  
  @media (max-width: 768px) {
    height: 180px;
  }
`;

const RiskAssessment = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: var(--border-radius);
  padding: 1rem;
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GaugeContainer = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
`;

const GaugeLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const GaugeValue = styled.div`
  position: absolute;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.value > 70 ? 'var(--danger)' : 'var(--text-light)'};
`;

const HormoneDetails = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: var(--border-radius);
  padding: 1rem;
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
`;

const HormoneStatus = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const HormoneName = styled.div`
  width: 40%;
  font-size: 0.9rem;
  color: var(--text-light);
`;

const HormoneValue = styled.div`
  width: 25%;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-light);
`;

const HormoneBarContainer = styled.div`
  flex: 1;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
`;

const HormoneBar = styled.div`
  height: 100%;
  width: ${props => props.percent}%;
  background: ${props => 
    props.status === 'high' ? 'var(--danger)' : 
    props.status === 'normal' ? 'var(--success)' : 
    'var(--warning)'};
  border-radius: 2px;
`;

const ModelInsightCard = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: var(--border-radius);
  padding: 1rem;
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
`;

const InsightTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 0.75rem;
`;

const FeatureImportanceRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FeatureName = styled.div`
  width: 40%;
  font-size: 0.9rem;
  color: var(--text-light);
`;

const ImportanceBarContainer = styled.div`
  flex: 1;
  height: 14px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
`;

const ImportanceBar = styled.div`
  height: 100%;
  width: ${props => props.percent}%;
  background-color: ${props => props.color};
  border-radius: 2px;
`;

const ImportanceValue = styled.div`
  width: 15%;
  text-align: right;
  font-size: 0.8rem;
  color: var(--text-secondary);
  padding-left: 10px;
`;

const FurtherAnalysisSectionTitle = styled.h3`
  color: var(--text-light);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
`;

const AdvancedSection = styled.div`
  margin-top: 1.5rem;
  border-top: 1px dashed var(--border-color);
  padding-top: 1.5rem;
`;

const DecisionBoundaryChart = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: var(--border-radius);
  padding: 1rem;
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
  height: 200px;
`;

const ThreeColumnsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ResultsDisplay = ({ result }) => {
  // Determine normal ranges for each hormone
  const ranges = {
    epitestosterone: { min: 0.5, max: 5.0 },
    insulin: { min: 2.0, max: 20.0 },
    androstanolone: { min: 0.2, max: 3.0 },
  };

  // Calculate status for each marker
  const getHormoneStatus = (hormone, value) => {
    if (!ranges[hormone]) return 'normal';
    if (value > ranges[hormone].max) return 'high';
    if (value < ranges[hormone].min) return 'low';
    return 'normal';
  };

  // Calculate percentage of value within normal range (or above)
  const getPercentageOfRange = (hormone, value) => {
    if (!ranges[hormone]) return 50;
    const max = ranges[hormone].max;
    // Cap at 150% of max for display purposes
    return Math.min((value / max) * 100, 150);
  };

  // Process feature importance for visualization
  const processFeatureImportance = () => {
    if (!result.featureImportance) return [];
    
    const features = Object.entries(result.featureImportance).map(([name, value]) => ({
      name, 
      value: Math.abs(value),
      sign: value >= 0 ? 'positive' : 'negative',
      color: value >= 0 ? 'rgba(75, 192, 192, 0.8)' : 'rgba(255, 89, 94, 0.8)'
    }));
    
    // Sort by absolute importance
    features.sort((a, b) => b.value - a.value);
    
    // Calculate percentage based on max value
    const maxValue = Math.max(...features.map(f => f.value));
    features.forEach(feature => {
      feature.percent = (feature.value / maxValue) * 100;
    });
    
    return features;
  };

  // Prepare data for risk score gauge chart
  const gaugeData = {
    labels: ['Risk', 'Safe'],
    datasets: [
      {
        data: [result.riskScore, 100 - result.riskScore],
        backgroundColor: [
          result.riskScore > 70 ? 'rgba(255, 89, 94, 0.8)' : 'rgba(255, 206, 86, 0.8)',
          'rgba(32, 40, 60, 0.2)'
        ],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const gaugeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  // Prepare data for hormone comparison bar chart
  const compareData = {
    labels: ['Epitestosterone', 'Insulin', 'Androstanolone'],
    datasets: [
      {
        label: 'Patient Values',
        data: [
          result.hormoneData.epitestosterone,
          result.hormoneData.insulin,
          result.hormoneData.androstanolone,
        ],
        backgroundColor: [
          'rgba(255, 89, 94, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
        borderColor: [
          'rgba(255, 89, 94, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Normal Max',
        data: [
          ranges.epitestosterone.max,
          ranges.insulin.max,
          ranges.androstanolone.max,
        ],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(75, 192, 192, 0.8)',
        borderWidth: 2,
        borderDash: [5, 5],
        type: 'line',
      },
    ],
  };

  const compareOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 10
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 9
          }
        }
      }
    },
  };

  // Prepare data for probability distribution chart
  const probabilityData = {
    labels: ['Not PCOS', 'PCOS'],
    datasets: [
      {
        data: result.probability ? [
          (result.probability[0] * 100).toFixed(1),
          (result.probability[1] * 100).toFixed(1)
        ] : [50, 50],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 89, 94, 0.7)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 89, 94, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  const probabilityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    cutout: '60%'
  };

  // Feature importance data
  const featureImportance = processFeatureImportance();

  // Prepare data for decision boundary visualization
  const decisionBoundaryData = {
    labels: Array.from({ length: 11 }, (_, i) => i * 10),
    datasets: [
      {
        label: 'Decision Boundary',
        data: Array.from({ length: 11 }, () => 50),
        borderColor: 'rgba(200, 200, 200, 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: 'Patient Score',
        data: Array.from({ length: 11 }, (_, i) => {
          // Create a bell curve centered around the patient's risk score
          const x = i * 10;
          const center = result.riskScore;
          const distance = Math.abs(x - center);
          // Sharper peak when close to decision boundary (50%)
          const distanceFromBoundary = Math.abs(center - 50);
          const width = 5 + distanceFromBoundary / 3;
          return 90 * Math.exp(-(distance * distance) / (2 * width * width));
        }),
        borderColor: result.riskScore > 50 ? 'rgba(255, 89, 94, 1)' : 'rgba(75, 192, 192, 1)',
        backgroundColor: result.riskScore > 50 ? 'rgba(255, 89, 94, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const decisionBoundaryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          display: false,
        },
        title: {
          display: true,
          text: 'Confidence',
          color: 'rgba(255, 255, 255, 0.5)',
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 10
          }
        },
        title: {
          display: true,
          text: 'Risk Score (%)',
          color: 'rgba(255, 255, 255, 0.5)',
        }
      }
    },
  };

  // Feature correlation radar chart
  const featureCorrelationData = {
    labels: ['Epitestosterone', 'Insulin', 'Androstanolone'],
    datasets: [
      {
        label: 'Current Patient',
        data: [
          // Normalize to 0-100 scale based on typical ranges
          Math.min(100, (result.hormoneData.epitestosterone / ranges.epitestosterone.max) * 100),
          Math.min(100, (result.hormoneData.insulin / ranges.insulin.max) * 100),
          Math.min(100, (result.hormoneData.androstanolone / ranges.androstanolone.max) * 100),
        ],
        backgroundColor: 'rgba(255, 89, 94, 0.2)',
        borderColor: 'rgba(255, 89, 94, 0.8)',
        pointBackgroundColor: 'rgba(255, 89, 94, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 89, 94, 1)',
        pointRadius: 4,
      },
      {
        label: 'Typical PCOS',
        data: [80, 85, 75], // Typical values for PCOS patients (higher values)
        backgroundColor: 'rgba(255, 89, 94, 0.1)',
        borderColor: 'rgba(255, 89, 94, 0.4)',
        pointBackgroundColor: 'rgba(255, 89, 94, 0.6)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 89, 94, 0.6)',
        pointRadius: 3,
        borderDash: [3, 3],
      },
      {
        label: 'Typical Non-PCOS',
        data: [50, 45, 40], // Typical values for non-PCOS patients (lower values)
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        borderColor: 'rgba(75, 192, 192, 0.4)',
        pointBackgroundColor: 'rgba(75, 192, 192, 0.6)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 0.6)',
        pointRadius: 3,
        borderDash: [3, 3],
      }
    ]
  };

  const featureCorrelationOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent',
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 9
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 10
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          boxWidth: 10,
          padding: 10,
          font: {
            size: 10
          }
        }
      }
    }
  };

  // Feature impact visualization
  const getImpactScore = (feature, value, importance) => {
    // Normalize the value relative to normal range and multiply by feature importance
    const normalRange = ranges[feature];
    const normalizedValue = (value - normalRange.min) / (normalRange.max - normalRange.min);
    // Higher than normal range gets progressively higher scores
    const scaledValue = value > normalRange.max 
      ? 1 + 0.5 * ((value / normalRange.max) - 1) 
      : normalizedValue;
    
    return scaledValue * Math.abs(importance) * 100;
  };

  const featureImpactData = {
    labels: ['Epitestosterone', 'Insulin', 'Androstanolone'],
    datasets: [
      {
        label: 'Impact on Diagnosis',
        data: result.featureImportance ? [
          getImpactScore('epitestosterone', result.hormoneData.epitestosterone, result.featureImportance.epitestosterone),
          getImpactScore('insulin', result.hormoneData.insulin, result.featureImportance.insulin),
          getImpactScore('androstanolone', result.hormoneData.androstanolone, result.featureImportance.androstanolone),
        ] : [0, 0, 0],
        backgroundColor: [
          result.featureImportance?.epitestosterone > 0 ? 'rgba(255, 89, 94, 0.7)' : 'rgba(75, 192, 192, 0.7)',
          result.featureImportance?.insulin > 0 ? 'rgba(255, 89, 94, 0.7)' : 'rgba(75, 192, 192, 0.7)',
          result.featureImportance?.androstanolone > 0 ? 'rgba(255, 89, 94, 0.7)' : 'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          result.featureImportance?.epitestosterone > 0 ? 'rgba(255, 89, 94, 1)' : 'rgba(75, 192, 192, 1)',
          result.featureImportance?.insulin > 0 ? 'rgba(255, 89, 94, 1)' : 'rgba(75, 192, 192, 1)',
          result.featureImportance?.androstanolone > 0 ? 'rgba(255, 89, 94, 1)' : 'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  const featureImpactOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 10
          }
        },
        title: {
          display: true,
          text: 'Impact Score',
          color: 'rgba(255, 255, 255, 0.5)',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 10
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            const feature = context.label.toLowerCase();
            
            let tooltip = `Impact: ${value.toFixed(1)}`;
            
            if (result.featureImportance) {
              const direction = result.featureImportance[feature] > 0 ? 'increases' : 'decreases';
              tooltip += ` (${direction} PCOS risk)`;
            }
            
            return tooltip;
          }
        }
      }
    }
  };

  return (
    <ResultsCard>
      <CardHeader>
        <CardTitle>Diagnostic Results</CardTitle>
        <ActionButton>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Export
        </ActionButton>
      </CardHeader>
      
      <ResultsContent>
        <ResultsSummary isPCOS={result.hasPCOS}>
          <ResultIcon isPCOS={result.hasPCOS}>
            {result.hasPCOS ? '!' : '✓'}
          </ResultIcon>
          <ResultDetails>
            <ResultText isPCOS={result.hasPCOS}>
              {result.hasPCOS ? 'PCOS Risk Detected' : 'No PCOS Indicators Found'}
            </ResultText>
            <RiskScore>
              Risk Score: {result.riskScore}% - {result.riskScore > 70 ? 'High' : result.riskScore > 30 ? 'Moderate' : 'Low'} Risk
            </RiskScore>
          </ResultDetails>
        </ResultsSummary>
        
        <ChartsWrapper>
          <RiskAssessment>
            <GaugeContainer>
              <Doughnut data={gaugeData} options={gaugeOptions} />
              <GaugeValue value={result.riskScore}>{result.riskScore}%</GaugeValue>
              <GaugeLabel>Risk Score</GaugeLabel>
            </GaugeContainer>
          </RiskAssessment>
          
          <ModelInsightCard>
            <InsightTitle>Model Feature Importance</InsightTitle>
            {featureImportance.map((feature) => (
              <FeatureImportanceRow key={feature.name}>
                <FeatureName>{feature.name}</FeatureName>
                <ImportanceBarContainer>
                  <ImportanceBar 
                    percent={feature.percent} 
                    color={feature.color}
                  />
                </ImportanceBarContainer>
                <ImportanceValue>{feature.sign === 'positive' ? '+' : '-'}{feature.value.toFixed(3)}</ImportanceValue>
              </FeatureImportanceRow>
            ))}
          </ModelInsightCard>
          
          <HormoneDetails>
            <InsightTitle>Hormone Analysis</InsightTitle>
            <HormoneStatus>
              <HormoneName>Epitestosterone</HormoneName>
              <HormoneValue>{result.hormoneData.epitestosterone} ng/mL</HormoneValue>
              <HormoneBarContainer>
                <HormoneBar 
                  percent={getPercentageOfRange('epitestosterone', result.hormoneData.epitestosterone)} 
                  status={getHormoneStatus('epitestosterone', result.hormoneData.epitestosterone)}
                />
              </HormoneBarContainer>
            </HormoneStatus>
            <HormoneStatus>
              <HormoneName>Insulin</HormoneName>
              <HormoneValue>{result.hormoneData.insulin} μIU/mL</HormoneValue>
              <HormoneBarContainer>
                <HormoneBar 
                  percent={getPercentageOfRange('insulin', result.hormoneData.insulin)} 
                  status={getHormoneStatus('insulin', result.hormoneData.insulin)}
                />
              </HormoneBarContainer>
            </HormoneStatus>
            <HormoneStatus>
              <HormoneName>Androstanolone</HormoneName>
              <HormoneValue>{result.hormoneData.androstanolone} ng/mL</HormoneValue>
              <HormoneBarContainer>
                <HormoneBar 
                  percent={getPercentageOfRange('androstanolone', result.hormoneData.androstanolone)} 
                  status={getHormoneStatus('androstanolone', result.hormoneData.androstanolone)}
                />
              </HormoneBarContainer>
            </HormoneStatus>
          </HormoneDetails>
          
          <ChartsGrid>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>Probability Distribution</ChartTitle>
                <ChartLegend>
                  <LegendItem>
                    <LegendColor color="rgba(75, 192, 192, 0.7)" />
                    Not PCOS
                  </LegendItem>
                  <LegendItem>
                    <LegendColor color="rgba(255, 89, 94, 0.7)" />
                    PCOS
                  </LegendItem>
                </ChartLegend>
              </ChartHeader>
              <ChartBox>
                <Doughnut data={probabilityData} options={probabilityOptions} />
              </ChartBox>
            </ChartCard>
            
            <ChartCard>
              <ChartHeader>
                <ChartTitle>Hormone Levels vs Normal Range</ChartTitle>
                <ChartLegend>
                  <LegendItem>
                    <LegendColor color="rgba(255, 89, 94, 0.7)" />
                    Patient
                  </LegendItem>
                  <LegendItem>
                    <LegendColor color="rgba(75, 192, 192, 0.8)" />
                    Normal Max
                  </LegendItem>
                </ChartLegend>
              </ChartHeader>
              <ChartBox>
                <Bar data={compareData} options={compareOptions} />
              </ChartBox>
            </ChartCard>
          </ChartsGrid>
          
          {/* Advanced Model Visualizations */}
          <AdvancedSection>
            <FurtherAnalysisSectionTitle>Advanced Model Analysis</FurtherAnalysisSectionTitle>
            
            <DecisionBoundaryChart>
              <ChartHeader>
                <ChartTitle>Decision Boundary Visualization</ChartTitle>
                <ChartLegend>
                  <LegendItem>
                    <LegendColor color="rgba(200, 200, 200, 0.5)" />
                    Boundary (50%)
                  </LegendItem>
                  <LegendItem>
                    <LegendColor color={result.riskScore > 50 ? 'rgba(255, 89, 94, 1)' : 'rgba(75, 192, 192, 1)'} />
                    Patient Score
                  </LegendItem>
                </ChartLegend>
              </ChartHeader>
              <Line data={decisionBoundaryData} options={decisionBoundaryOptions} />
            </DecisionBoundaryChart>
            
            <ThreeColumnsGrid>
              <ChartCard>
                <ChartHeader>
                  <ChartTitle>Feature Correlation Patterns</ChartTitle>
                </ChartHeader>
                <ChartBox>
                  <Radar data={featureCorrelationData} options={featureCorrelationOptions} />
                </ChartBox>
              </ChartCard>
              
              <ChartCard>
                <ChartHeader>
                  <ChartTitle>Feature Impact on Diagnosis</ChartTitle>
                </ChartHeader>
                <ChartBox>
                  <Bar data={featureImpactData} options={featureImpactOptions} />
                </ChartBox>
              </ChartCard>
              
              <ModelInsightCard>
                <InsightTitle>Key Model Insights</InsightTitle>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <p style={{ marginBottom: '10px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Decision Score:</span> {' '}
                    {result.decisionBoundaryDistance ? result.decisionBoundaryDistance.toFixed(3) : 'N/A'}
                    {result.decisionBoundaryDistance && (
                      <span> ({result.decisionBoundaryDistance > 0 ? 'Positive' : 'Negative'} distance)</span>
                    )}
                  </p>
                  <p style={{ marginBottom: '10px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Most influential factor:</span> {' '}
                    {featureImportance.length > 0 ? featureImportance[0].name : 'N/A'}
                  </p>
                  <p style={{ marginBottom: '10px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Diagnostic confidence:</span> {' '}
                    {result.probability ? Math.max(...result.probability.map(p => p * 100)).toFixed(1) + '%' : 'N/A'}
                  </p>
                  <p style={{ marginBottom: '10px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Suggested action:</span> {' '}
                    {result.riskScore > 70 ? 'Immediate follow-up testing recommended' : 
                     result.riskScore > 30 ? 'Consider additional testing' : 'Routine monitoring'}
                  </p>
                </div>
              </ModelInsightCard>
            </ThreeColumnsGrid>
          </AdvancedSection>
        </ChartsWrapper>
      </ResultsContent>
    </ResultsCard>
  );
};

export default ResultsDisplay; 