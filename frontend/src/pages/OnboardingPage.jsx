import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { onboarding } from "../lib/api";
import { CameraIcon, CircleCheck, Loader, MapPin, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../constants/index.js";

export default function OnboardingPage() {
  const { authUser } = useAuthUser();

  const [onboardingData, setOnboardingData] = useState({
    username: authUser?.username || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: onboarding,
    onSuccess: () => {
      toast.success("Onboarding complete");
      queryClient.invalidateQueries(["authUser"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(onboardingData);
  };

  const generateRandomAvatar = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${randomNumber}`;

    setOnboardingData({ ...onboardingData, profilePic: randomAvatar })
    setTimeout(() => {
      toast.success("Avatar changed successfully")
    }, 1000)
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      data-theme="forest"
    >
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-semibold mb-2">Complete your Profile</h1>
          {authUser.profilePic ? (
            <img
              src={onboardingData.profilePic}
              alt="profile pic"
              className="size-24"
            />
          ) : (
            <CameraIcon className="size-24" />
          )}
          <button
            className="btn bg-success text-black text-base hover:bg-success/80"
            type="button"
            onClick={generateRandomAvatar}
          >
            <ShuffleIcon className="size-4" />
            Generate Random Avatar
          </button>
        </div>

        <div>
          {/* Username */}
          <div className="form-control">
            <label htmlFor="username" className="label label-text">
              Username
            </label>
            <input
              type="text"
              placeholder="John Doe"
              id="username"
              value={onboardingData.username}
              onChange={(e) =>
                setOnboardingData({
                  ...onboardingData,
                  username: e.target.value,
                })
              }
              className="input input-bordered w-full"
            />
          </div>
          {/* BIO */}
          <div className="form-control">
            <label htmlFor="bio" className="label label-text">
              Bio
            </label>
            <textarea
              type="text"
              placeholder="Tell others about yourself and your language learning goals"
              id="bio"
              value={onboardingData.bio}
              onChange={(e) =>
                setOnboardingData({ ...onboardingData, bio: e.target.value })
              }
              className="textarea textarea-bordered h-24"
            />
          </div>

          {/* Languages */}
          <div className="grid grid-cols-2 gap-4">
            {/* Native Language */}
            <div className="form-control">
              <label htmlFor="nativeLanguage" className="label label-text">
                Native Language
              </label>
              <select
                name="nativeLanguage"
                id="nativeLanguage"
                value={onboardingData.nativeLanguage}
                onChange={(e) =>
                  setOnboardingData({
                    ...onboardingData,
                    nativeLanguage: e.target.value,
                  })
                }
                className="select select-bordered w-full"
              >
                <option value="">Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Learning Language */}
            <div className="form-control">
              <label htmlFor="learningLanguage" className="label label-text">
                Learning Language
              </label>
              <select
                name="learningLanguage"
                id="learningLanguage"
                value={onboardingData.learningLanguage}
                onChange={(e) =>
                  setOnboardingData({
                    ...onboardingData,
                    learningLanguage: e.target.value,
                  })
                }
                className="select select-bordered w-full"
              >
                <option value="">Select your learning language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

            {/* Location */}
          <div className="form-control relative">
            <label htmlFor="location" className="label label-text">
              Location
            </label>
            <input
              type="text"
              placeholder="City, Country"
              id="location"
              value={onboardingData.location}
              onChange={(e) =>
                setOnboardingData({
                  ...onboardingData,
                  location: e.target.value,
                })
              }
              className="input input-bordered w-full pl-10" 
            />
            <MapPin className="text-gray-500 absolute top-12 left-3 size-6" />
          </div>

          <button type="submit" className="btn bg-primary text-black text-[16px] btn-block mt-3 font-medium hover:bg-primary/75" disabled={isPending}>
              {
                isPending ? (
                  <div className="flex items-center gap-3">
                    <Loader className="loading loading-spinner" />
                    Onboarding...
                  </div>
              ): (
                <div className="flex items-center gap-3">
                <CircleCheck />
                <span>Complete Onboarding</span>
                </div >
              )
              }
          </button>
        </div>
      </form>
    </div>
  );
}
