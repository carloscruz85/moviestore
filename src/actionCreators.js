const sendLoginData = data => {
  return {
    type: "SENDLOGINDATA",
    data: data
  };
};

export { sendLoginData };
