import React from 'react';
import styled from 'styled-components/macro';
import avatarNmic from '../../assets/images/BlueRoomImages/avatarNmic.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AvatarImg = styled.img`
  width: 130px;
  height: 90px;
  //float: inline-start;
`;

export default function TheAvatarPanel({ name }) {
  return (
    <Container>
      <AvatarImg src={avatarNmic} />
      {name}
    </Container>
  );
}
