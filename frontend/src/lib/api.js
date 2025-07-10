import { axiosInstance } from "./axios.js";

export const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    console.log("Error in getAuthUser", error);
    return null;
  }
};

export const signup = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};

export const signIn = async (signInData) => {
  const response = await axiosInstance.post("/auth/login", signInData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const onboarding = async (onboardingData) => {
  const response = await axiosInstance.post("/auth/onboard", onboardingData);
  return response.data;
};

export const getFriends = async () => {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export const getOutgoingFriendReqs = async () => {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(`users/friend-request/${userId}`);
  return response.data;
}

export const getFriendRequests = async () => {
  const response = await axiosInstance.get("users/friend-requests");
  return response.data;
}

export const acceptFriendRequests = async (requestId) => {
  const response = await axiosInstance.put(`users/friend-request/${requestId}`);
  return response.data;
}

export const getStreamtoken = async () => {
  const response = await axiosInstance.get("chats/token");
  return response.data;
}
