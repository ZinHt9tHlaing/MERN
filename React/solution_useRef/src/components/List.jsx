import Card from "./Card";

const List = ({ userInfos }) => {
  return (
    <div className="rounded-lg">
      {userInfos.length > 0 ? (
        <>
          {userInfos.map((userInfo) => {
            return (
              <div key={userInfo.name}>
                <Card>
                  <div className="list-bg py-5 mb-4 bg-slate-800 text-white md:text-center">
                    <h1>
                      Name :{" "}
                      <p className=" font-bold inline-block text-yellow-400 hover:text-yellow-300 hover:scale-110 uppercase duration-300">
                        {userInfo.name}
                      </p>
                    </h1>
                    <p>Email : {userInfo.email}</p>
                    <p>From : {userInfo.live}</p>
                  </div>
                </Card>
              </div>
            );
          })}
        </>
      ) : (
        <Card>
          <div className="list-bg py-5 mb-4 bg-slate-800 text-white">
            <h1 className="md:text-center">
              Add a new{" "}
              <p className="font-bold inline-block text-yellow-400 hover:text-yellow-300 hover:scale-110 duration-300">
                User
              </p>{" "}
              right now !
            </h1>
          </div>
        </Card>
      )}
    </div>
  );
};

export default List;
