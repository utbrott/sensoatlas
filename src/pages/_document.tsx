import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.svg' />
          <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css'
            integrity='sha384-R4558gYOUz8mP9YWpZJjofhk+zx0AS11p36HnD2ZKj/6JR5z27gSSULCNHIRReVs'
            crossOrigin='anonymous'
          />
          <script
            defer
            src='https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js'
            integrity='sha384-z1fJDqw8ZApjGO3/unPWUPsIymfsJmyrDVWC8Tv/a1HeOtGmkwNd/7xUS0Xcnvsx'
            crossOrigin='anonymous'
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
