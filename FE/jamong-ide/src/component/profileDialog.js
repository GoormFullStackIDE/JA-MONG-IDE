// import React, { Component, useState } from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import AddIcon from '@mui/icons-material/Add';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Logout } from '../common/memberReducer.js';

// export default function ProfileDialog(props) {
//   const { onClose, selectedValue, avatarOpen } = props;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleClose = () => {
//     onClose(selectedValue);
//   };

//   const logoutClick = () => {
//     dispatch(Logout());
//   };

//   // 프로필 다이알로그
//   // 네모 박스안에 동그란 프로필 이미지(아바타)띄우고  아래에 <Divider /> 두개 버튼 프로필 편집, 로그아웃 버튼

//   return (
//     <Dialog
//       onClose={handleClose}
//       //   sx={{
//       //     display: 'flex',
//       //     // justifyContent: 'flex-end',
//       //     backgroundColor: '#0000000',
//       //   }}
//       PaperProps={{
//         style: {
//           transform: 'translate(20%, -60%)',
//           //   position: 'absolute',
//           display: 'block',
//           //   overflow: 'auto',
//           width: 200,
//         },
//       }}
//       open={avatarOpen}
//       //   hideBackdrop={true}
//     >
//       <List
//         sx={{
//           p: 0,
//           display: 'flex',
//           alignItems: 'center',
//           flexDirection: 'column',
//           border: 1,
//           borderColor: '#FF9B8D',
//         }}
//       >
//         <ListItemAvatar>
//           <Avatar
//             sx={{ mt: 1, width: 100, height: 100 }}
//             alt="jamong.png"
//             src="/images/jamong.png"
//           />
//         </ListItemAvatar>
//         <div className="profile_dialog">
//           <p>김이름</p>
//           <p>sdfmple@mail.com</p>
//         </div>{' '}
//         <ListItem sx={{ flexDirection: 'column', p: 0, width: 200 }}>
//           <ListItemButton
//             sx={{
//               textAlign: 'center',
//               border: 1,
//               width: 200,
//               borderColor: '#FF9B8D',
//               backgroundColor: '#FFF7F4',
//             }}
//             autoFocus
//             onClick={() => navigate('/profile')}
//           >
//             프로필 편집
//           </ListItemButton>
//           {/* <Divider /> */}

//           <ListItemButton
//             sx={{
//               textAlign: 'center',
//               border: 1,
//               width: 200,
//               borderColor: '#FF9B8D',
//               backgroundColor: '#FFF7F4',
//             }}
//             onClick={() => logoutClick()}
//           >
//             로그아웃
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </Dialog>
//   );
// }

// ProfileDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   //   selectedValue: PropTypes.string.isRequired,
// };
