import React from "react";
import { ActionIcon, Button } from "@mantine/core";
import { SlRefresh } from "react-icons/sl";
import { BiExport, BiImport } from "react-icons/bi";

type RefreshExportProps = {
  loading: boolean;
  onRefresh: () => void;
  onExport: () => void;
  onImport: () => void;
};

const RefreshExportComponent: React.FC<RefreshExportProps> = ({
  loading,
  onRefresh,
  onExport,
  onImport,
}) => {
  return (
    <div className="flex items-center gap-x-2">
      <ActionIcon title="Refresh" size="lg" onClick={onRefresh}>
        <SlRefresh size={20} className={`${loading ? "animate-spin" : ""}`} />
      </ActionIcon>
      <Button
        className="gap-x-2 bg-mainPurple"
        onClick={onExport}
        variant="filled"
      >
        <BiExport size={20} className="mr-2" />
        Export
      </Button>
      <Button
        className=" gap-x-2 bg-mainPurple"
        onClick={onImport}
        variant="filled"
      >
        <BiImport size={20} className="mr-2" />
        Import
      </Button>
    </div>
  );
};

export default RefreshExportComponent;
