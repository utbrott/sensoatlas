import Document, { Html, Head, Main, NextScript } from 'next/document';

class Doc extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.svg' />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter&display=swap'
            rel='stylesheet'
          />
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css'
          />
          <script defer src='https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js'></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Doc;
