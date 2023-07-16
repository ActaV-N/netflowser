import styled from '@emotion/styled';
import { BsTools } from 'react-icons/bs';

const BuildingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  font-size: 48px;

  p {
    font-size: 14px;
  }
`;

function Building() {
  return (
    <BuildingContainer>
      <BsTools />
      <p>개발중입니다</p>
    </BuildingContainer>
  );
}

export { Building };
