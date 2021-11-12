import Content from "./content"
import Link from 'next/link'
import { useTranslation } from 'react-i18next';
function AdminNav(props) {
  const { t, i18n } = useTranslation();
  return (
   
        <div className="card">
           <div class="tabs">
  <ul>
  <Link href="/admin/control"><li class={`${props.active==="main"&&"is-active"}`}><a>{t("ADMIN_TITLE_MAIN")}</a></li></Link>
    <Link href="/admin/control/settings"><li class={`${props.active==="settings"&&"is-active"}`}><a>{t("ADMIN_TITLE_SETTINGS")}</a></li></Link>
    <Link href="/admin/control/nfts"><li class={`${props.active==="nfts"&&"is-active"}`}><a>{t("ADMIN_TITLE_NFTS")}</a></li></Link>
    <Link href="/admin/control/pages"><li class={`${props.active==="pages"&&"is-active"}`}><a>{t("ADMIN_TITLE_PAGES")}</a></li></Link>
  </ul>
</div>
</div>
    
  );
}

export default AdminNav;
