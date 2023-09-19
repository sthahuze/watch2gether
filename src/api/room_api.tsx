import { success_pop_up, info_pop_up, error_pop_up } from "../api/pop_up";
import axios, { all } from "axios";

const server = "https://gruppe9.toni-barth.com";

interface User {
  id: number;
  name: string;
}

interface ArrayComparisonResult {
  equal: boolean;
  added: any[];
  removed: any[];
}

function compareArrays(array1: any[], array2: any[]): ArrayComparisonResult {
  const result: ArrayComparisonResult = {
    equal: true,
    added: [],
    removed: [],
  };

  if (array1.length !== array2.length) {
    result.equal = false;
  } else {
    // Функція для сортування за id
    const sortById = (a: { id: number }, b: { id: number }) => a.id - b.id;

    // Клонування і сортування обох масивів
    const sortedArr1 = [...array1].sort(sortById);
    const sortedArr2 = [...array2].sort(sortById);

    // Порівняння відсортованих масивів на рівність
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i].id !== sortedArr2[i].id) {
        result.equal = false;
        break;
      }
    }
  }

  // Пошук доданих та видалених елементів
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

export function youtube_link(setYoutubeLink: any, youtubeLink: any) {
  const roomid = localStorage.getItem("roomid");

  axios
    .get(`${server}/rooms/${roomid}/video`)
    .then((response) => {
      if (response.status === 200) {
        // Оновлюємо URL відео, якщо отримали відповідь від сервера
        if (response.data.url !== youtubeLink) {
          setYoutubeLink(response.data.url);
        }
      }
    })
    .catch((error) => {
      console.error("Помилка при отриманні URL відео:", error.message);
      setYoutubeLink("Error loading video"); // Встановлюємо помилкове повідомлення у разі помилки
    });
}

export async function user_change(users: User[]): Promise<User[]> {
  try {
    console.log("new user check");
    const roomid = localStorage.getItem("roomid");
    const response = await axios.get(`${server}/rooms/${roomid}/users`);

    // handle success
    const all_users = response.data.users;

    if (users.length === 0) {
      console.log(all_users);
      return all_users;
    } else {
      const comparisonResult = compareArrays(users, all_users);

      if (comparisonResult.equal !== true) {
        if (comparisonResult.added.length > 0) {
          // Робимо щось, коли є додані елементи
          comparisonResult.added.forEach((addedItem) => {
            console.log("User " + addedItem.name + " entered the room");
            success_pop_up("User " + addedItem.name + " entered the room");
          });
        }
        if (comparisonResult.removed.length > 0) {
          // Робимо щось, коли є видалені елементи
          comparisonResult.removed.forEach((removedItem) => {
            console.log("User " + removedItem.name + " left the room");
            info_pop_up("User " + removedItem.name + " left the room");
          });
        }
        users = all_users;
        console.log(users);
        return users; // Оновлюємо стан після отримання даних
      }
    }
  } catch (error) {
    // handle error
    console.log(error);
  }
  return users;
}

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

export async function room_existance(desiredRoomName: any): Promise<boolean> {
  try {
    const response = await axios.get(`${server}/rooms`);
    const roomNames = response.data.rooms.map((room: any) => room.name);

    if (roomNames.includes(desiredRoomName)) {
      console.log(`Кімната "${desiredRoomName}" існує у списку.`);
      return true; // Змінено на повернення true
    } else {
      console.log(`Кімнати "${desiredRoomName}" не існує у списку.`);
      return false; // Змінено на повернення false
    }
  } catch (error) {
    error_pop_up("There is no such room");
    console.error("Помилка при перевірці існування кімнати");
    return false; // Змінено на повернення false
  }
}

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
      console.log(`Елемент з айді ${desiredId} знайдено в списку.`);
      return true;
    } else {
      console.log(`Елемент з айді ${desiredId} не знайдено в списку.`);
      return false;
    }
  } catch (error) {
    // handle error
    console.log(error);
    return false;
  }
}
