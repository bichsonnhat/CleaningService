import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils"
import { FileIcon, Download, RefreshCw, Eclipse } from "lucide-react";

interface FileDownloadCardProps {
  fileName?: string;
  fileSize?: number;
  className?: string;
  onUpdate?: () => void;
  onDownload?: () => void;
}

const FileDownloadCard: React.FC<FileDownloadCardProps> = ({
  fileName = "CV.docx",
  fileSize = 0,
  className,
  onUpdate,
  onDownload
}) => {
  // Hàm chuyển đổi kích thước tệp thành MB
  const formatFileSize = (size: number) => {
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Hàm giới hạn độ dài của fileName
  const truncateFileName = (name: string, maxLength: number) => {
    if (name.length <= maxLength) return name;
    const extension = name.split(".").pop(); // Lấy phần đuôi file
    const baseName = name.substring(0, maxLength - (extension?.length || 0) - 3); // Trừ khoảng trống cho "..."
    return `${baseName}...${extension}`;
  };

  return (
    <div 
      className={cn(`border-2 bg-white h-auto border-dashed border-gray-300 rounded-lg px-4 py-4 flex`,
                      className)}>
      <div className="flex items-center justify-between w-full gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          <Image
            src="/images/Dashboard/Personal/file_doc.png"
            alt="upload"
            width={24}
            height={24}
          />
          <span className="text-sm text-gray-700">{truncateFileName(fileName, 20)}</span>
        </div>

        <Eclipse width={3} height={3} className="my-auto" />

        <div className="flex items-center gap-2 mr-auto">
          <button type="button" className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            onClick={onDownload}
          >
            Download
          </button>
          <button  type="button" className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            onClick={onUpdate}
          >
            Update
          </button>
        </div>

        <p className="text-sm text-gray-500 font-medium">{formatFileSize(fileSize)}</p>
      </div>
    </div>
  );
};

export default FileDownloadCard;