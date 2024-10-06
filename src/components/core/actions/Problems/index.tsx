import { HiDesktopComputer, HiDotsVertical } from "react-icons/hi";
import { MdPushPin, MdDeleteForever } from "react-icons/md";
import { FaEdit, FaMicrophone, FaRegEye } from "react-icons/fa";
import DeleteProblem from "@/components/core/Modals/DeleteProblem";
import React, { useState, useEffect } from "react";
import { Problem } from "@/typings";
import { Modal, Menu, rem } from "@mantine/core";
import { LuMailCheck } from "react-icons/lu";
import EscalateProblem from "../../Modals/Escalate";
import LeaderDecision from "../../Modals/Decision";
import AppealDecision from "../../Modals/Appeal";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import TextToSpeech from "@/components/TTS";
import AcceptDecision from "../../Modals/Decision/AcceptDecision";
import LocationTracker from "../../Modals/LocationTracker";
import { useDisclosure } from "@mantine/hooks";
import { getMyProfile } from "@/utils/funcs/funcs";
import { FaLocationCrosshairs } from "react-icons/fa6";

interface DecodedToken {
  role: any;
}

export default function ProblemActions({
  data,
  setOpenedProblem,
  setOpenView,
}: {
  data: Problem;
  type?: string;
  setOpenedProblem: (params: any) => void;
  setOpenView: (params: any) => void;
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEscalate, setOpenEscalate] = useState(false);
  const [openDecision, setOpenDecision] = useState(false);
  const [openAppeal, setOpenAppeal] = useState(false);
  const [userType, setUserType] = useState<any>();
  const [isTrack, { open, close }] = useDisclosure(false);
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token as string);
        setUserType(decoded.role);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);
  const deleteProblem = () => {
    setOpenDelete(true);
  };
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <span className="cursor-pointer flex justify-center">
          <HiDotsVertical />
        </span>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => setOpenDecision(true)}
          leftSection={<FaRegEye style={{ width: rem(14), height: rem(14) }} />}
        >
          <div
            className="pr-4 w-full flex justify-start items-center gap-4 cursor-pointer"
            onClick={() => {
              setOpenedProblem(data);
              setOpenView(true);
            }}
          >
            <h5>View</h5>
          </div>
        </Menu.Item>
        {userType !== "UMUTURAGE" && (
          <Menu.Item
            onClick={open}
            leftSection={
              <FaLocationCrosshairs
                style={{ width: rem(14), height: rem(14) }}
              />
            }
          >
            <div className="pr-4 w-full flex justify-start items-center gap-4 cursor-pointer">
              <h5>Track Location</h5>
            </div>
          </Menu.Item>
        )}
        <Menu.Item
          leftSection={<TextToSpeech text={data?.ikibazo} showIcon={false} />}
        ></Menu.Item>
        <Menu.Item
          onClick={() => setOpenDecision(true)}
          leftSection={
            <LuMailCheck style={{ width: rem(14), height: rem(14) }} />
          }
        >
          <h5>Mark As Solved</h5>
        </Menu.Item>
        {(userType === "UMUTURAGE" && data.status === "REJECTED") ||
          (data.status === "WAITING_CITIZEN_RESPONSE" && (
            <Menu.Item
              onClick={() => setOpenAppeal(true)}
              leftSection={
                <HiDesktopComputer
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              <h5>Appeal</h5>
            </Menu.Item>
          ))}
        {userType === "UMUTURAGE" && (
          <Menu.Item
            leftSection={<FaEdit style={{ width: rem(14), height: rem(14) }} />}
          >
            <h5>Edit</h5>
          </Menu.Item>
        )}

        {userType !== "UMUTURAGE" && (
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

      <Modal
        opened={openDecision}
        onClose={() => setOpenDecision(false)}
        className="overflow-y-hidden relative"
        size={"lg"}
      >
        {userType === "UMUTURAGE" ? (
          <AcceptDecision
            problemId={data.id}
            close={() => setOpenDecision(false)}
          />
        ) : (
          <LeaderDecision
            problemId={data.id}
            close={() => setOpenDecision(false)}
            type={userType}
          />
        )}
      </Modal>

      {(userType === "UMUTURAGE" && data.status === "REJECTED") ||
        (data.status === "WAITING_CITIZEN_RESPONSE" && (
          <Modal
            opened={openAppeal}
            onClose={() => setOpenAppeal(false)}
            className="overflow-y-hidden relative"
            size={"lg"}
          >
            <AppealDecision
              problemId={data.id}
              close={() => setOpenAppeal(false)}
              type={userType}
            />
          </Modal>
        ))}
      <Modal opened={isTrack} onClose={close} size={"xl"}>
        <LocationTracker
          problem={data}
          location={{
            longitude: data?.longitude ?? 0,
            latitude: data?.latitude ?? 0,
          }}
        />
      </Modal>
    </Menu>
  );
}
