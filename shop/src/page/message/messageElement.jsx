import React from "react";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material';

import './index.css'

export const MessageLeft = (props) => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
  }));
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <>
      <div className='message_row'>
        <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Avatar src={props?.userImage ? props.userImage:'https://sshop-user.s3.ap-southeast-1.amazonaws.com/avatar/anonymus_avatar.jpeg'} />
            </StyledBadge>
          <div className="message_orange">
            <div>
              <p className="message_content">{message}</p>
            </div>
            <div className="message_time_StampRight">{timestamp}</div>
          </div>
        </div>
    </>
  );
};

export const MessageRight = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <div className="message_row_right">
      <div className="message_blue">
        <p className="message_content">{message}</p>
        <div className="message_time_StampRight">{timestamp}</div>
      </div>
    </div>
  );
};
