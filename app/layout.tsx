import Link from "next/link";
import "../styles/globals.css";
import { QuoteGeneratorCon } from '../components/temp';
import { SocialIcon } from 'react-social-icons';
import LinkedInIcon from '../components/LinkedInIcon';


export const metadata = {
  title: 'Xketum',
  description: 'Thoughts by Omar Aliyev',
  icons: {
    icon: [
      '/favico.ico?v=1',
    ],
  },
  manifest: '/site.webmanifest',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const header = (
    <header>
      <div className="text-center bg-slate-800 p-8 my-6 rounded-md">
        <Link href="/">
          <h1 className="text-5xl">Xketum</h1>
        </Link>
        <br />
      </div>
    </header>
  );
  
  const footer = (
    <footer>
      <div className="border-t border-slate-400 mt-12 py-6 text-center ttext-slate-400">
      <div>
      {/* Other content in your component */}
      
    </div>
    <SocialIcon url="https://www.linkedin.com/in/aliyevom/" />

      </div>
    </footer>
  );

  return (
    <html>
      <head>
        {/* Apply the link to Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bungee+Spice&family=Rubik+Doodle+Shadow&display=swap"
        />

         <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      </head>
      <body>
        <div className="custom-header-style"></div>
        <div className="mx-auto max-w-2xl px-6">
          {header}
          {children}
          {footer}
        </div>
      </body>
    </html>
  );
}
