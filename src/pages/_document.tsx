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
            href='https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css'
            integrity='sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0'
            crossOrigin='anonymous'
          />
          <script
            defer
            src='https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js'
            integrity='sha384-PwRUT/YqbnEjkZO0zZxNqcxACrXe+j766U2amXcgMg5457rve2Y7I6ZJSm2A0mS4'
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
