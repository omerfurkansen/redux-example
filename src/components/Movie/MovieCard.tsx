import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Colors from 'common/colors';
import { MovieCardProps } from 'types';

const CardItem = styled.div`
  background: ${Colors.themeColorSecondary};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardTop = styled.div<({ image: string })>`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.fontColorPrimary};
  position: relative;
`;

const BackgroundImage = styled.div<{ image: string }>`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  background: url(${({ image }) => image});
  opacity: 0.3;
  filter: blur(4px);
`;

const CardImage = styled.img`
  position: absolute;
  object-fit: cover;
  height: 100%;
  max-width: 100%;
  z-index: 10;
`;

const CardBottom = styled.div`
  padding: 20px;
`;

const CardInfo = styled.div`
  color: ${Colors.fontColorPrimary};

  h4 {
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;

export default function MovieCard({ data }: MovieCardProps) {
  return (
    <CardItem>
      <Link to={`/movie/${data.imdbID}`}>
        <CardTop image={data.Poster}>
          <BackgroundImage image={data.Poster} />
          <CardImage
            src={data.Poster}
            alt={data.Title}
          />
        </CardTop>
        <CardBottom>
          <CardInfo>
            <h4>{data.Title}</h4>
            <p>{data.Year}</p>
          </CardInfo>
        </CardBottom>
      </Link>
    </CardItem>
  );
}
