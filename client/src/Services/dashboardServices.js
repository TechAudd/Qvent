import axios from "axios";
import { API_URL } from "../constants/api";
import { getAuthHeaders } from "./AuthHeaders";

const getTableRows = async () => {
  return await axios.get(
    `${API_URL}/getExpData`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );
};

const getEventsData = async () => {
  return await axios.get(
    `${API_URL}/events`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );
};

const getEventStatsById = async (id) => {
  return await axios.get(
    `${API_URL}/stats?event_id=${id}`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );
};

const getStudentInfo = async (id, htno) => {
  return await axios.get(
    `${API_URL}/student-info?event_id=${id}&htno=${htno}`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );
};

const getHexCode = async (rfid) => {
  return await axios.post(
    `${API_URL}/getHex`,
    {
      rfid,
    },
    {
      headers: getAuthHeaders(),
    }
  );
};

const dashboardServices = {
  getTableRows,
  getHexCode,
  getEventsData,
  getEventStatsById,
  getStudentInfo,
};

export default dashboardServices;
