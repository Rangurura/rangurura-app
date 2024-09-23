import { HiDesktopComputer, HiDotsVertical } from "react-icons/hi";
import { MdPushPin } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteProblem from "@/components/core/Modals/DeleteProblem";
import React, { useState } from "react";
import { Problem } from "@/typings";
import { Modal, Menu, rem } from "@mantine/core";
import { LuMailCheck } from "react-icons/lu";
import EscalateProblem from "../../Modals/Escalate";
import LeaderDecision from "../../Modals/Decision";
import AppealDecision from "../../Modals/Appeal";

export default function ProblemActions({
  data,
  type,
}: {
  data: Problem;
  type?: string;
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEscalate, setOpenEscalate] = useState(false);
  const [openDecision, setOpenDecision] = useState(false);
  const [openAppeal, setOpenAppeal] = useState(false);

  const deleteProblem = () => {
    setOpenDelete(true);
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
            onClick={() => setOpenDecision(true)}
          leftSection={
            <LuMailCheck style={{ width: rem(14), height: rem(14) }} />
          }
        >
          <h5>Mark As Solved</h5>
        </Menu.Item>
        {type === "UMUTURAGE" && (
          <Menu.Item
            onClick={() => setOpenAppeal(true)}
            leftSection={
              <HiDesktopComputer style={{ width: rem(14), height: rem(14) }} />
            }
          >
            <h5>Appeal</h5>
          </Menu.Item>
        )}
        {type === "UMUTURAGE" && (
         <Menu.Item
          leftSection={<FaEdit style={{ width: rem(14), height: rem(14) }} />}
        >
          <h5>Edit</h5>
        </Menu.Item>
        )}
   

        {type !== "UMUTURAGE" && (
          <Menu.Item
            onClick={() => setOpenEscalate(true)}
            leftSection={
              <HiDesktopComputer style={{ width: rem(14), height: rem(14) }} />
            }
          >
            <h5>Escalate</h5>
          </Menu.Item>
        )}

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>

        <Menu.Item
          onClick={deleteProblem}
          color="red"
          leftSection={
            <MdDeleteForever style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>

      <Modal opened={openEscalate} onClose={() => setOpenEscalate(false)}>
        <EscalateProblem problem={data} close={() => setOpenEscalate(false)} />
      </Modal>

      <Modal opened={openDelete} onClose={() => setOpenDelete(false)}>
        <DeleteProblem problem={data} close={() => setOpenDelete(false)} />
      </Modal>
     
        <Modal opened={openDecision} onClose={() => setOpenDecision(false)}     className="overflow-y-hidden relative" size={"lg"}>
          <LeaderDecision/>
        </Modal>
     
      {type === "UMUTURAGE" && (
        <Modal opened={openAppeal} onClose={() => setOpenAppeal(false)}     className="overflow-y-hidden relative" size={"lg"}>
          <AppealDecision/>
        </Modal>
      )}
    </Menu>
  );
}
