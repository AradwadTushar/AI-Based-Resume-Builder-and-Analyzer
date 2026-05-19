import axiosClient from "./axiosClient";


export const generateSummary = async (
  payload
) => {
  const response = await axiosClient.post(
    "/api/ai/generate-summary",
    payload
  );

  return response.data;
};


export const rewriteExperience = async (
  payload
) => {
  const response = await axiosClient.post(
    "/api/ai/rewrite-experience",
    payload
  );

  return response.data;
};

export const matchJobDescription =
  async (payload) => {
    const response =
      await axiosClient.post(
        "/api/ai/match-job-description",
        payload
      );

    return response.data;
  };

export const analyzeATS = async (
  payload
) => {
  const response =
    await axiosClient.post(
      "/api/ai/analyze-resume",
      payload
    );

  return response.data;
};