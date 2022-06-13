import React from 'react';
import styled from 'styled-components';
import Colors from '../common/colors';

const FooterStyle = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${Colors.themeColorSecondary};
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${Colors.fontColorPrimary};
`;

export default function Footer() {
  return (
    <FooterStyle>
      <div>Movie App</div>
      <div>©2021, Movie, Inc. or its affiliates</div>
    </FooterStyle>
  );
}
