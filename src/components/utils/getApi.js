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

export const getTimeTable = (
  token,
  setDataState,
  setErrorMessage,
  endPoint,
  dataArray
) => {
  const fleetTypesApi = `${BASE_URL}${endPoint}`;
  let newArray = [];
  if (token)
    axios
      .get(fleetTypesApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const apiData = response.data[dataArray];
        apiData.map((item) => {
          newArray.push({
            id: item.id,
            start: new Date(`${item.day}T${item.start_time}`),
            end: new Date(`${item.day}T${item.end_time}`),
            title: "Meeting day",
            ...item,
          });
        });

        setDataState((prev) => {
          return {
            data: newArray,
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

export const cartsTotalFunction = (
  token,
  userId,
  setError,
  setCurrentTotal
) => {
  const getApi = `${BASE_URL}cart/getCart/${userId}`;

  if (token) {
    axios
      .get(getApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCurrentTotal(response.data.totalPrice);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
      });
  }
};

export const getEnrollById = (id, setState, token) => {
  // setGetAllCarts((prev) => {
  //   return {
  //     ...prev, isDataNeeded: false
  //   }
  // })
  axios.get(`${BASE_URL}enroll/getEnrollByCourceId/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => {
      // console.log(response.data.schedule)
      setState(response.data.enrolled_users)
      // setGetAllCarts((prev) => {
      //   return {
      //     ...prev, isDataNeeded: true
      //   }
      // })
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    });
};