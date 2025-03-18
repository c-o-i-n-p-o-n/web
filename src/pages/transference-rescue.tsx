import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useRouter } from "next/router";
import Head from "next/head";
import CustomHeader from "../containers/CustomHeader/CustomHeader";
import CenteredComponent from "../components/CenteredComponent";
import { CircularProgress, colors, IconButton, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import HomePageItem from "../components/HomePageItem";
import Alert from "../components/Alert/Alert";
import FAB, { FloatingButtonFAB } from "../components/Dropdown/Fab";
import { Column } from "../styles/shared-styles";
import ItemProperty from "../components/ItemProperty";

import { AuthService } from "../services/AuthService";
import { CurrencyService } from "../services/CurrencyService";

import Currency from "../models/Currency";
import { QRCodeSVG } from "qrcode.react";
import FullCurrencyCard from "../components/CurrencyCard/FullCurrencyCard";
import AmountAndCheckRescue from "../components/CurrencyCard/AmountAndCheckRescue";
import { TransferenceService } from "../services/TransferenceService";

import CheckIcon from "@mui/icons-material/Check";
import Bookmaker from "../models/Bookmaker";
import Transference from "../models/Transference";
import TransferneceDetails from "../components/CurrencyCard/TransferenceDetails";
import { StyledTypographyTitle } from "../components/CurrencyCard/FullCurrencyCard.styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const authService = new AuthService();
const currencyService = new CurrencyService();
const transferenceService = new TransferenceService();

const CurrencyRescue: NextPage = () => {

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [paid, setPaid] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);
    const [transference, setTransference] = useState<Transference | undefined>(undefined);
    const { push,query } = useRouter();
    //const [logged, setLogged] = useState<Boolean>(false);


    const { isLoading, error, data: bookmaker, isSuccess } = useQuery(['getBookmaker'], authService.getBookmaker);

    
    //const hash = currency&&bookmaker?(amount?currencyService.getURLRescue(currency,bookmaker,amount):currencyService.getURLRescue(currency,bookmaker,1)):"";
    //const hash = currency&&bookmaker?(amount?currencyService.getURLRescue(currency,bookmaker,amount):currencyService.getURLRescue(currency,bookmaker,1)):"";
    //const [hash, setHash] = useState<string | undefined>(undefined);
    //const [uRL, setURL] = useState<string | undefined>(undefined);

    
    //const { isLoading, error, data } = useQuery(['getEventById',id], () => {return eventService.getEventById(id);});
    //id = transference?.id;
    //const currencyId = Number(query.currencyId)
    const hash = query.hash as string
    console.log(hash)
    const uRL = transference?.hash?transferenceService.getURLRescue(transference?.hash):"";
    console.log(uRL)

    
    //const transference = !!hash?(await transferenceService.getTransferenceByHash(hash)):undefined as Transference | undefined
    //const uRL = transference?.hash?transferenceService.getURLRescue(transference?.hash):"";

    
    const loading = !!!transference;

    // useEffect(() => {
    //   let active = true;
    //   if (!loading) {
    //     return undefined;
    //   }
    //   const checkTransference = async () => {
    //     setTransference(await transferenceService.getTransferenceByHash(hash));
    //     console.log(hash);
    //   }
  
    //   checkTransference().catch(()=>{
    //     console.log(hash);
    //   });
  
    //   return () => {
    //       active = false;
    //   };
    // }, [loading,hash]);

  
    useEffect(() => {
      let active = true;
      if (!loading) {
        return undefined;
      }
      if(!!hash){
        console.log(hash);
        transferenceService.getTransferenceByHash(hash).then((transf)=>{
          setTransference(transf)
        }).catch((erro)=>{
          if(!!setErrorMessage){
            setErrorMessage(erro.message)
          }
        })
      }
  
      return () => {
          active = false;
      };
    }, [loading,hash]);
    // useEffect(() => {
    //     let active = true;
        
    //     if (!loading) {
    //       return undefined;
    //     }
    //     const fetchCurrency = async () => {
    //         setCurrency(await currencyService.getCurrencyById(transference.currency.id));
    //         console.log(currency);
    //     }
    
    //     fetchCurrency().catch(()=>{
    //       //push('create-match');
    //       console.log(currency);
    //     });
    
    //     return () => {
    //         active = false;
    //     };
    //   }, [loading,transference]);

      
    // useEffect(() => {
    //   let active = true;
    //   if (!loading) {
    //     return undefined;
    //   }
    //   const fetchAmount = async () => {
    //       setAmount(await currencyService.getMaxAmountByCurrencyId(currencyId));
    //   }
  
    //   fetchAmount().catch(()=>{
    //   });
  
    //   return () => {
    //       active = false;
    //   };
    // }, [loading,currencyId]);

    
  
  const checkPaymentHandler = () => {
    console.log(transference)
    console.log(transference?.hash)
    // const checkPayment = async () => {
    //   if(!!transference?.hash){
    //     setPaid(await transferenceService.check(transference.hash));
    //   }
    // }

    // checkPayment().catch(()=>{
    // });


    
    if(!!transference?.hash){
      transferenceService.check(transference.hash).then((ok)=>{
        setPaid(ok)
        setSuccessMessage("Pago")
      }).catch((erro)=>{
        if(!!setErrorMessage){
          setErrorMessage(erro.message)
        }
      })
    }
  };
    

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uRL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reseta a mensagem após 2 segundos
  };
    
  return (
    <div>
      <Head>
        <title>{transference?.currencies?.acronym}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomHeader />
      {isLoading || loading ? <CenteredComponent>
            <CircularProgress />
          </CenteredComponent> :
          <Container>
          <HomePageItem>
            {/* <MatchPromoImage/> com botões de edição e compartilhamento*/}
            <Column>
              <CenteredComponent>
                {paid?<CheckIcon />:<QRCodeSVG  value={uRL} size={200}/>}                
              </CenteredComponent>
              {/* <ItemProperty>
                <QRCodeSVG value={uRL}/>
              </ItemProperty>  */}
            </Column>
          </HomePageItem>
          <HomePageItem>
            {/* <MatchPromoImage/> com botões de edição e compartilhamento*/}
            <Column>
              <CenteredComponent>
              <ItemProperty>
                <p className="text-sm">
                  <StyledTypographyTitle variant="body2">
                  <a href={uRL}>{uRL}</a>
                  </StyledTypographyTitle>
                </p>

              </ItemProperty>
              <ItemProperty>
              {/* <button
                onClick={copyToClipboard}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                📋 Copiar
              </button> */}
              
                <Tooltip title={copied ? "Copiado!" : "Copiar"}>
                  {/* <IconButton onClick={copyToClipboard} color="primary"> */}
                  <IconButton onClick={copyToClipboard} color="primary">
                    {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
                  </IconButton>
                </Tooltip>
              </ItemProperty>
              </CenteredComponent>
              {/* <ItemProperty>
                <QRCodeSVG value={uRL}/>
              </ItemProperty>  */}
            </Column>
          </HomePageItem>

          
          <HomePageItem>
            {/* <MatchPromoImage/> com botões de edição e compartilhamento*/}
           
            <Column>
              <ItemProperty>
                {loading ? <CenteredComponent>
                  <CircularProgress />
                </CenteredComponent> :
                <TransferneceDetails transference={transference} key={0} chekPayment={checkPaymentHandler}/>}
              </ItemProperty>
            </Column>
          </HomePageItem>

          
          
          
          <Alert type="success" show={!!successMessage} closeAll={()=> setSuccessMessage("")}>
              <p>{successMessage}</p>
          </Alert>
          <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
              <p>{errorMessage}</p>
          </Alert>
  
          <HomePageItem>
          <FloatingButtonFAB/>
          </HomePageItem>
          {/* <HomePageItem
            title="Bookmakers"
            showSeeMore
            seeMoreHandler={seeMoreHandler}
          >
          <Bookmakers bookmakers={bookmakers} size={listSize}></Bookmakers>
          </HomePageItem> */}
        </Container>
        }
      

      {/* <CreateBet/> */}
    </div>
  );
};


export default CurrencyRescue;