import axios from "axios";

export const updateCreateConfig = async () => {
  const response = await axios.post(
    "",
    {
      data: {},
    },
    {
      headers: {
        Authorization: `"Basic SuperKey"`,
      },
    }
  );
  return response.data;
};

export const getConfigs = async () => {
  const response = await axios.get(
    ""
  );
  return response.data;
};
