import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchCleanedData = async (batch: number = 1) => {
  const res = await axios.get(`${API_BASE}/api/cleaned/${batch}/`);
  return res.data;
};

export const submitCleanedData = async (payload: any) => {
  const res = await axios.post(`${API_BASE}/api/submit/`, payload);
  return res.data;
};
