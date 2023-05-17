import { useState } from 'react';
import styled from 'styled-components';
import { H1, Image, Layout } from '../../components';
import { Header, MediasSwiper } from '../components';

export function HomePage(): JSX.Element {
  const [isMediaSwiperOpen, setIsMediaSwiperOpen] = useState(false);
  const [isNavClose, setIsNavClose] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const medias = [
    { id: 1, url: '/header.jpg' },
    {
      id: 2,
      url: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    },
  ];

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Layout isNavClose={isNavClose}>
      <Header />
      <Main>
        <Title>{'Exemple Media Swiper'}</Title>
        <ImagesContainer>
          {medias.map((media, index) => (
            <ImageStyled key={media.id}>
              <Image
                layout='fill'
                objectFit='cover'
                onClick={() => {
                  setIsMediaSwiperOpen(true);
                  setIsNavClose(true);
                  setCurrentImage(index);
                }}
                src={media.url}
                alt='media'
              />
            </ImageStyled>
          ))}
        </ImagesContainer>
      </Main>
      <MediasSwiper
        isOpen={isMediaSwiperOpen}
        setIsOpen={() => {
          setIsMediaSwiperOpen(false);
          setIsNavClose(false);
        }}
        currentImage={currentImage}
        medias={medias.map((media) => media.url)}
      />
    </Layout>
  );
}
const Main = styled.div`
  height: 100vh;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Title = styled(H1)`
  text-align: center;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 50px;

  @media (max-width: 768px) {
    margin-bottom: 100px;
  }
`;

const ImageStyled = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  cursor: pointer;
  margin: 10px;

  @media (max-width: 768px) {
    width: 90vw;
  }

  img {
    border-radius: 10px;
  }
`;
