const generateRandomString = (length: number): string => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let randomString = "";

  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    randomString += characters[randomValues[i] % charactersLength];
  }

  return randomString;
};

function CreateNewRoom(): any {
  const new_key = generateRandomString(20);
  //server connection needed
  localStorage.setItem("roomid", new_key);
  return new_key;
}

export default CreateNewRoom;
