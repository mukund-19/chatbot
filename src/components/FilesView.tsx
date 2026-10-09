import React, { useState } from 'react';

interface FilesViewProps {
  onBackToChat: () => void;
  onAttachFileToPrompt: (fileName: string) => void;
}

export const FilesView: React.FC<FilesViewProps> = ({ onBackToChat, onAttachFileToPrompt }) => {
  const [files, setFiles] = useState([
    { name: 'Q4_Financial_Model_v3.xlsx', size: '2.4 MB', date: 'Oct 04, 2026', type: 'Spreadsheet' },
    { name: 'Customer_Discovery_Interviews.docx', size: '840 KB', date: 'Sep 29, 2026', type: 'Document' },
    { name: 'Architecture_System_Diagram.png', size: '1.8 MB', date: 'Sep 22, 2026', type: 'Image' },
    { name: 'Enterprise_SLA_Master_Terms.pdf', size: '4.1 MB', date: 'Sep 15, 2026', type: 'PDF' },
  ]);

  const handleUploadSample = () => {
    const newDoc = {
      name: `Sprint_Telemetry_Report_${Date.now().toString().slice(-4)}.pdf`,
      size: '1.2 MB',
      date: 'Just now',
      type: 'PDF',
    };
    setFiles([newDoc, ...files]);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar p-2 max-w-4xl mx-auto w-full animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Knowledge Assets & Files</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Documents, datasets, and context files ground Cortex cognitive reasoning.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleUploadSample}
            className="text-xs font-medium text-white bg-[#18181B] hover:bg-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <i className="ph ph-upload-simple"></i>
            <span>Upload File</span>
          </button>
          <button
            onClick={onBackToChat}
            className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-gray-200 transition-colors"
          >
            <i className="ph ph-chat-circle"></i>
            <span>Return to Chat</span>
          </button>
        </div>
      </div>

      {/* Upload Dropzone Preview */}
      <div
        onClick={handleUploadSample}
        className="border-2 border-dashed border-gray-200 hover:border-violet-400 bg-gray-50/50 hover:bg-violet-50/30 rounded-2xl p-6 text-center cursor-pointer transition-colors mb-6"
      >
        <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mx-auto mb-2 text-lg">
          <i className="ph ph-cloud-arrow-up"></i>
        </div>
        <div className="text-xs font-semibold text-gray-800">Click to upload or drag & drop documents</div>
        <div className="text-[11px] text-gray-400 mt-1">Supports PDF, DOCX, XLSX, CSV, JSON, PNG (up to 50MB)</div>
      </div>

      {/* Files Table */}
      <div className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-12 px-4 py-2.5 bg-gray-50/80 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
          <span className="col-span-6">File Name</span>
          <span className="col-span-2">Type</span>
          <span className="col-span-2">Size</span>
          <span className="col-span-2 text-right">Action</span>
        </div>
        <div className="divide-y divide-gray-100 text-xs">
          {files.map((file) => (
            <div key={file.name} className="grid grid-cols-12 px-4 py-3 items-center hover:bg-gray-50/60 transition-colors">
              <div className="col-span-6 flex items-center gap-2.5 min-w-0 pr-2">
                <i className="ph ph-file-text text-violet-600 text-base shrink-0"></i>
                <span className="font-medium text-gray-800 truncate">{file.name}</span>
              </div>
              <span className="col-span-2 text-gray-500 text-[11px]">{file.type}</span>
              <span className="col-span-2 text-gray-400 text-[11px]">{file.size}</span>
              <div className="col-span-2 flex items-center justify-end gap-1.5">
                <button
                  onClick={() => onAttachFileToPrompt(file.name)}
                  className="px-2 py-1 text-[11px] text-violet-700 hover:bg-violet-50 rounded transition-colors font-medium"
                  title="Attach to chat prompt"
                >
                  Attach
                </button>
                <button
                  onClick={() => setFiles(files.filter((f) => f.name !== file.name))}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete file"
                >
                  <i className="ph ph-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
