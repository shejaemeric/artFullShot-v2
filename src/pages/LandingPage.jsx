import { useEffect, useState } from "react";
import { getPins } from "../features/Dashboard/GetPins";
import { useDispatch } from "react-redux";

import sign from "../assets/sign.png";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [searched, setSearched] = useState(false);
  const [pins, setPins] = useState();
  const [name, setName] = useState();

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const searchPins = async () => {
    const res = await dispatch(getPins(keyword));
    setPins(res?.payload?.resource_response?.results);
    console.log(res?.payload?.resource_response?.results);
  };

  useEffect(() => {
    setName(JSON.parse(localStorage.getItem("user"))?.user?.displayName);
  }, []);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          alignItems: "start",
          background:
            "linear-gradient(180deg, #5B6044 0%, rgba(106, 109, 93, 0.00) 100%)",
          width: "100vw",
          height: "100vh",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "50px",
            alignItems: "center",
            paddingTop: "20px",
          }}
          className="flex justify-between items-start text-white px-12"
        >
          <div
            style={{ alignItems: "center" }}
            className="flex justify-between items-center gap-8"
          >
            <div className="navlinks">
              <div
                className="navlinks flex items-center gap-8 font-medium "
                style={{
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <span>
                  <img
                    src={sign}
                    style={{ maxWidth: "80%", height: "auto" }}
                    alt="logo"
                  />
                </span>
                <a href="#" style={{ fontSize: "16px" }}>
                  Explore
                </a>
                <a href="#" style={{ fontSize: "16px" }}>
                  Create
                </a>
                <input
                  type="text"
                  placeholder="Search.."
                  name="search"
                  class="w-50px px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                  style={{ color: "black" }}
                  onChange={handleInputChange}
                />
                <button
                  style={{
                    backgroundColor: "none",
                    color: "white",
                    border: "1px solid white",
                    padding: "4px 16px",
                  }}
                  onClick={searchPins}
                >
                  {" "}
                  Search
                </button>
                {name ? <p>{`Welcome ${name}`}</p> : <></>}
                <button
                  style={{
                    backgroundColor: "none",
                    color: "white",
                    border: "1px solid white",
                    padding: "4px 16px",
                  }}
                  onClick={logOut}
                >
                  {" "}
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            flexDirection: "row",
            gap: "25px",
            width: "100vw",
            marginTop: "120px",
            flexWrap: "wrap",
          }}
        >
          {pins ? (
            pins?.map((item) => {
              if (!item.images) {
                return;
              }
              return (
                <div
                  style={{
                    width: "390px",
                    height: "320px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${item.images["736x"].url})`,
                  }}
                ></div>
              );
            })
          ) : (
            <h5
              style={{ fontSize: "56px", color: "white", marginTop: "250px" }}
            >
              SEARCH SOMETHING
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
