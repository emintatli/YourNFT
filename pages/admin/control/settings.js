import Content from "../../../components/content"
import AdminNav from "../../../components/admin-nav";
import {useRef,useEffect,useState} from "react"
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import detectEthereumProvider from '@metamask/detect-provider';
import {loadContract} from "../../../utils/loadContract";
import Web3 from 'web3';
import { useTranslation } from 'react-i18next';
function Control() {
  const { t, i18n } = useTranslation();
  const apiData=useSelector(state=>state.user.apiData);
  const contractData=useSelector(state=>state.user.contractData);
  const walletData=useSelector(state=>state.user.wallet);
  const [data,setData]=useState("");
  const [loading,setLoading]=useState(false);
  const fb=useRef();
  const tw=useRef();
  const dc=useRef();
  const medium=useRef();
  const fblink=useRef();
  const twlink=useRef();
  const dclink=useRef();
  const mediumlink=useRef();
  const langSelect=useRef();
  const whiteListAcc=useRef();
  const whiteListPrice=useRef();
  const changeAdminAccount=useRef();
  const NFTPrice=useRef();
  useEffect(()=>{
    if(!localStorage.getItem("nft-jwt")){
      Router.push('/')
    }
  },[])

  const socialSaveHandler=async()=>{
    setLoading(true);
    if(localStorage.getItem("nft-jwt")){
      const res=await fetch("/api/update",{
        method:"POST",
        body:JSON.stringify({
          jwt:localStorage.getItem("nft-jwt"),
          updated:{
            social:{
              dc:{status:dc.current.checked,link:dclink.current.value},
              fb:{status:fb.current.checked,link:fblink.current.value},
              medium:{status:medium.current.checked,link:mediumlink.current.value},
              tw:{status:tw.current.checked,link:twlink.current.value},
            }
          }
        })
      })
      const response=await res.json();
      if(response.matchedCount>=1){
        toast(t("SAVED_S"));
      }
      else{
        toast(t("TOAST_ERROR"));
      }
      setLoading(false);
    }
  }
  const langSaveHandler=async()=>{
    setLoading(true);
    if(localStorage.getItem("nft-jwt")){
      const res=await fetch("/api/update",{
        method:"POST",
        body:JSON.stringify({
          jwt:localStorage.getItem("nft-jwt"),
          updated:{
            lang:langSelect.current.value
          }
        })
      })
      const response=await res.json();
      if(response.matchedCount>=1){
        toast(t("SAVED_S"));
      }
      else{
        toast(t("TOAST_ERROR"));
      }
      setLoading(false);
    }
   
  }

  const addWhiteListHandler=async()=>{
      await toast.promise(
        async()=>{
          const provider2=await detectEthereumProvider();
          const contract2=await loadContract(contractData.name,provider2);
          (await contract2.addWhiteListAdress(whiteListAcc.current.value,{from:walletData}));
        },
        {
          pending:t("TOAST_WAITING"),
          success: t("TOAST_S"),
          error: t("TOAST_ERROR")
        }
    );

  }
  const whiteListPriceChangeHandler=async()=>{
    await toast.promise(
      async()=>{
        const provider2=await detectEthereumProvider();
        const contract2=await loadContract(contractData.name,provider2);
        (await contract2.changeWhiteListedPrice(Web3.utils.toWei(whiteListPrice.current.value, 'ether'),{from:walletData}));
      },
      {
        pending:t("TOAST_WAITING"),
        success: t("TOAST_S"),
        error: t("TOAST_ERROR")
      }
  );

}
const changeAdminAccountHandler=async()=>{
  await toast.promise(
    async()=>{
      const provider2=await detectEthereumProvider();
      const contract2=await loadContract(contractData.name,provider2);
      (await contract2.changeOwner(changeAdminAccount.current.value,{from:walletData}));
    },
    {
      pending:t("TOAST_WAITING"),
      success: t("TOAST_S"),
      error: t("TOAST_ERROR")
    }
);

}

const changeNFTPrice=async()=>{
  await toast.promise(
    async()=>{
      const provider2=await detectEthereumProvider();
      const contract2=await loadContract(contractData.name,provider2);
      (await contract2.changeNFTPrice(
        Web3.utils.toWei(NFTPrice.current.value, 'ether'),{from:walletData}));
    },
    {
      pending:t("TOAST_WAITING"),
      success: t("TOAST_S"),
      error: t("TOAST_ERROR")
    }
);

}

  return (
    <Content bg="true">
        <ToastContainer 
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
        <AdminNav active="settings"/>
        <div className="card p-3 settings-align">
  

<article className="message is-link">
  <div className="message-header">
    <p>{t("ADMIN_SOC_SET")}</p>
  </div>
  {apiData.social?<div className="message-body">
        <input ref={fb} defaultChecked={apiData&&apiData.social.fb.status} type='checkbox' className='ios8-switch d-none' id='checkbox-5'/>
        <label htmlFor='checkbox-5'>{t("FB_AC")}</label><br/><input ref={fblink} defaultValue={apiData&&apiData.social.fb.link} className="input is-link my-2" type="text" placeholder="Facebook adress"/>
        <input ref={tw} defaultChecked={apiData&&apiData.social.tw.status} type='checkbox' className='ios8-switch d-none' id='checkbox-6'/>
        <label htmlFor='checkbox-6'>{t("TW_AC")}</label><br/><input ref={twlink} defaultValue={apiData&&apiData.social.tw.link} className="input is-link my-2" type="text" placeholder="Twitter adress"/>
        <input ref={dc} defaultChecked={apiData&&apiData.social.dc.status} type='checkbox' className='ios8-switch d-none' id='checkbox-7'/>
        <label htmlFor='checkbox-7'>{t("DC_AC")}</label><br/><input ref={dclink} defaultValue={apiData&&apiData.social.dc.link} className="input is-link my-2" type="text" placeholder="Discord adress"/>
        <input ref={medium} defaultChecked={apiData&&apiData.social.medium.status} type='checkbox' className='ios8-switch d-none' id='checkbox-8'/>
        <label htmlFor='checkbox-8'>{t("MED_AC")}</label><br/><input ref={mediumlink} defaultValue={apiData&&apiData.social.medium.link} className="input is-link my-2" type="text" placeholder="Medium adress"/>
    <button onClick={socialSaveHandler} className={`${loading&&"is-loading"} button is-link w-100`}>{t("SAVE")}</button>
  </div>:<div className="message-body is-flex is-justify-content-center"><div className="lds-facebook"><div></div><div></div><div></div></div></div>}
  
</article>

<article className="message is-link">
  <div className="message-header">
    <p>{t("LANG_SETTINGS")}</p>
  </div>
  <div className="message-body">
  <div className="select is-link">
  <select ref={langSelect}>
    <option value="EN" selected={apiData&&apiData.lang==="EN"}>English</option>
    <option value="TR" selected={apiData&&apiData.lang==="TR"}>Türkçe</option>
  </select>
</div>
<button onClick={langSaveHandler} className={`${loading&&"is-loading"} button is-link w-100 mt-2`}>{t("SAVE")}</button>
  </div>
</article>

<article className="message is-danger">
  <div className="message-header">
    <p>{t("CONTRACT_SETTINGS")}</p>
  </div>
  <div className="message-body">
    <label>{t("CONTRACT_NFT_PRICE")}</label>
  <div className="is-flex mb-2"><input ref={NFTPrice} className="input is-danger mr-2" type="number" placeholder={t("CONTRACT_NFT_PRICE2")}/><button onClick={changeNFTPrice} className="button is-danger"><i className="fas fa-exclamation-triangle mr-2"></i>{t("SAVE")}</button></div>
  <label>{t("CONTRACT_WNFT_PRICE")}</label>
  <div className="is-flex mb-2"><input ref={whiteListPrice} className="input is-danger mr-2" type="number" placeholder={t("CONTRACT_WNFT_PRICE2")}/><button onClick={whiteListPriceChangeHandler} className="button is-danger"><i className="fas fa-exclamation-triangle mr-2"></i>{t("SAVE")}</button></div>
  <label>{t("CONTRACT_WNFT_ACC")}</label>
  <div className="is-flex mb-2"><input ref={whiteListAcc} className="input is-danger mr-2" type="text" placeholder={t("CONTRACT_WNFT_ACC2")}/><button onClick={addWhiteListHandler} className="button is-danger"><i className="fas fa-exclamation-triangle mr-2"></i>{t("SAVE")}</button></div>
  <label>{t("CONTRACT_ADMIN")}</label>
  <div className="is-flex mb-2"><input ref={changeAdminAccount} className="input is-danger mr-2" type="text" placeholder={t("CONTRACT_ADMIN2")}/><button onClick={changeAdminAccountHandler} className="button is-danger"><i className="fas fa-exclamation-triangle mr-2"></i>{t("SAVE")}</button></div>
  </div>
</article>


 

        </div>
        

    </Content>
  );
}

export default Control;
