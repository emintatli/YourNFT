import '../styles/globals.css'
import players from "../stores/players";
import {Provider} from "react-redux";
import Navbar from '../components/navbar';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import './i18n';
function MyApp({ Component, pageProps }) {
  return <>
  <Provider store={players}>
  <Head>
        <title>NFT Mint</title>
        <meta charset="UTF-8"/>
        <meta name="description" content="Mint your NFT now."/>
        <meta name="keywords" content="nft,blockchain,crypto currency"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
    <div className="body ">
  <div className="container ">
  <Navbar/>
  <Component {...pageProps} />
  </div>
  </div>
  </Provider>
  </>
}

export default MyApp
