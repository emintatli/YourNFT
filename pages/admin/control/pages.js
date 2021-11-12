import Content from "../../../components/content"
import AdminNav from "../../../components/admin-nav";
import {useRef,useEffect,useState} from "react"
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
function Control() {
  const { t, i18n } = useTranslation();
  const apiData=useSelector(state=>state.user.apiData);
  const [data,setData]=useState("");
  const [loading,setLoading]=useState(false);
  const doc=useRef();
  const about=useRef();
  useEffect(()=>{
    if(!localStorage.getItem("nft-jwt")){
      Router.push('/')
    }
  },[])
  
  const docSaveHandler=async()=>{
    setLoading(true);
    if(localStorage.getItem("nft-jwt")){
      const res=await fetch("/api/update",{
        method:"POST",
        body:JSON.stringify({
          jwt:localStorage.getItem("nft-jwt"),
          updated:{
            pages:{
              about:about.current.value,
              documentation:doc.current.value
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
       <AdminNav active="pages"/>
<div className="card">
<section class="hero is-info">
  <div class="hero-body">
    <p class="title">
      {t("PAGES")}
    </p>
    <p class="subtitle">
      {t("PAGES_2")}
    </p>
  </div>
</section>
</div>
{apiData.pages?<div className="card p-3 settings-align">
  <label>{t("DOC")}</label>
<textarea ref={doc} defaultValue={apiData&&apiData.pages.documentation} class="textarea is-info mb-3" placeholder={t("DOC")}></textarea>
<label>{t("ABOUT_TITLE")}</label>
<textarea ref={about} defaultValue={apiData&&apiData.pages.about} class="textarea is-info mb-3" placeholder={t("ABOUT_TITLE")}></textarea>
<button onClick={docSaveHandler} class={`${loading&&"is-loading"} button is-info mb-3 w-100`}>{t("SAVE")}</button>
</div>:<div class="card message-body is-flex is-justify-content-center"><div class="lds-facebook"><div></div><div></div><div></div></div></div>}
    </Content>
  );
}

export default Control;
