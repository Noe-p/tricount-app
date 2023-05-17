import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../themes';

interface TextsProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  className?: string;
  white?: boolean;
}

interface AnchorProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  className?: string;
  white?: boolean;
  href: string;
  target?: string;
}

export function H1(props: TextsProps): JSX.Element {
  const { children, className, white } = props;
  return (
    <H1Styled $white={white} {...props} className={className}>
      {children}
    </H1Styled>
  );
}

export function H2(props: TextsProps): JSX.Element {
  const { children, className, white } = props;
  return (
    <H2Styled $white={white} {...props} className={className}>
      {children}
    </H2Styled>
  );
}

export function H3(props: TextsProps): JSX.Element {
  const { children, className, white } = props;
  return (
    <H3Styled $white={white} {...props} className={className}>
      {children}
    </H3Styled>
  );
}

export function P1(props: TextsProps): JSX.Element {
  const { children, className, white } = props;
  return (
    <P1Styled $white={white} {...props} className={className}>
      {children}
    </P1Styled>
  );
}

export function P2(props: TextsProps): JSX.Element {
  const { children, className, white } = props;
  return (
    <P2Styled $white={white} {...props} className={className}>
      {children}
    </P2Styled>
  );
}

export function Label(props: TextsProps): JSX.Element {
  const { children, className } = props;
  return (
    <LabelStyled {...props} className={className}>
      {children}
    </LabelStyled>
  );
}

export function ErrorMessage(props: TextsProps): JSX.Element {
  const { children, className } = props;
  return (
    <ErrorMessageStyled {...props} className={className}>
      {children}
    </ErrorMessageStyled>
  );
}

export function Link(props: AnchorProps): JSX.Element {
  const { children, className } = props;
  return (
    <LinkStyled {...props} className={className}>
      {children}
    </LinkStyled>
  );
}

const H1Styled = styled.h1`
  line-height: 1;
  margin: 0;
  color: ${({ $white }: { $white?: boolean }) =>
    $white ? 'white' : COLORS.BLACK};
`;

const H2Styled = styled.h2`
  line-height: 1;
  margin: 0;
  color: ${({ $white }: { $white?: boolean }) =>
    $white ? 'white' : COLORS.BLACK};
`;

const H3Styled = styled.h3`
  line-height: 1;
  margin: 0;
  color: ${({ $white }: { $white?: boolean }) =>
    $white ? 'white' : COLORS.BLACK};
`;

const P1Styled = styled.p`
  margin: 0;
  color: ${({ $white }: { $white?: boolean }) =>
    $white ? 'white' : COLORS.BLACK};
  font-family: 'Hanken Grotesk';
  font-size: 16px;
`;

const P2Styled = styled(P1)`
  margin: 0;
  font-size: 14px;
  color: ${({ $white }: { $white?: boolean }) =>
    $white ? 'white' : COLORS.BLACK};
`;

const LabelStyled = styled(P1)`
  font-weight: bold;
`;

const ErrorMessageStyled = styled(P1)`
  color: red;
`;

const LinkStyled = styled.a`
  margin: 0;
  color: ${COLORS.BLACK};
  &:hover {
    cursor: pointer;
  }
`;
