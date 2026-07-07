import axiosClient from "./axiosClient";

export const analyzeResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append("file", file);
  if (jobDescription) {
    formData.append("job_description", jobDescription);
  }

  const response = await axiosClient.post("/api/analyze/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getAnalysisResult = async (analysisId) => {
  const response = await axiosClient.get(`/api/analyze/${analysisId}`);
  return response.data;
};

export const listAnalyses = async () => {
  const response = await axiosClient.get("/api/analyze/");
  return response.data;
};

export const deleteAnalysis = async (analysisId) => {
  const response = await axiosClient.delete(`/api/analyze/${analysisId}`);
  return response.data;
};

