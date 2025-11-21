import React, {type RefObject} from 'react';
import {Button} from "primereact/button";
import {OverlayPanel} from "primereact/overlaypanel";

interface ActionButtonsProps {
  attributionItems: string[];
  onCreateClick: () => void;
  onCopyClick: () => void;
  onInfoClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  overlayRef: RefObject<OverlayPanel | null>;
}


export function ActionButtons({
                                attributionItems,
                                onCreateClick,
                                onCopyClick,
                                onInfoClick,
                                overlayRef
                              }: ActionButtonsProps) {
  return (
    <>
      <Button
        style={{position: "absolute"}}
        className="top-5 right-5 pulse"
        severity="warning"
        onClick={onCreateClick}
      >
        Hier die eigenen Daten eingeben
      </Button>

      <Button
        style={{position: "absolute"}}
        className="bottom-5 right-5"
        onClick={onCopyClick}
      >
        Hier den Link zur eigenen Visitenkarte kopieren und versenden
      </Button>

      <Button
        style={{position: "absolute"}}
        className="bottom-5 left-5"
        icon="pi pi-info-circle"
        rounded
        severity="info"
        onClick={onInfoClick}
      />

      <OverlayPanel ref={overlayRef} showCloseIcon>
        <ul>
          {attributionItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </OverlayPanel>
    </>
  );
}
