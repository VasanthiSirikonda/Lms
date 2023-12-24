import axios from "../axiosConfig";

export const getCategories = async () => {
  return await axios.get("api/getCategoriesData");
};

export const getBusinessConversionChartData = async (state) => {
  if (state) {
    return await axios.get(
      "api/getPromocodeUsedProductsWeeklyDataByLocation/" + state
    );
  }
  return await axios.get("api/getPromocodeUsedProductsWeeklyData");
};

export const getLocations = async (data) => {
  return await axios.get("api/getLocations");
};

export const getTypes = async (data) => {
  return await axios.get("api/getPromoTypes");
};
