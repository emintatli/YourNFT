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
        <section class="hero is-info">
  <div class="hero-body">
    <p class="title">
    {t("CONTACT_TITLE")}
    </p>
    <p class="subtitle">
    {t("CONTACT_TITLE_2")}
    </p>
  </div>
</section>


    
             <div className="card">
       <div className="card-content">
       <form ref={form} onSubmit={sendEmail}>
       <div class="field">
  <div class="control has-icons-left has-icons-right">
    <input ref={formname} class="input is-link" type="text" placeholder={t("FORM_NAME")} name="user_name"/>
    <span class="icon is-left">
    <i class="fas fa-user"></i>
    </span>
  </div>
</div>

<div class="field ">
  <div class="control has-icons-left has-icons-right">
    <input ref={formemail} class="input is-link" type="email" placeholder={t("FORM_EMAIL")} name="user_email"/>
    <span class="icon is-left">
      <i class="fas fa-envelope"></i>
    </span>
  </div>
</div>
<textarea ref={formtext} class="textarea is-link" placeholder={t("FORM_MESSAGE")} name="message"></textarea>
<button type="submit" class={`${loading&&"is-loading"} button is-link mt-2`}><i class="fas fa-paper-plane mr-2"></i>{t("SUBMIT_BUTTON")}</button>
</form>
       </div>
       </div>
      </Content>
    );
  }
  
  export default Contact;
  