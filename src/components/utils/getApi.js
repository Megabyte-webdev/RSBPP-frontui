import axios from "axios";
import { BASE_URL } from "./base";

export const getItemFunc = (
    token,
    setDataState,
    setErrorMessage,
    endPoint,
    dataArray
  ) => {
    const fleetTypesApi = `${BASE_URL}${endPoint}`;
    let newFleetMakesData = [];
    if (token)
      axios
        .get(fleetTypesApi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const apiData = response.data[dataArray];
        //   console.log(apiData);
          apiData.map((item) => {
            newFleetMakesData.push({
              id: item.id,
              ...item,
            });
          });
  
          setDataState((prev) => {
            return {
              data: newFleetMakesData,
              isDataNeeded: prev.isDataNeeded,
            };
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage(error.message);
          }
        });
  };