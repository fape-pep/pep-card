import {useLoader, type Vector3} from "@react-three/fiber";
import {GLTFLoader} from "three-stdlib";

export default function Model(props: { position: Vector3, scale?: Vector3, model: string, rotation?: Vector3 }) {
  const model = useLoader(GLTFLoader, props.model)
  const actualScale = props.scale ?? [1, 1, 1]
  const actualPosition = props.position ?? [0, 0, 0]
  const actualRotation = props.rotation ?? [0, 0, 0]
  return (
    <primitive object={model.scene} position={actualPosition} scale={actualScale} rotation={actualRotation}/>
  )
}