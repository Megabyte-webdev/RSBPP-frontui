import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import img from "../../assets/chats-img.png"
export default function ImageGroup() {
  return (
    <AvatarGroup max={4}>
      <Avatar alt="Remy Sharp" src={img} />
      <Avatar alt="Remy Sharp" src={img} />
      <Avatar alt="Remy Sharp" src={img} />
      <Avatar alt="Remy Sharp" src={img} />
      <Avatar alt="Remy Sharp" src={img} />
      <Avatar alt="Remy Sharp" src={img} />
      <Avatar alt="Remy Sharp" src={img} />
      <Avatar alt="Remy Sharp" src={img} />
      <Avatar alt="Remy Sharp" src={img} />
    </AvatarGroup>
  );
}