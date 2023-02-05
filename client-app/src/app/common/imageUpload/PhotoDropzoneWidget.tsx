import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";
interface Props {
  setFiles: any;
}

function PhotoDropzoneWidget({ setFiles }: Props) {
  const dzStyles = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30",
    textAlign: "center" as "center",
    height: 200,
  };

  const dzActive = {
    borderColor: "green",
  };
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: window.URL.createObjectURL(file),
          })
        )
      );
      // Do something with the files
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop Image here!!!" />
    </div>
  );
}

export default PhotoDropzoneWidget;
