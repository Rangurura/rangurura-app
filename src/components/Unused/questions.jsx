"use client";

import React, { useState } from "react";

const Questions = () => {
  // const [opened, setOpeted] = useState(0);
  // const [show, setShow] = useState(false);
  // const open = (id) =>{
  //     setOpeted(id)
  //     setShow(!show);
  // }
  const [opened, setOpened] = useState(null);
  const [show, setShow] = useState(false);

  const open = (id) => {
    setOpened(id === opened ? null : id);
    setShow(!show);
  };

  return (
    <section
      className="flex flex-col justify-start items-center gap-6 max-[420px]:p-6 p-10 bg-[#DCE0E6] md:pb-[10vh]"
      id="faqs"
    >
      <h3 className="font-bold max-[420px]:text-[30px] text-[2.4rem]">
        Frequently asked questions
      </h3>
      <p className="text-center">
        Lorem ipsum dolor sit, amet Nisi quasi itaque qui adipisci officia earum
        facere ducimus asperiores autem molestias! Facere doloremque at cum eum
        fugiat minima architecto!
      </p>
      <div className="grid grid-cols-2 max-[420px]:grid-cols-1 gap-x-4 gap-y-3 w-full mt-14 md:w-4/5">
        <div className="flex flex-col gap-4 max-[420px]:w-full w-full">
          <div className="flex max-[420px]:w-full flex-row justify-between bg-white p-4 rounded">
            <div>
              <h3 className="font-bold text-base">
              What types of problems are featured on the platform?
              </h3>
              <p
                className={
                  opened == 1 && show
                    ? "block  mt-3 mb-2 text-[90%]"
                    : "hidden" + " mt-3 mb-2 text-[90%]"
                }
              >
                Lorem ipsum dolor sit, amet Nisi quasi itaque qui adipisci
                officia earum facere ducimus asperiores autem molestias! Facere
                doloremque at cum eum fugiat minima architecto!
              </p>
            </div>
            <span onClick={() => open(1)}>
              <ion-icon
                name={opened === 1 && show ? "remove-outline" : "add-outline"}
                className="qsnicons"
              ></ion-icon>
            </span>
          </div>
          <div className="flex max-[420px]:w-full flex-row justify-between bg-white p-4 rounded">
            <div>
              <h3 className="font-bold text-base">
                How can I stay updated on new challenges and project developments?
              </h3>
              <p
                className={
                  opened == 2 && show
                    ? "block text-[90%]"
                    : "hidden text-[90%]" +
                      " transition delay-150 duration-300 "
                }
              >
                Lorem ipsum dolor sit, amet Nisi quasi itaque qui adipisci
                officia earum facere ducimus asperiores autem molestias! Facere
                doloremque at cum eum fugiat minima architecto!
              </p>
            </div>
            <span onClick={() => open(2)}>
              <ion-icon
                name={opened === 2 && show ? "remove-outline" : "add-outline"}
                className="qsnicons"
              ></ion-icon>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-[420px]:w-full w-full">
          <div className="flex max-[420px]:w-full flex-row justify-between bg-white p-4 rounded">
            <div>
              <h3 className="font-bold text-base">
                How is data privacy and security addressed in the submission process?
              </h3>
              <p
                className={
                  opened == 3 && show
                    ? "block  mt-3 mb-2 text-[90%]"
                    : "hidden text-[90%]" + " mt-3 mb-2"
                }
              >
                Lorem ipsum dolor sit, amet Nisi quasi itaque qui adipisci
                officia earum facere ducimus asperiores autem molestias! Facere
                doloremque at cum eum fugiat minima architecto!
              </p>
            </div>
            <span onClick={() => open(3)}>
              <ion-icon
                name={show && opened == 3 ? `remove-outline` : "add-outline"}
                className="qsnicons"
              ></ion-icon>
            </span>
          </div>
          <div className="flex max-[420px]:w-full flex-row justify-between bg-white p-4 rounded">
            <div>
              <h3 className="font-bold text-base">
                Are there any fees associated with participating in the challenges?
              </h3>
              <p
                className={
                  opened == 4 && show
                    ? "block  mt-3 mb-2 text-[90%]"
                    : "hidden text-[90%]" + " mt-3 mb-2"
                }
              >
                Lorem ipsum dolor sit, amet Nisi quasi itaque qui adipisci
                officia earum facere ducimus asperiores autem molestias! Facere
                doloremque at cum eum fugiat minima architecto!
              </p>
            </div>
            <span onClick={() => open(4)}>
              <ion-icon
                name={show && opened == 4 ? `remove-outline` : "add-outline"}
                className="qsnicons"
              ></ion-icon>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-[420px]:w-full w-full">
          <div className="flex max-[420px]:w-full flex-row justify-between bg-white p-4 rounded">
            <div>
              <h3 className="font-bold text-base">
                How can I provide feedback on the challenges and the platform itself?
              </h3>
              <p
                className={
                  opened == 5 && show
                    ? "block  mt-3 mb-2 text-[90%]"
                    : "hidden text-[90%]" + " mt-3 mb-2"
                }
              >
                Lorem ipsum dolor sit, amet Nisi quasi itaque qui adipisci
                officia earum facere ducimus asperiores autem molestias! Facere
                doloremque at cum eum fugiat minima architecto!
              </p>
            </div>
            <span onClick={() => open(5)}>
              <ion-icon
                name={show && opened == 5 ? `remove-outline` : "add-outline"}
                className="qsnicons"
              ></ion-icon>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-[420px]:w-full w-full">
          <div className="flex max-[420px]:w-full flex-row justify-between bg-white p-4 rounded">
            <div>
              <h3 className="font-bold text-base">
                Can I submit solutions to multiple challenges simultaneously?
              </h3>
              <p
                className={
                  opened == 6 && show
                    ? "block  mt-3 mb-2 text-[90%] text-justify"
                    : "hidden text-[90%] text-justify" + " mt-3 mb-2"
                }
              >
                Yes, participants can submit solutions to multiple challenges simultaneously. We encourage individuals to explore various problem domains and contribute their expertise across different areas.
              </p>
            </div>
            <span onClick={() => open(6)}>
              <ion-icon
                name={show && opened == 6 ? `remove-outline` : "add-outline"}
                className="qsnicons"
              ></ion-icon>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;
