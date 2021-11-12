import Content from "../../../components/content"
import AdminNav from "../../../components/admin-nav";
import {useRef,useEffect,useState} from "react"
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
function Control() {
  const { t, i18n } = useTranslation();
  const image_url=useRef();
  const external_url=useRef();
  const description=useRef();
  const name=useRef();
  const animation=useRef();
  const uploadFile=useRef();
  const json_one_url=useRef();
  const [loading,setLoading]=useState(false);
  const addOne=()=>{
    if(json_one_url.current.value){
      addNFTHandler([json_one_url.current.value]);
    }
  }

  const addNFTHandler=async(arrayNFT)=>{
    console.log(arrayNFT)
    setLoading(true);
    if(localStorage.getItem("nft-jwt")){
      const res=await fetch("/api/addNFT",{
        method:"POST",
        body:JSON.stringify({
          jwt:localStorage.getItem("nft-jwt"),
          nfts:arrayNFT
          }
        )
      });
      const response=await res.json();
      if(response.matchedCount>=1){
        toast(t("SAVED_S"));
      }
      else{
        toast(t("TOAST_ERROR"));
      }
      uploadFile.current.value="";
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(!localStorage.getItem("nft-jwt")){
      Router.push('/')
    }
  },[])

  const getFile=async(e)=>{
    setLoading(true);
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload =async(e) => {
      const loaded_data=(e.target.result).split("\r\n");  
      if((loaded_data.length>0)){
       await addNFTHandler(loaded_data);
      }
      


      setLoading(false);
    };
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
      <AdminNav active="nfts"/>
      <div className="card p-3">
      <div className="card p-3">
      <section class="hero is-primary mb-2">
  <div class="hero-body">
    <p class="title">
      {t("ADD_NFT")}
    </p>
    <p class="subtitle">
     {t("ADD_NFT_2")}
    </p>
  </div>
</section>
      <input ref={json_one_url} class="input is-primary mb-2" type="text" placeholder={t("INPUT_JSON_URL")}/><br/>
      <button onClick={addOne} class={`${loading&&"is-loading"} button is-primary w-100`}>{t("ADD")}</button>
      </div>
      <div className="card p-3 mt-3">
      <section class="hero is-warning mb-2">
  <div class="hero-body">
    <p class="title">
      {t("NFT_IMPORT")}
    </p>
    <p class="subtitle">
      {t("IMPORT_NFT_JSON")}
    </p>
  </div>
</section>
      <div class={`file is-warning is-boxed w-100 ${loading&&"disabled"}`}>
  <label class="file-label w-100">
    <input ref={uploadFile} class="file-input" type="file" name="resume" onChange={getFile} accept=".txt"/>
    <span class="file-cta">
      <span class="file-icon">
        <i class="fas fa-cloud-upload-alt"></i>
      </span>
      {t("NFT_UPLOAD_FILE")}
      <button class={`${loading&&"is-loading display"} button is-warning d-none`}>
        
      </button>
    </span>
  </label>
  
</div>
<a href="/demo.txt" class="button is-warning mt-2"><i class="fas fa-download mr-2"></i>{t("NFT_DOWNLOAD_EXAMPLE")}</a>

      </div>
      </div>
    </Content>
  );
}

export default Control;
