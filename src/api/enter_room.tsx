import { success_pop_up, error_pop_up } from "../api/pop_up";
import axios from "axios";

const server = "https://gruppe9.toni-barth.com";

export async function enter_room(roomid: any, userID: any): Promise<boolean> {
  try {
    const response = await axios.put(`${server}/rooms/${roomid}/users`, {
      user: userID,
    });

    if (response.status === 200) {
      success_pop_up("You successfully entered the Room");
      return true;
    } else {
      error_pop_up("Error " + response.status);
      return false;
    }
  } catch (error) {
    error_pop_up("Error ");
    return false;
  }
}
