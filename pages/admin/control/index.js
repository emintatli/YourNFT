import Content from "../../../components/content";
import AdminNav from "../../../components/admin-nav";
import Link from 'next/link';
import {useRef,useEffect,useState} from "react"
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import detectEthereumProvider from '@metamask/detect-provider';
import {loadContract} from "../../../utils/loadContract"
import Web3 from 'web3';
import { useTranslation } from 'react-i18next';
function Control() {
  const { t, i18n } = useTranslation();
  const contractData=useSelector(state=>state.user.contractData);
  const walletData=useSelector(state=>state.user.wallet);
  useEffect(()=>{
    if(!localStorage.getItem("nft-jwt")){
      Router.push('/')
    }
  },[])
  
  const cashoutHandler=async()=>{
    if(walletData){
      await toast.promise(
        async()=>{
          const provider=await detectEthereumProvider();
          const contract=await loadContract(contractData.name,provider);
          (await contract.claimBalance(contractData.contract_balance,{from:walletData}));
        },
        {
          pending: t("TOAST_WAITING"),
          success: t("ADMIN_CASHOUT_SUC"),
          error: t("TOAST_ERROR")
        }
    );
    }
    else{
      toast(t("TOAST_LOGIN_NEEDED"));
    }

  }
  
 
  return (<>
  {contractData.name&&<Content bg="true">
  <ToastContainer 
      position="bottom-right"
      style={{width:"max-content"}}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
    <AdminNav active="main"/>
    <div className="card mt-1">
    <nav className="level p-3">
    <div className="level-item has-text-centered">
    <div>
      <p className="heading">{t("ADMIN_CHAIN")}</p>
      <p className="title">{contractData.chain}</p>
    </div>
  </div>
  <div className="level-item has-text-centered">
    <div>
      <p className="heading">{t("ADMIN_TOTAL_INCOME")}</p>
      <p className="title">{parseFloat((contractData.minted*Web3.utils.fromWei(`${contractData.price}`,"ether"))).toFixed(3)} {t("CURRENCY")}</p>
    </div>
  </div>
  <div className="level-item has-text-centered">
    <div>
      <p className="heading">{t("ADMIN_NFT_PRICE")}</p>
      <p className="title">{contractData.price&&Web3.utils.fromWei(contractData.price,"ether")} {t("CURRENCY")}</p>
      <Link href="/admin/control/settings"><p className="is-size-6 is-underlined has-text-link"><i className="fas fa-edit mr-2"></i>{t("ADMIN_CHANGE")}</p></Link>
    </div>
  </div>
  <div className="level-item has-text-centered ">
    <div className="notification is-primary balance-padding">
      <p className="heading">{t("ADMIN_CONTRACT_BALANCE")}</p>
      <p className="title">{Web3.utils.fromWei(contractData.contract_balance,"ether")} {t("CURRENCY")}</p>
      <button onClick={cashoutHandler} className="button is-light mt-2 is-small"><p className="is-size-6 "><i className="fas fa-coins mr-2"></i>{t("ADMIN_CASHOUT")}</p></button>
    </div>
  </div>
</nav>

    </div>
    <div className="card mt-1 p-3">
    <p className="heading">{t("ADMIN_TOTAL_SALES")}</p>
    
    <p className="title mb-2">{contractData.minted}/{contractData.maxMintLimit}</p>
    <progress className="progress is-success" value={contractData.minted} max={contractData.maxMintLimit}></progress>
    </div>
    <div className="card mt-1 p-3">
    
    <article className="message is-primary">
  <div className="message-header">
    <p>{t("ADMIN_NOTIFICATION_TITLE")}</p>
  </div>
  <div className="message-body">
    {t("ADMIN_NOTIFICATION")}
       </div>
</article>

    </div>
    </Content>}
    </>
  );
}

export default Control;
