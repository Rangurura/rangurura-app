import React from "react";
import { FaMicrophone } from "react-icons/fa";
// import Speech from 'react-speech';

export default function TextToSpeech({
  text,
  showIcon,
}: {
  text: string;
  showIcon?: boolean;
}) {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  return (
    <div className="w-full flex justify-center">
      <button onClick={speak} className="flex space-x-3">
        {!showIcon && <FaMicrophone className="mt-1" />}
        <span className="">Listen</span>
      </button>
    </div>
  );
}
