import { io } from "socket.io-client";

export let socket = io("https://realprojectapiserver.com", {
  transports: ["websocket"],
});

//소켓 연결
export const initSocketConnection = () => {
  console.log(socket);
  if (socket) return;
  socket.connect();
};

//소켓 연결 끊기
export const disconnectSocket = () => {
  if (socket == null || socket.connect === false) {
    return;
  }
  socket.disconnect();
};

//서버에 현 유저 보내기
export const sendUser = (userId, nickname) => {
  if (userId && nickname) {
    socket?.emit("newUser", { userId, nickname });
  }
};

//서버에 방정보(id:룸아이디,guestNames 게스트 이름 배열, me.userId 내 서버 아이디)보내기
export const inviteMember = (userId, guestName, roomId) => {
    console.log(userId, guestName, roomId)
  socket?.emit("inviteMember", { userId, guestName, roomId });
};

//실시간 알림
export const newInvited = () => {
  socket?.on("newInviteDB", (noti) => {    
    console.log("이게실시간", noti.findUserAlertDB[0]);
  });
};


//내 아이디 보내고 쌓여진 리스트 받기
export const notiList = (userId) => {
    socket?.emit('getAlert',{userId});  
    socket?.on('getNotification',(data)=>{
        console.log('ddddd')
      console.log(data)
    })  
  }
