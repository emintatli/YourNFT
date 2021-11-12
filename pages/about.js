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
       <section class="hero is-link">
  <div class="hero-body">
    <p class="title">
    {t("ABOUT_TITLE")}
    </p>
    <p class="subtitle">
      {t("ABOUT_TITLE_2")}
    </p>
  </div>
</section>
            {loading?<div class="message-body is-flex is-justify-content-center"><div class="lds-facebook"><div></div><div></div><div></div></div></div>:<div className="card">
       <div className="card-content">
       {data.pages&&data.pages.about}
       </div>
       </div>}
     </Content>
    );
  }
  
  export default About;
  