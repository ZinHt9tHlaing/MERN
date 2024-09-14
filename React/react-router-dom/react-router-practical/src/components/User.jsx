
const User = ({ userID }) => {
  let userName;
  switch (userID) {
    case 1:
      userName = "Mg Mg";
      break;

    case 1:
      userName = "Kyaw Kyaw";
      break;

    case 1:
      userName = "Zaw Zaw";
      break;

    case 1:
      userName = "Su Su";
      break;

    case 1:
      userName = "Aye Aye";
      break;

    default:
      userName = "Unknown user";
      break;
  }

  return (
    <div>
      <h3 className=" my-3 font-semibold flex justify-center items-center gap-2">
        Posted by{" "}
          <p className=" font-bold text-xl hover:scale-105 hover:underline active:scale-95 duration-300">
            {userName},
          </p>
      </h3>
    </div>
  );
};

export default User;
