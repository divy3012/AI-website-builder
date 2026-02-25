import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";

function UseGetCurrentUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);
}

export default UseGetCurrentUser;
