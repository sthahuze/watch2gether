import { success_pop_up, info_pop_up, error_pop_up } from "../api/pop_up"; //bringing in functions (success_pop_up, info_pop_up, and error_pop_up) from a module located at "../api/pop_up."
import axios, { all } from "axios"; // Importing Axios for making HTTP requests.

const server = "https://gruppe9.toni-barth.com"; // Defining the base server URL.

interface User {
  id: number;
  name: string;
}

interface ArrayComparisonResult {
  equal: boolean;
  added: any[];
  removed: any[];
}

// Function to compare two arrays and find added and removed elements.
function compareArrays(array1: any[], array2: any[]): ArrayComparisonResult {
  const result: ArrayComparisonResult = {
    equal: true,
    added: [],
    removed: [],
  };

  if (array1.length !== array2.length) {
    result.equal = false;
  } else {
    // Function to sort the arrays by id
    const sortById = (a: { id: number }, b: { id: number }) => a.id - b.id;

    // Clone and sort both arrays
    const sortedArr1 = [...array1].sort(sortById);
    const sortedArr2 = [...array2].sort(sortById);

    // Compare sorted arrays for equality
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i].id !== sortedArr2[i].id) {
        result.equal = false;
        break;
      }
    }
  }

  // Find added and removed items
  for (const item of array2) {
    if (!array1.some((element) => element.id === item.id)) {
      result.added.push(item);
    }
  }

  for (const item of array1) {
    if (!array2.some((element) => element.id === item.id)) {
      result.removed.push(item);
    }
  }

  return result;
}

// Function to update a YouTube link based on the room ID.
export function youtube_link(setYoutubeLink: any, youtubeLink: any) {
  const roomid = localStorage.getItem("roomid");

  axios
    .get(`${server}/rooms/${roomid}/video`)
    .then((response) => {
      if (response.status === 200) {
        // Update the video URL if a response is received from the server.
        if (response.data.url !== youtubeLink) {
          setYoutubeLink(response.data.url);
        }
      }
    })
    .catch((error) => {
      console.error("Error while fetching video URL:", error.message);
      setYoutubeLink("Error loading video"); // Set an error message in case of an error.
    });
}

// Async function to check for user changes in a room.
export async function user_change(users: User[]): Promise<User[]> {
  try {
    console.log("Checking for new users");
    const roomid = localStorage.getItem("roomid");
    const response = await axios.get(`${server}/rooms/${roomid}/users`);

    // Handle success
    const all_users = response.data.users;

    if (users.length === 0) {
      return all_users;
    } else {
      const comparisonResult = compareArrays(users, all_users);

      if (comparisonResult.equal !== true) {
        if (comparisonResult.added.length > 0) {
          // Do something when there are added items.
          comparisonResult.added.forEach((addedItem) => {
            console.log("User " + addedItem.name + " entered the room");
            success_pop_up("User " + addedItem.name + " entered the room");
          });
        }
        if (comparisonResult.removed.length > 0) {
          // Do something when there are removed items.
          comparisonResult.removed.forEach((removedItem) => {
            console.log("User " + removedItem.name + " left the room");
            info_pop_up("User " + removedItem.name + " left the room");
          });
        }
        users = all_users;
        console.log(users);
        return users; // Update the state after receiving data.
      }
    }
  } catch (error) {
    // Handle error
    console.log(error);
  }
  return users;
}

// Function to copy the room link to the clipboard.
export const copyRoomLink = () => {
  const roomid = localStorage.getItem("roomid");
  const roomLink = `${window.location.origin}/watch2gether/room/${roomid}`;
  const dummyInput = document.createElement("input");
  document.body.appendChild(dummyInput);
  dummyInput.setAttribute("value", roomLink);
  dummyInput.select();
  document.execCommand("copy");
  document.body.removeChild(dummyInput);
};

// Async function to check if a room with a desired name exists.
export async function room_existance(desiredRoomName: any): Promise<boolean> {
  try {
    const response = await axios.get(`${server}/rooms`);
    const roomNames = response.data.rooms.map((room: any) => room.name);

    if (roomNames.includes(desiredRoomName)) {
      console.log(`Room "${desiredRoomName}" exists in the list.`);
      return true; // Changed to return true
    } else {
      console.log(`Room "${desiredRoomName}" does not exist in the list.`);
      return false; // Changed to return false
    }
  } catch (error) {
    error_pop_up("There is no such room");
    console.error("Error while checking room existence");
    return false; // Changed to return false
  }
}

// Async function to check if a user is in a specific room.
export async function user_in_room(roomid: string): Promise<boolean> {
  const desiredId = localStorage.getItem("userID");

  try {
    const response = await axios.get(`${server}/rooms/${roomid}/users`);
    const all_users = response.data.users;
    console.log(all_users);

    const isIdInList = all_users.some(
      (item: User) => item.id === Number(desiredId)
    );

    if (isIdInList) {
      console.log(`Element with ID ${desiredId} found in the list.`);
      return true;
    } else {
      console.log(`Element with ID ${desiredId} not found in the list.`);
      return false;
    }
  } catch (error) {
    // Handle error
    console.log(error);
    return false;
  }
}