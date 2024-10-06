import { Modal } from "@mantine/core";
import { BsExclamationCircle } from "react-icons/bs";

const VerifyInfoModal = ({
  opened,
  close,
  onSubmit,
  isSubmitting,
}: {
  opened: boolean;
  close: () => void;
  onSubmit: (e: any) => void;
  isSubmitting: boolean;
}) => {
  return (
    <Modal opened={opened} onClose={close} size={"md"}>
      <div className="w-full h-full flex flex-col items-center py-10">
        <div className="w-4/5 h-full flex flex-col items-center">
          <BsExclamationCircle className="w-14 h-14 text-red-500" />
          <p className="text-center mt-6">
            "Verify the accuracy of the provided information. Incorrect details
            may result in actions from our leaders. Thank you for your
            cooperation."
          </p>
          <div className="w-full flex justify-between items-center mt-10">
            <button
              onClick={close}
              className="py-2 px-8 text-base bg-[#FAD20141]"
            >
              Review
            </button>
            <button
              disabled={isSubmitting}
              onClick={onSubmit}
              className="py-2 px-8 text-base bg-[#00D56025]"
            >
              {isSubmitting ? "Submitting . . ." : "Finish"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default VerifyInfoModal;
