// ============================================================
// NS Traders — Cloudinary + Google Sheets configuration
// Fill in the 3 values below after finishing the setup steps
// (see SETUP-INSTRUCTIONS.md). Used by both index.html and
// upload-poster.html — edit it once here, both pages update.
// ============================================================
const NS_CONFIG = {
  SHEET_API_URL: "https://script.google.com/macros/s/AKfycbyaAMP_c-5rdODKvpYjh28O6UYPQ1jaufpr4yGLrkpLjhBeJmUBpQS8UqxHNtbycsxGCA/exec",
  CLOUDINARY_CLOUD_NAME: "vg7oyvmw",
  CLOUDINARY_UPLOAD_PRESET: "nstraders",
  ADMIN_PASSWORD: "nstraders2026"
};

// Uploads a poster image file to Cloudinary and returns its public URL
async function nsUploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", NS_CONFIG.CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/" + NS_CONFIG.CLOUDINARY_CLOUD_NAME + "/image/upload",
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }
  const data = await res.json();
  return data.secure_url;
}

// Fetches all posters stored in the Google Sheet
async function nsFetchPosters() {
  const res = await fetch(NS_CONFIG.SHEET_API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Could not load posters from sheet");
  }
  return await res.json();
}

// Adds, updates, or deletes a poster in the Google Sheet.
// poster must include an "action" field: "add" | "update" | "delete"
async function nsSavePoster(poster) {
  const res = await fetch(NS_CONFIG.SHEET_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(poster)
  });
  if (!res.ok) {
    throw new Error("Could not save poster to sheet");
  }
  return await res.json();
}
