import Content from "../../components/content";
import {useRef,useEffect,useState} from "react"
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
function Admin() {
  const { t, i18n } = useTranslation();
  const password=useRef();
  const [logState,setLog]=useState(false);
  useEffect(()=>{
    if(localStorage.getItem("nft-jwt")){
      Router.push('/admin/control')
    }
  },[])


  const loginHandler=async()=>{
    
      const request=await fetch("/api/login",{
        method:"POST",
        body:JSON.stringify({password:password.current.value})
      })
      const response=await request.json();
      if(response.jwt){
        localStorage.setItem("nft-jwt",response.jwt);
        Router.push('/admin/control')
      }
      else{
        setLog(true);
        setTimeout(()=>{
          setLog(false);
        },2000)
        
      }

  }


  return (
    <Content bg="true">
           <div className="card">
       <div className="card-content">
       <input ref={password} className="input is-primary" type="text" placeholder="Password"/>
       <button onClick={loginHandler} className="button is-primary mt-2">{t("ADMIN_LOGIN")}</button>
       {logState&&<div className="notification is-danger mt-2">
 {t("ADMIN_WRONG_PASS")}
 </div>}
       </div>
       </div>
    </Content>
  );
}

export default Admin;
