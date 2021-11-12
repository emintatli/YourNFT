import Content from "./content"
import Link from 'next/link'
import { useTranslation } from 'react-i18next';
function AdminNav(props) {
  const { t, i18n } = useTranslation();
  return (
   
        <div className="card">
           <div className="tabs">
  <ul>
  <Link href="/admin/control"><li className={`${props.active==="main"&&"is-active"}`}><a>{t("ADMIN_TITLE_MAIN")}</a></li></Link>
    <Link href="/admin/control/settings"><li className={`${props.active==="settings"&&"is-active"}`}><a>{t("ADMIN_TITLE_SETTINGS")}</a></li></Link>
    <Link href="/admin/control/nfts"><li className={`${props.active==="nfts"&&"is-active"}`}><a>{t("ADMIN_TITLE_NFTS")}</a></li></Link>
    <Link href="/admin/control/pages"><li className={`${props.active==="pages"&&"is-active"}`}><a>{t("ADMIN_TITLE_PAGES")}</a></li></Link>
  </ul>
</div>
</div>
    
  );
}

export default AdminNav;
