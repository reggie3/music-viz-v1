import { useState } from "react";

const useMicrophone = () => {
  const [audio, setAudio] = useState<MediaStream | null>(null);

  const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAudio(audio);
  };

  const stopMicrophone = () => {
    if (audio) {
      audio.getTracks().forEach((track) => track.stop());
    }
  };

  const toggleMicrophone = () => {
    if (audio) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };
  return { audio, toggleMicrophone };
};

export default useMicrophone;
