import Link from 'next/link'
import {useState,useEffect} from "react";
import {useDispatch } from 'react-redux';
import {userActions} from "../stores/players";
import Web3 from 'web3';
import {loadContract} from "../utils/loadContract"
import detectEthereumProvider from '@metamask/detect-provider';
import { useTranslation } from 'react-i18next';
import Image from 'next/image'
function Navbar(){
  const [apiData,setapiData]=useState("");
  const { t, i18n } = useTranslation();
  const [contractData,setcontractData]=useState("");
  const [loading,setLoading]=useState(false);
  const [wallet,setWallet]=useState("");
  const dispatch=useDispatch();
  useEffect(async()=>{
    setLoading(true);
    const request=await fetch("/api/load");
    const response=await request.json();
    i18n.changeLanguage(response.lang, (err, t) => {
      t('key'); // -> same as i18next.t
    });
    const provider=new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/28e6a305c46440f5ade79261f21a317b');
    const web3api=new Web3(provider);
    const contract=await loadContract("NFT",provider);
    let info={
      maxMintLimit:(await contract.maxMintLimit()).words[0],
      minted:(await contract.totalMint()).words[0],
      maxLength:(await contract.maxLength()).words[0],
      wallet:await contract.owner(),
      name:await contract.nftName(),
      chain:await contract.chain(),
      price:(await contract.normalPrice()).toString(10),
      contract_balance:await web3api.eth.getBalance(contract.address),
      whitelist_address:await contract.getWhiteListAddress(),
      whiteListPrice:(await contract.whiteListPrice()).toString(10),
      whiteListed:false
    }
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: info.chain }],
      });
      const provider2=await detectEthereumProvider();
      const web3api2=new Web3(provider2);
      const account= (await web3api2.eth.getAccounts())[0];
      dispatch(userActions.setWallet({wallet:account}))
      setWallet(account)
    
    const whiteListedBool=info.whitelist_address.filter((v)=>v==account);
    if(whiteListedBool.length>0){
      info={
        ...info,
        price:info.whiteListPrice,
        whiteListed:true
      }
    }
    setcontractData(info);
    setapiData(response);
    dispatch(userActions.setAlldata({apiData:response,contractData:info}))
    setLoading(false);
  },[]);

  const loginMetamask=async()=>{
    
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: contractData.chain }],
    });
    const provider=await detectEthereumProvider();
    const web3api=new Web3(provider);
    const account= (await web3api.eth.getAccounts())[0];

    dispatch(userActions.setWallet({wallet:account}))
    setWallet(account)
  }

const [mobileNav,setMobileNav]=useState(false);
    return (
     <>
     <div className={`${!loading&&"d-none"} full-load`}><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
     <nav className="navbar px-3 card card-nav" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item">
    <Link href="/" className="is-flex is-align-items-center" >
    <><Image width="30px" height="30px" src="/blockchain.png" className=""/><b className="ml-2">{apiData&&apiData.nft_name}</b></>
    </Link>
    
    </a>

    <a role="button" onClick={()=>{setMobileNav(!mobileNav)}} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className={`navbar-menu ${mobileNav&&"is-active"}`}>
    <div className="navbar-start">
    <Link href="/">
      <a className="navbar-item">
        Mint
      </a>
      </Link>
      <Link href="/documentation">
      <a className="navbar-item">
      {t("DOUMENTATION")}
      </a>
      </Link> 
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link more">
        {t("MORE")}
        </a>

        <div className="navbar-dropdown">
        <Link href="/about">
          <a className="navbar-item">
          {t("ABOUT")}
          </a>
          </Link>
          <Link href="/contact">
          <a className="navbar-item">
          {t("CONTACT")}
          </a>
          </Link>
          <hr className="navbar-divider"/>
         {(wallet===contractData.wallet)&&<Link href="/admin">
          <a className="navbar-item">
          {t("ADMIN_LOGIN")}
          </a>
          </Link>} 
        </div>
      </div>
    </div>

    <div className="navbar-end">
      <div className="navbar-item is-flex is-align-items-center">
  
          <a onClick={loginMetamask} className="button is-primary">
            <strong className="is-flex is-align-items-center"><Image height="30px" width="30px" src="/metamask.png" className=""/><span className="mobile-short">{wallet?wallet:t("METAMASK_BUTTON")}</span></strong>
          </a>
        <div className={`${mobileNav&&"d-none"}`}>
        {apiData&&apiData.social.fb.status&&<a href={apiData&&apiData.social.fb.link} className="px-2">
        <Image height="50px" width="50px" src="/facebook.png"/>
        </a>}
        {apiData&&apiData.social.tw.status&&<a href={apiData&&apiData.social.tw.link} className="px-2">
        <Image height="50px" width="50px" src="/twitter.png"/>
        </a>}
        {apiData&&apiData.social.dc.status&&<a href={apiData&&apiData.social.dc.link} className="px-2">
        <Image height="50px" width="50px" src="/discord.png"/>
        </a>}
        {apiData&&apiData.social.medium.status&& <a href={apiData&&apiData.social.medium.link} className="px-2">
        <Image height="50px" width="50px" src="/medium.png"/>
        </a>}
        </div>
      </div>
    </div>
  </div>
</nav>
     </>
    );
  }
  
  export default Navbar;
  