import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import {
  GradientBackgroundCon,
  FooterCon,
  FooterLink,
  RedSpan,
} from '@/components/QuoteGenerator/QuoteGeneratorElements'

export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<number>(0);

  return (
    <>
      <Head>
        <title>CHECK</title>
      </Head>
      <GradientBackgroundCon>
        <FooterCon>
          <>
            Quotes Generated: {numberOfQuotes}
            <br />
            Developed with <RedSpan>♥</RedSpan> by{' '}
            <FooterLink href="" target="_blank" rel="noopener noreferrer">
              @?
            </FooterLink>
          </>
        </FooterCon>
      </GradientBackgroundCon>
    </>
  );
}
