import React from "react";
import { Meta } from "@storybook/react";
import { Upload, UploadFile } from "./upload";
import Button from "../Button/button";
import Icon from "../Icon/icon";
import { action } from "@storybook/addon-actions";
import { act } from "react-dom/test-utils";
const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "heelo.md",
    status: "uploading",
    percent: 30,
  },
  { uid: "122", size: 1234, name: "xto.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "erget.md", status: "error", percent: 30 },
];
export default {
  title: "第十章：Upload",
  id: "Upload",
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as Meta<typeof Upload>;

export const SimpleUpload = () => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert("file too big");
      return false;
    }
    return true;
  };
  return (
    <Upload
      // action="https://jsonplaceholder.typicode.com/posts"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      defaultFileList={defaultFileList}
      onRemove={action("removed")}
      onChange={action("changed")}
      onProgress={action("progress")}
      onError={action("error")}
      onSuccess={action("suceess")}
      name="fileName"
      data={{ key: "value" }}
      headers={{ "x-poer-by": "vking-ship" }}
      accept=".jpg"
      multiple
      drag
      // beforeUpload={checkFileSize}
    >
      <Icon icon="upload" size="5x" theme="secondary"></Icon>
      <p> Drag file over to upload</p>
    </Upload>
  );
};
// export const ASimpleUpload = (args) => (
//   <Upload
//     {...args}
//     action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//   >
//     <Button size="lg" btnType="primary"><Icon icon="upload" /> 点击上传 </Button>
//   </Upload>
// )
// ASimpleUpload.storyName = '普通的 Upload 组件'
// export const BCheckUpload = (args) => {

//   return (
//     <Upload
//       {...args}
//       action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//       beforeUpload={checkFileSize}
//     >
//       <Button size="lg" btnType="primary"><Icon icon="upload" /> 不能传大于50Kb！ </Button>
//     </Upload>
//   )
// }
// BCheckUpload.storyName = '上传前检查文件大小'
// export const CDragUpload = (args) => (
//   <Upload
//     {...args}
//     action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//     name="fileName"
//     multiple
//     drag
//   >
//     <Icon icon="upload" size="5x" theme="secondary" />
//     <br/>
//     <p>点击或者拖动到此区域进行上传</p>
//   </Upload>
// )
// CDragUpload.storyName = '拖动上传'
