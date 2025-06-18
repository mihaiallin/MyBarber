import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {useState, useEffect} from "react";
import axios from "axios";
import DefaultURL from "../GlobalVariables";

const useCurrentUser = () => {
  const authUser = useAuthUser();
  const [currentUser, setCurrentUser] = useState(null);



    useEffect(() => {
      if (!authUser?.email) return;
        const getUserByEmail = async () => {
            try {
                const response = await axios.get(
                    `${DefaultURL}/users/email/${authUser?.email}`
                );
                const data = response.data;
                setCurrentUser(data);
            } catch (err) {
                console.log(err);
            }
        };
        getUserByEmail();
    }, [authUser?.email]);

  return currentUser;
};

export default useCurrentUser;