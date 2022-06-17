import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaUsers, FaClock, FaCalendar } from 'react-icons/fa';
import {
  fetchAsyncContentDetail,
  removeSelectedContent,
  selectSelectedContent,
  selectStatus,
} from 'features/movies/movieSlice';
import loadingIcon from 'images/loading.svg';
import Colors from 'common/colors';
import { useAppDispatch, useAppSelector } from 'features/hooks';

const MovieSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 40px 0;
  color: ${Colors.fontColorPrimary};
  font-weight: 400;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
  }
`;

const MovieRating = styled.div`
  display: flex;
  padding-left: 3px;
  margin-top: 20px;
  color: ${Colors.fontColorSecondary};

  span {
    margin-right: 20px;
  }
`;

const MovieTitle = styled.div`
  font-size: 40px;
  color: ${Colors.fontColorPrimary};
`;

const MoviePlot = styled.div`
  margin-top: 20px;
  line-height: 1.8rem;
`;

const SectionLeft = styled.div`
  margin-right: 40px;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const SectionRight = styled.div`
  margin-left: 40px;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const MovieInfo = styled.div`
  div span:first-child {
    display: inline-block;
    padding: 10px 0;
    color: ${Colors.fontColorPrimary};
    font-weight: 600;
    width: 100px;
  }

  div span {
    color: ${Colors.fontColorSecondary};
  }
`;

export default function MovieDetail() {
  const { imdbID } = useParams();
  const dispatch = useAppDispatch();
  const selectedContent = useAppSelector(selectSelectedContent);
  const status = useAppSelector(selectStatus);

  const renderContent = () => {
    if (selectedContent && status === 'idle') {
      return (
        <MovieSection>
          <SectionLeft>
            <MovieTitle>{selectedContent.Title}</MovieTitle>
            <MovieRating>
              <span>
                IMDB Rating <FaStar color="#ffb400" /> : {selectedContent.imdbRating}
              </span>
              <span>
                IMDB Votes <FaUsers color="#fafafa" /> : {selectedContent.imdbVotes}
              </span>
              <span>
                Runtime <FaClock color="rgb(191, 213, 214)" /> : {selectedContent.Runtime}
              </span>
              <span>
                Year <FaCalendar color="peachpuff" /> : {selectedContent.Year}
              </span>
            </MovieRating>
            <MoviePlot>{selectedContent.Plot}</MoviePlot>
            <MovieInfo>
              <div>
                <span>Director</span>
                <span>{selectedContent.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{selectedContent.Actors}</span>
              </div>
              <div>
                <span>Genres</span>
                <span>{selectedContent.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{selectedContent.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{selectedContent.Awards}</span>
              </div>
            </MovieInfo>
          </SectionLeft>
          <SectionRight>
            <img src={selectedContent.Poster} alt={selectedContent.Title} />
          </SectionRight>
        </MovieSection>
      );
    }
    if (status === 'loading') {
      return (
        <img
          src={loadingIcon}
          alt="Loading..."
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      );
    }
    return <h4 style={{ color: 'white' }}>Not Found</h4>;
  };

  useEffect(() => {
    dispatch(fetchAsyncContentDetail(imdbID!));

    // callback function to remove selected content
    return () => {
      dispatch(removeSelectedContent());
    };
  }, [dispatch, imdbID]);

  return <div>{renderContent()}</div>;
}
