import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { OverlayPanel } from 'primereact/overlaypanel';

export function useUiActions() {
  const overlayRef = useRef<OverlayPanel>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, e.target.value);
    setSearchParams(params);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    overlayRef.current?.toggle(e);
  };

  return {
    overlayRef,
    modalVisible,
    setModalVisible,
    handleSubmit,
    handleChange,
    copyToClipboard,
    handleInfoClick,
  };
}
