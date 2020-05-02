let users = [];

const sanitize = (str) => str.trim().toLowerCase();

const dispatchUsers = (action) => {
  const { type, payload } = action;
  const { id, nickname, room } = payload;

  switch (type) {
    case "ADD":
      return (users = [...users, payload]);

    case "REMOVE":
      return (users = users.filter((user) => user.id === id));

    case "EXISTING":
      return users.find(
        (user) =>
          user.nickname === sanitize(nickname) && user.room === sanitize(room)
      );

    case "FIND_BY_ID":
      return users.find((user) => user.id === id);

    case "FIND_IN_ROOM":
      return users.filter((user) => user.room === room);

    default:
      break;
  }
};

const addUser = ({ id, nickname, room }) => {
  const existingUser = dispatchUsers({
    type: "EXISTING",
    payload: { nickname, room },
  });

  if (existingUser) return { err: "Username is taken" };

  dispatchUsers({ type: "ADD", payload: { id, nickname, room } });
};

const removeUser = ({ id }) => {
  const user = dispatchUsers({ type: "FIND_BY_ID", payload: { id } });

  if (!user) return { err: "No user found" };

  return dispatchUsers({ type: "REMOVE", payload: { id } });
};

const getUser = ({ id }) =>
  dispatchUsers({ type: "FIND_BY_ID", payload: { id } });

const getUsersInRoom = ({ room }) =>
  dispatchUsers({ type: "FIND_IN_ROOM", payload: { room } });

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
