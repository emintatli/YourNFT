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
         <section className="hero is-primary">
  <div className="hero-body">
    <p className="title">
    {t("DOCUMENTATION_TITLE")}
    </p>
    <p className="subtitle">
    {t("OFFICAL_INFO_TITLE")}
    </p>
  </div>
</section>
{loading?<div className="message-body is-flex is-justify-content-center"><div className="lds-facebook"><div></div><div></div><div></div></div></div>:<div className="card p-3">
 {data.pages&&data.pages.documentation}
 </div>}
 
</div>
      </Content>
    );
  }
  
  export default Documentation;
  