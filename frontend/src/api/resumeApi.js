import axiosClient from "./axiosClient";


export const getResumes = async () => {
  const response = await axiosClient.get(
    "/api/resumes/"
  );

  return response.data;
};


export const createResume = async (title) => {
  const response = await axiosClient.post(
    "/api/resumes/",
    {
      title,
    }
  );

  return response.data;
};

export const getResume = async (id) => {
  const response = await axiosClient.get(
    `/api/resumes/${id}`
  );

  return response.data;
};

export const updateResume = async (
  id,
  updates
) => {
  const response = await axiosClient.patch(
    `/api/resumes/${id}`,
    updates
  );

  return response.data;
};

export const deleteResume = async (
  resumeId
) => {
  const response = await axiosClient.delete(
    `/api/resumes/${resumeId}`
  );

  return response.data;
};