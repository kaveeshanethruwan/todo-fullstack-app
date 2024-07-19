import axios from "axios";
import { AxiosConfig } from "../types/apiConfig";
import { useAppDispatch } from "../redux/hooks";
import { updateHttp } from "../redux/todoSlice";

export const useHttp = () => {
  const dispatch = useAppDispatch();

  const createRequest = async (config: AxiosConfig, key: string) => {
    try {
      config.baseURL = "http://localhost:3000";
      dispatch(updateHttp({ type: key, loading: true, success: false, error: false }));
      const res = await axios(config);
      const successResponse = { type: key, loading: false, success: true, data: res.data, error: false }
      dispatch(updateHttp(successResponse));
      return successResponse;
    } catch (error) {
      if (error instanceof Error) {
        const errorResponse = { type: key, loading: false, success: false, error: error.message }
        dispatch(updateHttp(errorResponse));
        return errorResponse;
      }
    }
  }
  return { createRequest };
};


