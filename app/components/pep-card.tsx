import {useEffect, useMemo, useRef, useState} from "react";
import {useFrame, useThree, type Vector3} from "@react-three/fiber";
import {useSearchParams} from "react-router";

import VCard from "vcard-creator";
import QRCode from "qrcode"

import {Image, RoundedBox, Text, useTexture} from "@react-three/drei"

import * as THREE from "three"

export default function PepCard(props: {position?: Vector3}) {
  const actualPosition: Vector3 = props.position ?? [0, 0, 0];
  const cardRef = useRef<THREE.Group>(null!)
  const [qr, setQr] = useState('');
  const [liCol, setLiCol] = useState<string>('#777')
  const [coCol, setCoCol] = useState<string>('#555')
  const {size} = useThree();
  const [scale, setScale] = useState(1);
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const job = searchParams.get('job') || '';
  const company = searchParams.get('company') || '';
  const companyWebsite = searchParams.get('companyWebsite') || '';
  const phone = searchParams.get('phone') || '';
  const email = searchParams.get('email') || '';
  const linkedin = searchParams.get('linkedin') || '';

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

  const ref = useRef<THREE.Mesh>(null!)
  const refLI = useRef<THREE.Mesh>(null!)
  const vcard = useMemo(() => {
    const card = new VCard();
    card.addName(name);
    card.addJobtitle(job);
    card.addCompany(company);
    card.addEmail(email);
    if (companyWebsite) card.addURL(companyWebsite, "Website");
    if (phone) card.addPhoneNumber(phone);
    if (linkedin) card.addSocial(linkedin, "LinkedIn");
    return card.toString();
  }, [name, job, company, email, linkedin, phone]);


  useEffect(() => {
    // @ts-ignore
    QRCode.toDataURL(vcard,
      {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.92,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF00"
        },
        width: 1000
      })
      .then((value: string) => setQr(value))
      .catch((error: Error) => {
        console.error('QR-Code Generierung fehlgeschlagen:', error);
        setQr('');
      });
  }, [vcard]);

  useEffect(() => {
    document.body.style.cursor = liCol !== '#777' ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [liCol]);

  useEffect(() => {
    document.body.style.cursor = coCol !== '#555' ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [coCol]);

  const pepTexture = useTexture("./pep_digital_rgb.png");

  const aspect = useMemo(() => {
    const image = pepTexture.image;
    if (!image) return 1
    return image.width / image.height;
  }, [pepTexture])

  function modifyWebsiteUrl(url: string) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    } else {
      return 'https://' + url;
    }
  }

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
      position={actualPosition}
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
        {name ?? 'Max Mustermann'}
      </Text>
      <Text position={[-1.3, 0.3, 0.02]} fontSize={0.12} anchorX='left' color="#555">
        {job}
      </Text><Text position={[-1.3, 0.10, 0.02]} fontWeight={600} fontSize={0.1} anchorX='left' color={coCol}
                   onPointerOver={() => setCoCol("hsl(63,91%,43%)")}
                   onPointerOut={() => setCoCol("#555")}
                   onClick={() => {
                     if (companyWebsite) window.open(modifyWebsiteUrl(companyWebsite), "_blank")
                   }}>
      {company}
    </Text>
      <Text position={[-1.3, -0.25, 0.02]} anchorX='left' fontSize={0.1} color="#777">
        {phone}
      </Text><Text position={[-1.3, -0.35, 0.02]} anchorX='left' fontSize={0.1} color="#777">
      {email}
    </Text>
      {qr && <Image position={[0.95, -0.2, 0.02]} scale={0.8} ref={ref} url={qr} transparent>
      </Image>}
      {linkedin &&
          <>
              <Image position={[-1.25, -0.5, 0.02]} url={"./linkedin.png"} scale={0.1} ref={refLI} transparent></Image>
              <Text position={[-1.15, -0.5, 0.02]} anchorX='left' fontSize={0.1} color={liCol}
                    onPointerOver={() => setLiCol("hsl(63,91%,43%)")}
                    onPointerOut={() => setLiCol("#777")}
                    onClick={() => window.open(modifyWebsiteUrl(linkedin), "_blank")}>
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