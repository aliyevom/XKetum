import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import {
  GradientBackgroundCon,
  FooterCon,
  FooterLink,
  RedSpan,
   GenerateQuoteButton, GenerateQuoteButtonText, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle,
} from '@/components/QuoteGenerator/QuoteGeneratorElements'

export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<number>(0);

  return (
    <>
      <Head>
        <title>CHECK</title>
      </Head>
      <GradientBackgroundCon>


      <QuoteGeneratorCon>
        {/* <QuoteGeneratorInnerCon>
            <QuoteGeneratorTitle>
              Daily Inspiration Generator
            </QuoteGeneratorTitle>

            <QuoteGeneratorSubTitle>
              Looking for a splash of inspiration? Generate a quote card with a random inspirational quote provided by <FooterLink href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">ZenQuotes API</FooterLink>.
            </QuoteGeneratorSubTitle>

            <GenerateQuoteButton onClick={null}>
              <GenerateQuoteButtonText>
                Make a Quote
              </GenerateQuoteButtonText>
            </GenerateQuoteButton>
  </QuoteGeneratorInnerCon> */}
        </QuoteGeneratorCon>
        {/*<FooterCon>
          <>
            Quotes Generated: {numberOfQuotes}
            <br />
            Developed with <RedSpan>♥</RedSpan> by{' '}
            <FooterLink href="" target="_blank" rel="noopener noreferrer">
              @?
            </FooterLink>
          </>
</FooterCon> */}
      </GradientBackgroundCon>
    </>
  );
}
