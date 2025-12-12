import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { OverlayPanel } from 'primereact/overlaypanel';

export function useUiActions() {
  const overlayRef = useRef<OverlayPanel>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (values: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(values).forEach(([key, value]) => {
      params.set(key, value ?? '');
    });
    setSearchParams(params, { replace: true });
    setModalVisible(false);
  };

  // Per-keystroke URL updates removed to avoid caret jump

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText((document.referrer ? 'https://advent.pep-digital.de/3/' : document.location + '/') +  window.location.search);
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
    copyToClipboard,
    handleInfoClick,
  };
}
