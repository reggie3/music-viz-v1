import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AudioContextProps {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef(new Audio("/Denys_Kyshchuk_Upbeat_Inspiring.mp3"));

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // useEffect(() => {
  //   setAudio(audioRef.current);

  //   return () => {
  //     setAudio(null);
  //   };
  // }, []);

  const play = () => {
    audioRef.current.play();
    // debugger;
    console.log("playing");
    setIsPlaying(true);
    setAudio(audioRef.current);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      pause(); // Pause the audio when the component unmounts
    };
  }, []);

  const contextValue: AudioContextProps = {
    isPlaying,
    play,
    pause,
    audio,
  };

  console.count(`AUdioPlayerCOntext, ${isPlaying}`);
  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

const useAudioPlayer = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioProvider");
  }
  return context;
};

export { AudioProvider, useAudioPlayer };
