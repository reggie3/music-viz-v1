import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3DEventMap,
} from "three";
import { useMicrophone } from "../MicrophoneContext";
import { useAudioAnalyzer } from "../AudioAnalyzerContext/AudioAnalyzerContext";

const Viz1 = () => {
  const boxMeshRef =
    useRef<
      Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null);
  // const { getAudioData } = useAnalyzer();
  const { isRecording } = useMicrophone();

  //  useAudioAnalyzer();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((state, _delta, _xrFrame) => {
    if (boxMeshRef.current) {
      boxMeshRef.current.rotation.y = 1 * state.clock.elapsedTime;

      if (isRecording) {
        // const audioData = getAudioData();
        // console.log(audioData);
      }
    }
  });

  return <Box args={[1, 1, 1]} position={[0, 0, 0]} ref={boxMeshRef} />;
};

export default Viz1;
