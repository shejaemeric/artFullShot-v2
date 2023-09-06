import { useEffect, useState, useRef } from "react";
import { getPins } from "../features/Dashboard/GetPins";
import { useDispatch } from "react-redux";

import sign from "../assets/sign.png";
import { useNavigate } from "react-router-dom";
import { storage, ref, uploadBytes } from "../base";
import { getDownloadURL } from "firebase/storage";
import { showToast } from "../utils";
import { searchByImages } from "../features/Dashboard/SearchByImages";
import ImagePopup from "./ImagePopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [searched, setSearched] = useState(false);
  const [pins, setPins] = useState();
  const [displayResults, setDisplayResults] = useState(false);
  const [results, setResults] = useState(false);
  const [name, setName] = useState();
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupImage, setPopupImage] = useState(null);

  const handleOpenPopup = (image) => {
    setPopupImage(image);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setPopupImage(null);
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const searchPins = async () => {
    toast("Searching...", {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const res = await dispatch(getPins(keyword));
    setPins(res?.payload?.resource_response?.results);
    setDisplayResults(false);
    toast("Finished searching", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
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

  const handleFileUpload = async (event) => {
    try {
      toast("Searching...", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const file = event.target.files[0];
      const storageRef = ref(storage, `images/${file.name}`);
      // 'file' comes from the Blob or File API
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      const results = await dispatch(searchByImages(downloadUrl));
      setDisplayResults(true);
      setResults(results?.payload?.data?.results);
      console.log(results?.payload?.data?.results);
      console.log(downloadUrl);
      setImageUrl(downloadUrl);
      setDisplayResults(true);

      //   uploadBytes(storageRef, file).then(async (snapshot) => {
      //     const downloadUrl = await getDownloadURL(storageRef);
      //     console.log(downloadUrl);
      //     setImageUrl(downloadUrl);
      //     const results = await dispatch(searchByImages(imageUrl));
      //     setDisplayResults(true);
      //     setResults(results?.payload?.data?.results);
      //     console.log(results?.payload?.data?.results);
      //   });
      toast("Finished searching", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (e) {
      toast("An error has occured", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <ToastContainer themeMode="dark" />

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
                <button
                  style={{
                    backgroundColor: "none",
                    color: "white",
                    border: "1px solid white",
                    padding: "4px 16px",
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  {" "}
                  Search By Image
                </button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                />

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
                {name ? (
                  <p style={{ padding: "4px 16px" }}>{`${name}`}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        {displayResults ? (
          <>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                  gap: "70px",
                  border: "1px solid white",
                  width: "fit-content",
                  marginLeft: "auto",
                  marginTop: "50px",
                  padding: "30px",
                  marginRight: "auto",
                }}
              >
                <h1 style={{ marginTop: "20px", fontSize: "40px" }}>
                  UPLOADED IMAGE
                </h1>
                <img
                  src={imageUrl}
                  alt="none"
                  style={{ objectFit: "cover" }}
                  height={200}
                  width={200}
                ></img>
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
                {results ? (
                  results?.map((item) => {
                    if (!item?.url) {
                      return;
                    }
                    return (
                      <div
                        style={{
                          width: "390px",
                          height: "320px",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundImage: `url(${item?.url})`,
                        }}
                        onClick={() => {
                          handleOpenPopup(item?.url);
                        }}
                      ></div>
                    );
                  })
                ) : (
                  <h5
                    style={{
                      fontSize: "56px",
                      color: "white",
                      marginTop: "250px",
                    }}
                  >
                    Sorry we could not find related images
                  </h5>
                )}
              </div>
            </div>
          </>
        ) : (
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
                    onClick={() => {
                      handleOpenPopup(item.images["736x"].url);
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
        )}
      </div>
      {popupImage && openPopup && (
        <ImagePopup
          image={popupImage}
          isOpen={openPopup}
          handleClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default LandingPage;
