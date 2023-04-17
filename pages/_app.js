import '../styles/globals.css'
export default function App({ Component, pageProps }) {
    console.log('-->', Component, pageProps);
    return <Component {...pageProps}/>
}