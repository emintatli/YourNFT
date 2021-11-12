import Content from "../components/content"
import {useState,useEffect} from "react"
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
function About() {
  const [loading,setLoading]=useState(false);
  const { t, i18n } = useTranslation();
  const data=useSelector(state=>state.user.apiData);
    return (
     <Content bg="true">
       <section className="hero is-link">
  <div className="hero-body">
    <p className="title">
    {t("ABOUT_TITLE")}
    </p>
    <p className="subtitle">
      {t("ABOUT_TITLE_2")}
    </p>
  </div>
</section>
            {loading?<div className="message-body is-flex is-justify-content-center"><div className="lds-facebook"><div></div><div></div><div></div></div></div>:<div className="card">
       <div className="card-content">
       {data.pages&&data.pages.about}
       </div>
       </div>}
     </Content>
    );
  }
  
  export default About;
  