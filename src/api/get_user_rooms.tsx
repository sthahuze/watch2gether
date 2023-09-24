import axios from "axios";

const server = "https://gruppe9.toni-barth.com";

interface User {
  id: number;
  name: string;
}

interface Room {
  id: number;
  name: string;
}

export async function get_user_rooms(userid: string | null) {
  const user_rooms: string[] = [];
  try {
    const response = await axios.get(`${server}/rooms/`);
    const rooms: Room[] = response.data.rooms;

    for (let i = 0; i < rooms.length; i++) {
      const roomName: string = rooms[i].name;
      try {
        const response = await axios.get(`${server}/rooms/${roomName}/users`);
        const isIdInList = response.data.users.some(
          (item: User) => item.id === Number(userid)
        );

        if (isIdInList) {
          user_rooms.push(roomName);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return user_rooms;
  } catch (error) {
    console.log(error);
  }
}
