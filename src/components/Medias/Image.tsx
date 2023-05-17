import NextImage from 'next/image';
import styled from 'styled-components';

type ImageProps = React.ComponentProps<typeof NextImage> & {
  className?: string;
};

export function Image(props: ImageProps): JSX.Element {
  const { className } = props;

  return (
    <Main>
      <NextImage
        loader={(resolverProps) => {
          return `${resolverProps.src}?w=${resolverProps.width}&q=20`;
        }}
        objectFit='contain'
        className={className}
        {...props}
      />
    </Main>
  );
}

const Main = styled.div`
  img {
    /* border-radius: 8px; */
  }
`;
