import Content from "../components/content";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {useEffect,useState,useRef} from "react";
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import {loadContract} from "../utils/loadContract"
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import pickRandom from 'pick-random';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t, i18n } = useTranslation();
  const contractData=useSelector(state=>state.user.contractData);
  const apiData=useSelector(state=>state.user.apiData);
  const walletData=useSelector(state=>state.user.wallet);
  const [count,setCount]=useState(1);
  const [txData,setTx]=useState("");

  const mintHandler=async()=>{

    if(walletData){
      await toast.promise(
        async()=>{
          const provider=await detectEthereumProvider();
          const contract=await loadContract(contractData.name,provider);
          setTx((await contract.awardItem(walletData,pickRandom(apiData.nfts,{count}),{from:walletData,value:parseFloat(contractData.price*count)})).tx);
        },
        {
          pending: t("TOAST_WAITING"),
          success: t("TOAST_MINT_SUCCESS"),
          error: t("TOAST_ERROR")
        }
    );
    }
    else{
      toast(t("TOAST_LOGIN_NEEDED"));
    }
   
    

  }

    return (
      <Content bg="true">
              <ToastContainer 
      position="bottom-right"
      style={{width:"max-content"}}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
       <div className="card">
       <div className="card-content">
       <nav className="level">
       <div className="level-item has-text-centered">
    <div>
      <p className="heading">{t("NFT_NAME_TITLE")}</p>
      <p className="title">{contractData&&contractData.name}</p>
    </div>
  </div>
  <div className="level-item has-text-centered">
    <div>
      <p className="heading">{t("NFT_SOLD_TITLE")}</p>
      <p className="title">{contractData&&contractData.minted}</p>
    </div>
  </div>
  <div className="level-item has-text-centered">
    <div>
      <p className="heading">{t("NFT_LEFT_TITLE")}</p>
      <p className="title">{contractData&&(contractData.maxMintLimit-contractData.minted)||""}</p>
    </div>
  </div>
  <div className="level-item has-text-centered">
    <div>
      <p className="heading">{t("NFT_TOTAL_SALES_TITLE")}</p>
      <p className="title">{apiData&&contractData.price&&parseFloat((contractData.minted*Web3.utils.fromWei(contractData.price,"ether"))).toFixed(3)} {t("CURRENCY")}</p>
    </div>
  </div>
  <div className="level-item has-text-centered">
    <div>
      <p className="heading">{t("NFT_PRICE_TITLE")}</p>
      <p className="title">{contractData.price&&Web3.utils.fromWei(contractData.price,"ether")} {t("CURRENCY")}</p>
    </div>
  </div>
</nav>
       </div>
       </div>
       <div className="card mt-3">
       <div className="card-content">
            <Splide options={{ type:"loop",autoWidth:"true",autoplay:"true"}}>
        <SplideSlide>
          <img src="/nft/1.png" alt="Image 1"/>
        </SplideSlide>
        <SplideSlide>
          <img src="/nft/2.png" alt="Image 2"/>
        </SplideSlide>
        <SplideSlide>
          <img src="/nft/3.png" alt="Image 3"/>
        </SplideSlide>
        <SplideSlide>
          <img src="/nft/4.png" alt="Image 4"/>
        </SplideSlide>
        <SplideSlide>
          <img src="/nft/5.png" alt="Image 5"/>
        </SplideSlide>
        <SplideSlide>
          <img src="/nft/6.png" alt="Image 6"/>
        </SplideSlide>
      </Splide>
       </div>
       </div>
       <div className="card mt-5">
       <div className="card-content">
         <div className="is-flex is-align-items-center is-justify-content-space-between">
           <div className="is-flex is-align-items-center">
         <button onClick={()=>{if(count>1){setCount(count-1)}}} className="button is-link"><b><i className="fas fa-minus"></i></b></button>
       <a className="pagination-link">{count}</a>
       <button onClick={()=>{if(count<contractData.maxLength){setCount(count+1)}}} className="button is-link"><b><i className="fas fa-plus"></i></b></button>
       </div>
       <div className="is-flex is-align-items-center">
         {t("NFT_PRICE_TITLE")}:
       <a className="pagination-link">{parseFloat(contractData.price&&Web3.utils.fromWei(contractData.price,"ether")*count).toFixed(3)}<i className="fab fa-ethereum"></i></a>
       </div>
        </div>
        

        {contractData.whiteListed&&<section className="hero is-link mt-2">
  <div className="hero-body">
    <p className="title">
      {t("WHITE_LISTED_NOTIFICATION")}
    </p>
  </div>
</section>}
        <button onClick={mintHandler} className={`button ${contractData.whiteListed?"is-success":"is-link"} mt-2 mint-button`}><b><i className="fas fa-chevron-circle-right mr-2"></i>MINT</b></button>
       </div>
       </div>
      </Content>
    );
  }
  
  export default Home;
  