import { Auth, DataStore } from "aws-amplify";
import { createContext, useEffect, useState } from "react";
import { Restaurant } from "../../models";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [ auth, setAuth ] = useState(null);
  const [ restaurant, setRestaurant ] = useState(null);
  const [ loading, setLoading ] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
    .then(res => {
      console.log(res.attributes);
      setAuth(res.attributes);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if(auth){
      DataStore.query(Restaurant, rest => rest.adminSub.eq(auth.sub))
      .then(res => {
        setRestaurant(res[0]);
      })
      .catch(console.log)
    }
  }, [auth]);

  const createRestaurant = async (resData) => {
    try {
      const new_rest = await DataStore.save(new Restaurant(resData));
      console.log(new_rest)
      if(new_rest){
        setLoading(false);
        console.log("SUCCESS!");
        setRestaurant(new_rest);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const updateRestaurant = (resData) => {
    setLoading(false);
    DataStore.save(Restaurant.copyOf(restaurant, update => {
      update.name = resData.name;
      update.address = resData.address;
      update.categories = resData.categories;
      update.lat = resData.lat;
      update.lng = resData.lng;
      update.cover_image = resData.cover_image
    }))
    .then(res => {
      setRestaurant(res);
      setLoading(false);
    })
    .catch(err=> {
      console.log(err);
      setLoading(false);
    });
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, restaurant, setRestaurant, createRestaurant, loading, setLoading, updateRestaurant }}>
      {props.children}
    </AuthContext.Provider>
  );
};

// export const useAuthContext = useContext(AuthContext);

export default AuthContextProvider;