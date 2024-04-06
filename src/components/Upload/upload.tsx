import React, { ChangeEvent, Children, FC, useRef, useState } from "react";
import axios from "axios";
import Button from "../Button/button";
import UploadList from "./uploadList";
import Dragger from "./dragger";
export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface UploadProps {
  action: string;
  /**上传的文件列表,*/
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (data: any, file: File) => void;
  onChange?: (file: File) => void;
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void;
  /**上传的文件字段名 */
  name?: string;
  headers?: { [key: string]: any };
  data?: { [key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
  drag?: boolean;
}
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  const handleClick = () => {
    if (fileInput.current) fileInput.current.click();
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) fileInput.current.value = "";
  };
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    // setFileList([_file, ...fileList]);
    setFileList((prelist) => [_file, ...prelist]);
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          if (e.total) {
            let percentage = Math.round((e.loaded * 100) / e.total) || 0;
            if (percentage < 100) {
              // console.log(fileList);出现了问题，拿到的都是以前的数据，空数组
              updateFileList(_file, {
                percent: percentage,
                status: "uploading",
              });
              if (onProgress) {
                onProgress(percentage, file);
              }
            }
          }
        },
      })
      .then((resp) => {
        console.log(resp);
        updateFileList(_file, { status: "success", response: resp.data });
        if (onSuccess) onSuccess(resp.data, file);
        if (onChange) onChange(file);
      })
      .catch((err) => {
        console.error(err);
        updateFileList(_file, { status: "error", error: err });
        if (onError) onError(err, file);
        if (onChange) onChange(file);
      });
  };
  const handleRemove = (file: UploadFile) => {
    setFileList((prelist) => {
      return prelist.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  return (
    <div className="viking-upload-component">
      {/* <Button btnType="primary" onClick={handleClick}>
        {" "}
        Upload File
      </Button> */}
      <div
        className="viking-upload-input"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          className="viking-file-input"
          style={{ display: "none" }}
          ref={fileInput}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
        <UploadList fileList={fileList} onRemove={handleRemove} />
      </div>
    </div>
  );
};
Upload.defaultProps = {
  name: "file",
};
export default Upload;
