import { success_pop_up, error_pop_up } from "../api/pop_up"; // Importing functions for success and error pop-ups.
import axios from "axios"; // Importing the Axios library for making HTTP requests.

const server = "https://gruppe9.toni-barth.com"; // Defining the base server URL.

// Async function to enter a room with a given room ID and user ID.
export async function enter_room(roomid: any, userID: any): Promise<boolean> {
  try {
    // Sending a PUT request to the server's endpoint to add the user to the specified room.
    const response = await axios.put(`${server}/rooms/${roomid}/users`, {
      user: userID,
    });

    // If the server responds with a 200 status code, display a success pop-up and return true.
    if (response.status === 200) {
      success_pop_up("You successfully entered the Room");
      return true;
    } else {
      // If the server responds with an error status code, display an error pop-up with the status code and return false.
      error_pop_up("Error " + response.status);
      return false;
    }
  } catch (error) {
    // If an exception occurs during the HTTP request, display a generic error pop-up and return false.
    error_pop_up("Error ");
    return false;
  }
}
