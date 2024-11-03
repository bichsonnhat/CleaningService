import Image from "next/image";
import React from "react";
import { FileIcon, Download, RefreshCw, Eclipse } from "lucide-react";

interface FileDownloadCardProps {
  fileName?: string;
  fileSize?: string;
}

const FileDownloadCard: React.FC<FileDownloadCardProps> = ({
  fileName = "CV.docx",
  fileSize = "5.7MB",
}) => {
  return (
    <div className="border-2 bg-white h-auto mx-[1vw] border-dashed border-gray-300 rounded-lg px-4 py-4 flex">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <Image
            src="/images/file_doc.png"
            alt="upload"
            width={24}
            height={24}
          />
          <span className="text-sm text-gray-700">{fileName}</span>
        </div>

        <Eclipse width={3} height={3} className="mx-2 my-auto" />

        <div className="flex items-center gap-2 mr-auto">
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            Download
          </button>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            Update
          </button>
        </div>

        <p className="text-sm text-gray-500 font-medium">{fileSize}</p>
      </div>
    </div>
  );
};

export default FileDownloadCard;
