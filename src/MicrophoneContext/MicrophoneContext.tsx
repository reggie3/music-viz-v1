import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface MicrophoneContextProps {
  isRecording: boolean;
  startMicrophone: () => void;
  stopMicrophone: () => void;
  audio: MediaStream | null;
}

const MicrophoneContext = createContext<MicrophoneContextProps | undefined>(
  undefined
);

interface MicrophoneProviderProps {
  children: ReactNode;
}

const MicrophoneProvider: React.FC<MicrophoneProviderProps> = ({
  children,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [stream]);

  const startMicrophone = useCallback(async () => {
    try {
      const userMedia = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setStream(userMedia);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }, []);

  const stopMicrophone = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
      setIsRecording(false);
    }
  }, [stream]);

  const contextValue = {
    isRecording,
    startMicrophone,
    stopMicrophone,
    audio: stream,
  };

  return (
    <MicrophoneContext.Provider value={contextValue}>
      {children}
    </MicrophoneContext.Provider>
  );
};

export const useMicrophone = (): MicrophoneContextProps => {
  const context = useContext(MicrophoneContext);
  if (!context) {
    throw new Error("useMicrophone must be used within a MicrophoneProvider");
  }
  return context;
};

export default MicrophoneProvider;
