import Content from "../components/content"
import {useState,useEffect} from "react"
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
function Documentation() {
  const { t, i18n } = useTranslation();
  const [loading,setLoading]=useState(false);
  const data=useSelector(state=>state.user.apiData);
    return (
      <Content bg="true">
         <div className="card">
         <section class="hero is-primary">
  <div class="hero-body">
    <p class="title">
    {t("DOCUMENTATION_TITLE")}
    </p>
    <p class="subtitle">
    {t("OFFICAL_INFO_TITLE")}
    </p>
  </div>
</section>
{loading?<div class="message-body is-flex is-justify-content-center"><div class="lds-facebook"><div></div><div></div><div></div></div></div>:<div className="card p-3">
 {data&&data.pages.documentation}
 </div>}
 
</div>
      </Content>
    );
  }
  
  export default Documentation;
  