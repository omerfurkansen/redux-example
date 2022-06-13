import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Colors from '../../common/colors';
import { MovieCardProps } from '../../types';

const CardItem = styled.div`
  background: ${Colors.themeColorSecondary};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardTop = styled.div`
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
        <CardTop>
          <img src={data.Poster} alt={data.Title} />
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
