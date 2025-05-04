import styled from 'styled-components';

const InfoContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.25rem;
  margin-top: 1rem;
  border: 1px solid var(--border-color);
  height: auto;
`;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const InfoTitle = styled.h3`
  color: var(--text-light);
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background-color: rgba(25, 130, 196, 0.15);
  color: var(--secondary);
  border-radius: 4px;
  font-size: 0.8rem;
`;

const InfoText = styled.p`
  margin-bottom: 0.75rem;
  line-height: 1.5;
  color: var(--text-secondary);
  font-size: 0.85rem;
`;

const KeyPointsContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: var(--border-radius);
  padding: 0.75rem;
  margin: 0.75rem 0;
`;

const KeyPointsTitle = styled.div`
  color: var(--text-light);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
`;

const KeyPointsList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
`;

const KeyPoint = styled.li`
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    color: var(--text-light);
  }
`;

const ButtonLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--secondary);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const InfoPanel = () => {
  return (
    <InfoContainer>
      <InfoHeader>
        <InfoTitle>
          <InfoIcon>ℹ️</InfoIcon>
          About PCOS Diagnosis
        </InfoTitle>
      </InfoHeader>
      
      <InfoText>
        Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder affecting reproductive-age women.
        This tool analyzes three key hormonal markers to assess PCOS risk.
      </InfoText>
      
      <KeyPointsContainer>
        <KeyPointsTitle>Key Diagnostic Indicators</KeyPointsTitle>
        <KeyPointsList>
          <KeyPoint>
            <strong>Epitestosterone:</strong> Elevated levels ({'>'}5.0 ng/mL) may indicate PCOS
          </KeyPoint>
          <KeyPoint>
            <strong>Insulin:</strong> Higher insulin levels ({'>'}20.0 μIU/mL) suggest insulin resistance, common in PCOS
          </KeyPoint>
          <KeyPoint>
            <strong>Androstanolone:</strong> Elevated levels ({'>'}3.0 ng/mL) are often observed in PCOS patients
          </KeyPoint>
        </KeyPointsList>
      </KeyPointsContainer>
      
      <InfoText>
        This diagnostic tool combines these key hormone markers to calculate a PCOS risk score.
        For comprehensive diagnosis, consult with a healthcare professional.
      </InfoText>
      
      <ButtonLink href="#">
        View clinical guidelines
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </ButtonLink>
    </InfoContainer>
  );
};

export default InfoPanel; 