import { Dropzone } from "@mantine/dropzone"
import file from "../../../common/Icons/file.svg"
import classes from './index.module.css'
import { Image } from "@mantine/core"
import React from "react"

const CustomisableFileUploader:React.FC<{className?:string,style:React.CSSProperties}> = ({className,style}) => {
  const dropZoneRef = React.useRef<HTMLDivElement>(null);
  const hanldeClick = () => {
    if (dropZoneRef.current) {
      (dropZoneRef.current )?.click();
    }
  }
  return (
    <label  onClick={hanldeClick} htmlFor="image-upload" style={{overflow:"hidden",...style}} className={classes.customfileupload + " " + className}>
    <Dropzone ref={dropZoneRef}  onDrop={()=>{}} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className={classes.uploadIcon}>
          <Image  src={file}  alt="file"/>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "14px", color: "black" }}>
            Drag & drop files here, or click to select files
          </span>
          <span style={{ fontSize: "10px" }}>
            Supported File Types: .jpg, .jpeg
          </span>
        </div>
      </div>
    </label>
  )
}

export default CustomisableFileUploader