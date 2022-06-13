import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import UserImage from '../images/user.png';
import { fetchAsyncMovies, fetchAsyncSeries, setSearch } from '../features/movies/movieSlice';
import Colors from '../common/colors';
import { useAppDispatch } from '../features/hooks';

const HeaderStyle = styled.div`
  background-color: ${Colors.themeColorSecondary};
  height: 72px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  color: ${Colors.fontColorPrimary};
  font-size: 20px;
  font-weight: 600;
`;

const UserImageWrapper = styled.div`
  &,
  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchBar = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;

  form {
    display: flex;
    justify-content: center;
    width: 70%;

    button {
      padding: 0 8px;
      font-size: 20px;
      cursor: pointer;
      height: 38px;
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  input {
    font-size: 18px;
    width: 100%;
    padding: 5px 5px 5px 10px;
    height: 38px;
    outline: none;
  }
`;

export default function Header() {
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTerm('');
    if (term.length > 0) {
      dispatch(setSearch(true));
      dispatch(fetchAsyncMovies(term));
      dispatch(fetchAsyncSeries(term));
      navigate('/');
    }
  };

  return (
    <HeaderStyle>
      <Link to="/" reloadDocument>
        <Logo>Movie App</Logo>
      </Link>
      <SearchBar>
        <form onSubmit={handleSubmit}>
          <input type="text" value={term} placeholder="Search" onChange={(e) => setTerm(e.target.value)} />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </SearchBar>
      <UserImageWrapper>
        <img src={UserImage} alt="User" />
      </UserImageWrapper>
    </HeaderStyle>
  );
}
