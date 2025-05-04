import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: var(--card-bg);
  color: white;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 32px;
  height: 32px;
  background-color: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.75rem;
  flex-shrink: 0;
`;

const TitleSection = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-light);
`;

const Subtitle = styled.p`
  margin-top: 0.15rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const Navigation = styled.nav`
  display: flex;
  gap: 1.25rem;
  margin-left: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.a`
  color: ${props => props.active ? 'var(--text-light)' : 'var(--text-secondary)'};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.85rem;
  position: relative;
  padding: 0.5rem 0;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: var(--primary);
    transition: width 0.2s ease;
  }
  
  &:hover {
    color: var(--text-light);
    
    &:after {
      width: 100%;
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #2c3d5a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--text-light);
  border: 2px solid var(--primary);
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoSection>
        <Logo>PC</Logo>
        <TitleSection>
          <Title>PCOS Diagnosis Dashboard</Title>
          <Subtitle>Analyze hormonal markers to predict PCOS likelihood</Subtitle>
        </TitleSection>
      </LogoSection>
      
      <Navigation>
        <NavItem href="#" active={true}>Diagnosis</NavItem>
      </Navigation>
      
      <UserSection>
        <UserAvatar>MD</UserAvatar>
      </UserSection>
    </HeaderContainer>
  );
};

export default Header; 