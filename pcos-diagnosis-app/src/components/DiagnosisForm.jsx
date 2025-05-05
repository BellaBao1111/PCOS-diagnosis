import styled from 'styled-components';

const FormCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
`;

const FormTitle = styled.h2`
  color: var(--text-light);
  font-size: 1.25rem;
  font-weight: 600;
`;

const FormActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FormBadge = styled.span`
  background-color: rgba(106, 76, 147, 0.15);
  color: var(--text-light);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
`;

const FormContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DiagnosticForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1.25rem;
`;

const Tab = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: ${props => props.active === 'true' ? 'var(--text-light)' : 'var(--text-secondary)'};
  font-weight: 500;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: ${props => props.active === 'true' ? '100%' : '0'};
    height: 2px;
    background-color: var(--primary);
  }
`;

const FieldsContainer = styled.div`
  flex: 1;
`;

const DiagnosisButton = styled.button`
  background-color: var(--primary);
  color: white;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-end;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: ${props => props.disabled ? 0.7 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    background-color: #5a3d82;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(106, 76, 147, 0.3);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LabelText = styled.span`
  display: flex;
  align-items: center;
`;

const UnitText = styled.span`
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 400;
`;

const FormControl = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.2s;
  margin-top: 0.25rem;
  height: 48px;

  &:focus {
    border-color: var(--secondary);
    outline: none;
    box-shadow: 0 0 0 2px rgba(25, 130, 196, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const HelpText = styled.small`
  display: block;
  margin-top: 0.25rem;
  color: var(--text-secondary);
  font-size: 0.75rem;
`;

const HelpIcon = styled.span`
  width: 18px;
  height: 18px;
  background-color: rgba(25, 130, 196, 0.15);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  margin-left: 0.5rem;
  color: var(--secondary);
  cursor: help;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(25, 130, 196, 0.3);
  }
`;

const Loading = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const DiagnosisForm = ({ formData, onChange, onDiagnose, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDiagnose();
  };

  return (
    <FormCard>
      <FormHeader>
        <FormTitle>Patient Hormone Profile</FormTitle>
        <FormActions>
          <FormBadge>Required fields</FormBadge>
        </FormActions>
      </FormHeader>
      
      <FormContent>
        <TabsContainer>
          <Tab active="true">Hormone Markers</Tab>
          <Tab>Patient Details</Tab>
        </TabsContainer>
        
        <DiagnosticForm onSubmit={handleSubmit}>
          <FieldsContainer>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="free_testosterone">
                  <LabelText>
                    Testosterone
                  </LabelText>
                  <UnitText>(pg/mL)</UnitText>
                </FormLabel>
                <FormControl
                  type="number"
                  id="free_testosterone"
                  name="free_testosterone"
                  placeholder="Enter level"
                  value={formData.free_testosterone}
                  onChange={onChange}
                  step="0.1"
                  min="0"
                  required
                  disabled={loading}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="dheas">
                  <LabelText>
                    DHEAS
                  </LabelText>
                  <UnitText>(µg/dL)</UnitText>
                </FormLabel>
                <FormControl
                  type="number"
                  id="dheas"
                  name="dheas"
                  placeholder="Enter level"
                  value={formData.dheas}
                  onChange={onChange}
                  step="0.1"
                  min="0"
                  required
                  disabled={loading}
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup className="full-width">
                <FormLabel htmlFor="fsh">
                  <LabelText>
                    FSH
                  </LabelText>
                  <UnitText>(mIU/mL)</UnitText>
                </FormLabel>
                <FormControl
                  type="number"
                  id="fsh"
                  name="fsh"
                  placeholder="Enter level"
                  value={formData.fsh}
                  onChange={onChange}
                  step="0.1"
                  min="0"
                  required
                  disabled={loading}
                />
              </FormGroup>
            </FormRow>
          </FieldsContainer>

          <DiagnosisButton type="submit" disabled={loading}>
            {loading ? (
              <>
                Processing
                <Loading />
              </>
            ) : (
              <>
                Run Diagnosis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </DiagnosisButton>
        </DiagnosticForm>
      </FormContent>
    </FormCard>
  );
};

export default DiagnosisForm; 