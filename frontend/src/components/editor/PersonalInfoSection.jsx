import React from "react";

function PersonalInfoSection({ formData, setFormData, updatePersonalInfo }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Resume Title</label>
        <input
          value={formData?.title || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          className="border p-2 rounded w-full"
          placeholder="Resume title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          value={formData?.personalInfo?.fullName || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              personalInfo: {
                ...formData.personalInfo,
                fullName: e.target.value,
              },
            })
          }
          placeholder="Full Name"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          value={formData?.personalInfo?.email || ""}
          onChange={(e) => updatePersonalInfo("email", e.target.value)}
          placeholder="Email"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
        <input
          value={formData?.personalInfo?.linkedin || ""}
          onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
          placeholder="LinkedIn Profile"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">GitHub Username</label>
        <input
          value={formData?.personalInfo?.github || ""}
          onChange={(e) => updatePersonalInfo("github", e.target.value)}
          placeholder="GitHub Username"
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Portfolio Website</label>
        <input
          value={formData?.personalInfo?.portfolio || ""}
          onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
          placeholder="Portfolio Website"
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
}

export default PersonalInfoSection;