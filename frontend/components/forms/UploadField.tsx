"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function UploadField({ service }: { service: string }) {
  const [fileName, setFileName] = useState("");

  return (
    <div>
      <label htmlFor={`${service}-upload`} className="block text-sm font-bold text-navy">
        Upload documents
      </label>
      <div className="mt-2 rounded-2xl border border-dashed border-navy/20 bg-ivory p-4">
        <input
          id={`${service}-upload`}
          type="file"
          className="focus-ring w-full rounded-lg text-sm text-slate file:mr-4 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              setFileName(file.name);
              trackEvent("upload_start", { service, fileType: file.type });
              trackEvent("upload_success", { service, fileName: file.name });
            }
          }}
        />
        <p className="mt-3 text-xs leading-5 text-slate">
          Select the document you want to discuss. Our team will confirm the safest way to share or bring it.
        </p>
        {fileName ? <p className="mt-2 text-sm font-semibold text-navy">Selected: {fileName}</p> : null}
      </div>
    </div>
  );
}
