import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "../AudioPlayerContext";
import { useMicrophone } from "../MicrophoneContext";

interface AudioAnalyzerContextProps {}

const AudioAnalyzerContext = createContext<
  AudioAnalyzerContextProps | undefined
>(undefined);

const AudioAnalyzerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { audio: microphoneAudio } = useMicrophone();
  const { audio: playerAudio } = useAudioPlayer();

  const audioContext = useRef<AudioContext>();
  const analyzer = useRef<AnalyserNode>();
  const dataArray = useRef<Uint8Array>();
  const source = useRef<
    MediaStreamAudioSourceNode | MediaElementAudioSourceNode
  >();

  const [isInitialized, setIsInitialized] = useState(false);
  console.count("AudioAnalyzerProvider");

  useEffect(() => {
    // if (!isInitialized) {
    //   console.log("initializing");
    //   setIsInitialized(true);
    // }
    // return () => {
    //   setIsInitialized(false);
    // };
  }, [isInitialized]);

  //   useEffect(() => {
  //     if (!isInitialized && (microphoneAudio || playerAudio)) {
  //       const newAudioContext = new window.AudioContext();
  //       const newAnalyzer = newAudioContext.createAnalyser();
  //       const newDataArray = new Uint8Array(newAnalyzer.frequencyBinCount);

  //       let newSource;
  //       // audioContext.current = new window.AudioContext();
  //       // analyser.current = audioContext.current.createAnalyser();
  //       // dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);

  //       if (microphoneAudio) {
  //         newSource = newAudioContext.createMediaStreamSource(microphoneAudio);
  //       } else if (playerAudio && !newSource) {
  //         newSource = newAudioContext.createMediaElementSource(playerAudio);
  //       }

  //       if (newSource) {
  //         // newSource.connect(newAnalyzer);
  //         // analyzer.current = newAnalyzer;
  //         // dataArray.current = newDataArray;
  //         // audioContext.current = newAudioContext;
  //       }

  //       // source.current = newSource;

  //       setIsInitialized(true);
  //     }

  //     return () => {
  //       if (isInitialized) {
  //         analyzer.current?.disconnect();
  //         source.current?.disconnect();
  //         audioContext.current?.close();

  //         setIsInitialized(false);
  //         console.log("cleaned up");
  //       }
  //     };
  //   }, [playerAudio, microphoneAudio, isInitialized]);

  const contextValue: AudioAnalyzerContextProps = {};

  return (
    <AudioAnalyzerContext.Provider value={contextValue}>
      {children}
    </AudioAnalyzerContext.Provider>
  );
};

const useAudioAnalyzer = () => {
  const context = useContext(AudioAnalyzerContext);

  if (!context) {
    throw new Error(
      "useAudioAnalyzer must be used within an AudioAnalyzerProvider"
    );
  }
  return context;
};

export { AudioAnalyzerProvider, useAudioAnalyzer };
