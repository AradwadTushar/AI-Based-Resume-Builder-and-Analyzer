import React from "react";

function PersonalInfoSection({ formData, setFormData, updatePersonalInfo }) {
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo("passportPhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    updatePersonalInfo("passportPhoto", "");
  };

  return (
    <div className="space-y-4">
      {/* Photo Upload Area */}
      <div className="flex items-center gap-4 p-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
        {formData?.personalInfo?.passportPhoto ? (
          <div className="relative w-16 h-16 shrink-0">
            <img
              src={formData.personalInfo.passportPhoto}
              alt="Passport Preview"
              className="w-16 h-16 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
            />
            <button
              onClick={handlePhotoRemove}
              className="absolute -top-1.5 -right-1.5 bg-rose-600 hover:bg-rose-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-sm transition"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-550 text-xs text-center p-2 leading-tight">
            No Photo
          </div>
        )}
        <div className="flex-1">
          <label className="ef-label mb-1 block">Passport Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photo-upload-input"
          />
          <label
            htmlFor="photo-upload-input"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-200 transition shadow-xs cursor-pointer"
          >
            Upload Image
          </label>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
            Supports PNG, JPG, or JPEG. Square format is recommended.
          </p>
        </div>
      </div>

      <div>
        <label className="ef-label">Resume Title</label>
        <input
          value={formData?.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="ef-input"
          placeholder="e.g. Software Engineer — Google Application"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="ef-label">Full Name</label>
          <input
            value={formData?.personalInfo?.fullName || ""}
            onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, fullName: e.target.value } })}
            placeholder="John Doe"
            className="ef-input"
          />
        </div>
        <div>
          <label className="ef-label">Email Address</label>
          <input
            value={formData?.personalInfo?.email || ""}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
            placeholder="john@email.com"
            className="ef-input"
            type="email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="ef-label">LinkedIn Profile</label>
          <input
            value={formData?.personalInfo?.linkedin || ""}
            onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="ef-input"
          />
        </div>
        <div>
          <label className="ef-label">GitHub Username</label>
          <input
            value={formData?.personalInfo?.github || ""}
            onChange={(e) => updatePersonalInfo("github", e.target.value)}
            placeholder="github.com/johndoe"
            className="ef-input"
          />
        </div>
      </div>

      <div>
        <label className="ef-label">Portfolio Website</label>
        <input
          value={formData?.personalInfo?.portfolio || ""}
          onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
          placeholder="https://johndoe.dev"
          className="ef-input"
        />
      </div>
    </div>
  );
}

export default PersonalInfoSection;