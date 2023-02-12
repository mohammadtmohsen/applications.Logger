import axios from "axios";

export const FetchData = {
  applicationLoggerList: async (): Promise<any> => {
    const endPoint = `https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`;
    try {
      const response = await axios.get(endPoint);

      return response.data.result
    } catch (error) {
      throw error;
    }
  },
};
