import axios from "axios"; // Importing the Axios library for making HTTP requests.

const server = "https://gruppe9.toni-barth.com"; // Defining the base server URL.

interface User {
  id: number;
  name: string;
}

interface Room {
  id: number;
  name: string;
}

// Async function to get rooms associated with a user based on their ID.
export async function get_user_rooms(userid: string | null) {
  const user_rooms: string[] = []; // Initialize an array to store user's room names.
  try {
    // Send a GET request to fetch all rooms from the server.
    const response = await axios.get(`${server}/rooms/`);
    const rooms: Room[] = response.data.rooms; // Extract room data from the response.

    // Loop through each room to check if the user is in that room.
    for (let i = 0; i < rooms.length; i++) {
      const roomName: string = rooms[i].name; // Extract the room name.
      try {
        // Send a GET request to fetch the users in the current room.
        const response = await axios.get(`${server}/rooms/${roomName}/users`);
        const isIdInList = response.data.users.some(
          (item: User) => item.id === Number(userid)
        );

        // If the user's ID is found in the room's user list, add the room name to the user_rooms array.
        if (isIdInList) {
          user_rooms.push(roomName);
        }
      } catch (error) {
        console.log(error); // Handle any errors that occur during the inner GET request.
      }
    }
    return user_rooms; // Return the list of rooms the user is part of.
  } catch (error) {
    console.log(error); // Handle any errors that occur during the outer GET request.
  }
}
