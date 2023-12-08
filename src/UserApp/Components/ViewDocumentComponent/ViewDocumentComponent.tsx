import React, { useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import type {
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
interface IPropsViewDocument {
  url: string;
}

export default function ViewDocumentComponent(props: IPropsViewDocument) {
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Print: () => <></>,
    PrintMenuItem: () => <></>,
    Open: () => <></>,
    OpenMenuItem: () => <></>,
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: () => {
      return <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>;
    },
  });
  return (
    <Worker
      workerUrl={
        process.env.REACT_APP_WORKER_PDF ||
        "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
      }
    >
      <Viewer
        fileUrl={props.url}
        plugins={[defaultLayoutPluginInstance, toolbarPluginInstance]}
      />
    </Worker>
  );
}
