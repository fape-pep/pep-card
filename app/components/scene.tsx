import {Canvas} from "@react-three/fiber"
import {ContactShadows, OrbitControls} from "@react-three/drei"
import PepCard from "~/components/pep-card";
import Model from "~/components/model";
import Ui from "~/components/ui";


export function Scene() {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{position: [0, 0, 3], fov: 50}}
        style={{background: "#119f00", position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}
        shadows
      >

        <ambientLight intensity={1}/>
        <directionalLight
          position={[3, 3, 2]}
          intensity={5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <PepCard/>

        <Model position={[3, -0.25, -2]} model={'./gifts.glb'}/>
        <Model position={[-2, 0.9, -2.5]} scale={[3, 3, 3]} model={'./ctree.glb'}/>
        <Model position={[-0.5, -1.6, 0.5]} scale={[0.5, 0.5, 0.5]} rotation={[Math.PI / 2, Math.PI, Math.PI / 3]}
               model={'./ccane.glb'}/>

        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.3}
          scale={10}
          blur={1}
        />

        <OrbitControls enableZoom={true} enablePan={false}/>
      </Canvas>
      <Ui/>
    </div>
  )
}



