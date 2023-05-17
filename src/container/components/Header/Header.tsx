import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H1, Image, P1 } from '../../../components';

interface HeaderProps {
  className?: string;
}

export function Header(props: HeaderProps): JSX.Element {
  const { className } = props;
  const { t } = useTranslation();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  }, []);

  return (
    <Main className={className}>
      <ImageBackground>
        <Image layout='fill' objectFit='cover' src='/header.jpg' alt='header' />
      </ImageBackground>
      <Title $isAnimated={isAnimated} white>
        {t('home.name')}
      </Title>
      <SubTitle $isAnimated={isAnimated} white>
        {t('home.subTitle')}
      </SubTitle>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  z-index: 0;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Title = styled(H1)<{ $isAnimated: boolean }>`
  font-size: 4rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  transform: ${({ $isAnimated }) =>
    $isAnimated ? 'translateY(0)' : 'translateY(-150px)'};
  opacity: ${({ $isAnimated }) => ($isAnimated ? 1 : 0)};
  transition: all 1s ease-in-out;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const SubTitle = styled(P1)<{ $isAnimated: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  transform: ${({ $isAnimated }) =>
    $isAnimated ? 'translateY(0)' : 'translateY(-100px)'};
  opacity: ${({ $isAnimated }) => ($isAnimated ? 1 : 0)};
  transition: all 1s ease-in-out;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
