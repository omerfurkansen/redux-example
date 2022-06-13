import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import loadingIcon from "../../images/loading.svg";
import styled from "styled-components";
import Colors from "../../common/colors";

const ContentList = styled.div`
  margin: 20px 0;

  h2 {
    color: ${Colors.fontColorSecondary};
    margin-bottom: 10px;
    font-weight: 400;
  }

  h4 {
    color: ${Colors.fontColorPrimary};
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 15px;
`;

export default function MovieListing() {
  const movies = useSelector((state) => state.movies.movies);
  const series = useSelector((state) => state.movies.series);
  const status = useSelector((state) => state.movies.status);

  const renderContent = (content) => {
    if (content && status === "idle") {
      return content.map((contentItem, id) => {
        return <MovieCard key={id} data={contentItem} />;
      });
    }
    if (status === "loading") {
      return <img src={loadingIcon} alt="Loading..." />;
    }
    return <h4>Not Found</h4>;
  };

  return (
    <>
      <ContentList>
        <h2>Movies</h2>
        <ContentContainer>{renderContent(movies)}</ContentContainer>
      </ContentList>
      <ContentList>
        <h2>Series</h2>
        <ContentContainer>{renderContent(series)}</ContentContainer>
      </ContentList>
    </>
  );
}
