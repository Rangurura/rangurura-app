import { HiDesktopComputer, HiDotsVertical } from "react-icons/hi";
import { MdPushPin } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import DeleteReport from "../../Modals/DeleteReport";
import EditReport from "../../Modals/EditReport";
import React, { useState } from "react";
import { Report } from "@/typings";
import { Modal, Menu, rem } from "@mantine/core";
import { LuMailCheck } from "react-icons/lu";

export default function ReportActions({ data }: { data: Report }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const deleteReport = () => {
    setOpenDelete(true);
  };
  const editReport = () => {
    setOpenEdit(true);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <span className="cursor-pointer">
          <HiDotsVertical />
        </span>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <HiDesktopComputer style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={editReport}
          color="blue"
        >
          <h5>Edit</h5>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>

        <Menu.Item
          onClick={deleteReport}
          color="red"
          leftSection={
            <MdDeleteForever style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
      <Modal opened={openEdit} onClose={() => setOpenEdit(false)}>
        <EditReport report={data} close={() => setOpenEdit(false)} />
      </Modal>
      <Modal opened={openDelete} onClose={() => setOpenDelete(false)}>
        <DeleteReport report={data} close={() => setOpenDelete(false)} />
      </Modal>
    </Menu>
  );
}
