import '@/styles/globals.css'
import Head from 'next/head';
import { Fragment } from 'react';
import type { AppProps } from 'next/app'
import React from 'react'
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <React.Fragment>
      
    <Component {...pageProps} />
  </React.Fragment>
  )
}
