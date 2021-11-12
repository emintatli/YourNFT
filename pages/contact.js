import Content from "../components/content";
import emailjs from 'emailjs-com';
import {useRef,useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
function Contact() {
  const form = useRef();
  const { t, i18n } = useTranslation();
  const formname=useRef();
  const formtext=useRef();
  const formemail=useRef();
  const [loading,setLoading]=useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    if(formname.current.value&&formtext.current.value&&formemail.current.value){
      setLoading(true);
      emailjs.sendForm('service_bqc1m27', 'template_f5i4isf', form.current, 'user_WUPGoSTgFJPS1AN47QbYd')
        .then((result) => {
          toast(t("MESSAGE_SENT"));
            setLoading(false);
        }, (error) => {
          toast(t("TOAST_ERROR"));
            setLoading(false);
        });
    }
    else{
      toast(t("FIELDS_CONNOT_EMPTY"));
    }
 
  };

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
        <section className="hero is-info">
  <div className="hero-body">
    <p className="title">
    {t("CONTACT_TITLE")}
    </p>
    <p className="subtitle">
    {t("CONTACT_TITLE_2")}
    </p>
  </div>
</section>


    
             <div className="card">
       <div className="card-content">
       <form ref={form} onSubmit={sendEmail}>
       <div className="field">
  <div className="control has-icons-left has-icons-right">
    <input ref={formname} className="input is-link" type="text" placeholder={t("FORM_NAME")} name="user_name"/>
    <span className="icon is-left">
    <i className="fas fa-user"></i>
    </span>
  </div>
</div>

<div className="field ">
  <div className="control has-icons-left has-icons-right">
    <input ref={formemail} className="input is-link" type="email" placeholder={t("FORM_EMAIL")} name="user_email"/>
    <span className="icon is-left">
      <i className="fas fa-envelope"></i>
    </span>
  </div>
</div>
<textarea ref={formtext} className="textarea is-link" placeholder={t("FORM_MESSAGE")} name="message"></textarea>
<button type="submit" className={`${loading&&"is-loading"} button is-link mt-2`}><i className="fas fa-paper-plane mr-2"></i>{t("SUBMIT_BUTTON")}</button>
</form>
       </div>
       </div>
      </Content>
    );
  }
  
  export default Contact;
  