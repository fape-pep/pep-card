import {useEffect, useMemo, useRef, useState} from "react";
import {useFrame, useThree, type Vector3} from "@react-three/fiber";

import {Image, RoundedBox, Text, useTexture} from "@react-three/drei"

import * as THREE from "three"
import {useCardParams} from "~/components/hooks/card-params.hook";
import {modifyWebsiteUrl} from "~/components/utility/website.util";
import {useHoverCursor} from "~/components/hooks/hover-cursor.hook";
import {useQRCode} from "~/components/hooks/qr-code.hook";
import {useVCard} from "~/components/hooks/vcard.hook";


export default function PepCard() {
  const cardRef = useRef<THREE.Group>(null!)
  const ref = useRef<THREE.Mesh>(null!)
  const refLI = useRef<THREE.Mesh>(null!)

  const {size} = useThree();
  const [scale, setScale] = useState(1);

  const cardParams = useCardParams();
  const vcard = useVCard(cardParams);
  const qrCode = useQRCode(vcard);

  const linkedinHover = useHoverCursor('#777', "hsl(63,91%,43%)");
  const companyHover = useHoverCursor('#555', "hsl(63,91%,43%)");

  useEffect(() => {
    setScale(Math.min(1, size.width / 1000) - 0.2)
  }, [size.width])

  const [color, normalMap, roughnessMap] = useTexture([
    "./paper/Paper001_1K-JPG_Color.jpg",
    "./paper/Paper001_1K-JPG_NormalGL.jpg",
    "./paper/Paper001_1K-JPG_Roughness.jpg"
  ])

  for (const tex of [color, normalMap, roughnessMap]) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  }

  const pepTexture = useTexture("./pep_digital_rgb.png");

  const aspect = useMemo(() => {
    const image = pepTexture.image;
    if (!image) return 1
    return image.width / image.height;
  }, [pepTexture])


  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    cardRef.current.rotation.x = THREE.MathUtils.lerp(cardRef.current.rotation.x, Math.cos(t / 10) / 10, 0.1)
    cardRef.current.rotation.y = THREE.MathUtils.lerp(cardRef.current.rotation.y, Math.sin(t / 3) / 10, 0.1)
    cardRef.current.rotation.z = THREE.MathUtils.lerp(cardRef.current.rotation.z, Math.sin(t / 10) / 10, 0.1)
    cardRef.current.position.y = THREE.MathUtils.lerp(cardRef.current.position.y, (1 + Math.sin(t)) / 10, 0.1)
  })

  return (

    <group
      ref={cardRef}
      castShadow
      receiveShadow
      scale={scale}
    >
      <RoundedBox args={[3, 1.5, 0.02]} radius={0.01} smoothness={1}>
        <meshPhysicalMaterial
          map={color}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          color="#ffffff"
          roughness={0.9}
        />
      </RoundedBox>

      <Text position={[-1.3, 0.5, 0.02]} fontSize={0.2} anchorX='left' color="#111">
        {cardParams.name ?? 'Max Mustermann'}
      </Text>
      <Text position={[-1.3, 0.3, 0.02]} fontSize={0.12} anchorX='left' color="#555">
        {cardParams.job}
      </Text>
      <Text
        position={[-1.3, 0.10, 0.02]}
        fontWeight={600}
        fontSize={0.1}
        anchorX='left'
        color={companyHover.color}
        onPointerOver={companyHover.onPointerOver}
        onPointerOut={companyHover.onPointerOut}
        onClick={() => {
          if (cardParams.companyWebsite) window.open(modifyWebsiteUrl(cardParams.companyWebsite), "_blank")
        }}>
        {cardParams.company}
      </Text>
      <Text position={[-1.3, -0.25, 0.02]} anchorX='left' fontSize={0.1} color="#777">
        {cardParams.phone}
      </Text><Text position={[-1.3, -0.35, 0.02]} anchorX='left' fontSize={0.1} color="#777">
      {cardParams.email}
    </Text>
      {qrCode && <Image position={[0.95, -0.2, 0.02]} scale={0.8} ref={ref} url={qrCode} transparent>
      </Image>}
      {cardParams.linkedin &&
          <>
              <Image position={[-1.25, -0.5, 0.02]} url={"./linkedin.png"} scale={0.1} ref={refLI} transparent></Image>
              <Text
                  position={[-1.15, -0.5, 0.02]}
                  anchorX='left'
                  fontSize={0.1}
                  color={linkedinHover.color}
                  onPointerOver={linkedinHover.onPointerOver}
                  onPointerOut={linkedinHover.onPointerOut}
                  onClick={() => window.open(modifyWebsiteUrl(cardParams.linkedin), "_blank")}>
                  LinkedIn
              </Text>
          </>}

      <mesh position={[0, 0, -0.02]} rotation={[0, Math.PI, 0]} scale={0.5}>
        <planeGeometry args={[aspect, 1]}/>
        <meshBasicMaterial map={pepTexture} transparent/>
      </mesh>
    </group>
  )
}