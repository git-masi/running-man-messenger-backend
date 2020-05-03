let users = [];

const normalizeString = (str) => str.trim().toLowerCase();

const dispatch = (action) => {
  const { type, payload } = action;
  const { id, name, room } = payload;

  switch (type) {
    case "ADD":
      return (users = [...users, payload]);

    case "REMOVE":
      return (users = users.filter((user) => user.id === id));

    case "EXISTING":
      return users.find(
        (user) =>
          user.name === normalizeString(name) &&
          user.room === normalizeString(room)
      );

    case "FIND_BY_ID":
      return users.find((user) => user.id === id);

    case "FIND_IN_ROOM":
      return users.filter((user) => user.room === room);

    default:
      break;
  }
};

const addUser = ({ id, name, room }) => {
  const existingUser = dispatch({
    type: "EXISTING",
    payload: { name, room },
  });

  if (existingUser)
    return {
      user: null,
      err: "Username is taken",
    };

  const user = { id, name, room };

  dispatch({
    type: "ADD",
    payload: user,
  });

  return { user, err: null };
};

const removeUser = ({ id }) => {
  const user = dispatch({ type: "FIND_BY_ID", payload: { id } });

  if (!user) return { user: null, err: "No user found" };

  dispatch({ type: "REMOVE", payload: { id } });

  return { user };
};

const getUser = ({ id }) => {
  const user = dispatch({ type: "FIND_BY_ID", payload: { id } });

  if (!user) return { user: null, err: "No user found" };

  return { user, err: null };
};

const getUsersInRoom = ({ room }) => {
  const users = dispatch({
    type: "FIND_IN_ROOM",
    payload: { room },
  });

  return { users };
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
