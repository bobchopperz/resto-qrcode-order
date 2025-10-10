"use client";

import { useEffect, useState } from 'react';
import styles from './WhatsappPage.module.css';

export default function WhatsappPage() {
  const [whatsappGatewayUrl, setWhatsappGatewayUrl] = useState('');

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_WHATSAPP_GATEWAY_URL) {
      setWhatsappGatewayUrl(process.env.NEXT_PUBLIC_WHATSAPP_GATEWAY_URL);
    } else {
      console.error("Environment variable NEXT_PUBLIC_WHATSAPP_GATEWAY_URL is not set.");
    }
  }, []);

  if (!whatsappGatewayUrl) {
    return <div className={styles.container}>Memuat URL Whatsapp Gateway...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Whatsapp Gateway</h1>
      <div className={styles.iframeWrapper}>
        <iframe
          src={whatsappGatewayUrl}
          title="Whatsapp Gateway"
          className={styles.iframe}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
