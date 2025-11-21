import {useEffect, useState} from "react";
import QRCode from "qrcode";

export function useQRCode(vcard: string): string {
  const [qr, setQr] = useState('');

  useEffect(() => {
    // @ts-ignore
    QRCode.toDataURL(vcard, {
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

  return qr;
}