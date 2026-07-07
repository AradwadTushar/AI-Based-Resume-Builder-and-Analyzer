import React from "react";
import axiosClient from "../../api/axiosClient";


function ExportPreviewModal({

  isOpen,
  onClose,
  resumeId,
  onDownload

}) {
  const [

    iframeLoading,

    setIframeLoading

  ] = React.useState(true);

  const [htmlContent, setHtmlContent] = React.useState("");


  React.useEffect(() => {

    if (isOpen) {

      setIframeLoading(true);
      axiosClient.get(`/api/resumes/${resumeId}/preview`)
        .then((res) => {
          setHtmlContent(res.data);
          setIframeLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch resume preview:", err);
          setHtmlContent(`
            <div style="font-family: sans-serif; text-align: center; padding: 3rem; color: #ef4444;">
              <h3>Failed to load preview</h3>
              <p>${err.response?.data?.detail || err.message}</p>
            </div>
          `);
          setIframeLoading(false);
        });
    }

  }, [isOpen, resumeId]);


  if (!isOpen) return null;

  return (

    <div
      className="
        fixed inset-0 z-50
        bg-black/60
        flex items-center
        justify-center
      "
    >

      <div
        className="
          bg-white rounded-2xl
          w-[95%] h-[95%]
          flex flex-col
          overflow-hidden
        "
      >

        {/* Header */}

        <div
          className="
            flex items-center
            justify-between
            px-6 py-4 border-b
          "
        >

          <h2
            className="
              text-xl font-semibold
            "
          >
            Resume Export Preview
          </h2>

          <button
            onClick={onClose}
            className="
              text-gray-500 hover:text-black
            "
          >
            ✕
          </button>

        </div>


        {/* iframe preview */}

        <div
  className="
    flex-1 bg-gray-100
    relative
  "
>

  {iframeLoading && (

    <div
      className="
        absolute inset-0
        flex flex-col
        items-center
        justify-center
        bg-white z-10
      "
    >

      <div
        className="
          w-12 h-12
          border-4 border-gray-300
          border-t-black
          rounded-full
          animate-spin
          mb-4
        "
      />

      <p
        className="
          text-gray-600
          text-sm font-medium
        "
      >
        Building your resume...
      </p>

    </div>
  )}


  <iframe
    title="Resume Preview"
    srcDoc={htmlContent}
    className="w-full h-full border-0"
  />

</div>


        {/* Footer */}

        <div
          className="
            flex justify-end gap-3
            px-6 py-4 border-t
          "
        >

          <button
            onClick={onClose}

            className="
              px-4 py-2 rounded-lg
              border border-gray-300
            "
          >
            Back
          </button>


          <button
            onClick={onDownload}

            className="
              px-4 py-2 rounded-lg
              bg-black text-white
            "
          >
            Download PDF
          </button>

        </div>

      </div>

    </div>
  );
}

export default ExportPreviewModal;