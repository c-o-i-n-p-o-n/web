import type { NextPage } from "next";
import { MouseEventHandler, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useRouter } from "next/router";
import Head from "next/head";
import CustomHeader from "../containers/CustomHeader/CustomHeader";
import CenteredComponent from "../components/CenteredComponent";
import { Box, Button, CircularProgress, colors, IconButton, Tooltip, Typography } from "@mui/material";
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
import CancelIcon from "@mui/icons-material/Cancel";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const PayWithBalanceButton = ({ balance, onClick }: {balance:number, onClick:MouseEventHandler<HTMLButtonElement>}) => {
  return (
    <Box className="flex flex-col items-center gap-2">
      <Typography variant="body1" color="textSecondary">
        Saldo disponível: <strong>R$ {balance}</strong>
      </Typography>
      <Button
        variant="contained"
        color="success"
        size="large"
        startIcon={<AccountBalanceWalletIcon />}
        onClick={onClick}
        sx={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          padding: "12px 24px",
          textTransform: "none",
        }}
      >
        Pagar com saldo em conta
      </Button>
    </Box>
  );
};

const authService = new AuthService();
const currencyService = new CurrencyService();
const transferenceService = new TransferenceService();

const CurrencyRescue: NextPage = () => {


  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [paid, setPaid] = useState<boolean | undefined>(undefined);
  const [funds, setFunds] = useState<number|undefined>(undefined);
  const [transference, setTransference] = useState<Transference | undefined>(undefined);
  const [logged, setLogged] = useState<Boolean>(authService.isLogged);

  const { push,query } = useRouter();

  const { isLoading, error, data: bookmaker, isSuccess } = useQuery(['getBookmaker'], authService.getBookmaker);
  

  const hash = query.hash as string
  //console.log(hash)
  const uRL = transference?.hash?transferenceService.getURLRescue(transference?.hash):"";
  //console.log(uRL)

  const loading = !!transference?false:true;

  
  useEffect(() => {
    setLogged(authService.isLogged);
    }, [authService.isLogged, bookmaker]);

    if(!logged && !isLoading && (!!isSuccess || !!error)){
        push('login')
  }

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    if(!!hash){
      //console.log(hash);
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

    
  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    if(!!transference){
      currencyService.getMaxAmountByCurrencyId(transference.currencies.id).then((amount)=>{
        setFunds(amount)
      }).catch((erro)=>{
        if(!!setErrorMessage){
          setErrorMessage(erro.message)
        }
      })
    }
    //let transference:Transference | undefined = transference as Transference | undefined;
    

    return () => {
        active = false;
    };
  }, [loading]);

  
  
  const payHandler = () => {
    console.log(transference)
    console.log(transference?.hash)
    if(!!transference?.hash){
      transferenceService.pay(transference.hash).then((ok)=>{
        setPaid(ok)
        setSuccessMessage("Pagamento realizado com sucesso!")
      }).catch((erro)=>{
        if(!!setErrorMessage){
          setErrorMessage(erro.message)
        }
      })
    }
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
                {paid === undefined?
                <div className="flex justify-center items-center h-screen bg-gray-100">
                  <Typography variant="h1" fontWeight="bold" color="primary">
                  <Typography component="span" variant="h3" fontWeight="medium">
                  {`${transference?.currencies.acronym}${"$"}`}
                  </Typography>
                  {` ${transference?.amount}`}
                  </Typography>
                </div>
                :
                !!paid?<CheckIcon color="success" sx={{ fontSize: 80 }}/>:<CancelIcon color="error" sx={{ fontSize: 80 }} />}                
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

                <div className="flex justify-center items-center min-h-screen">
                  <PayWithBalanceButton balance={funds?funds:0} onClick={payHandler} />
                </div>

                  {/* <StyledTypographyTitle variant="body2">
                  {`${"Saldo:"} ${transference?.currencies.acronym}${"$"} ${!!funds?funds:""}`}
                  </StyledTypographyTitle> */}
                

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
                {loading || !!!transference ? <CenteredComponent>
                  <CircularProgress />
                </CenteredComponent> :
                <TransferneceDetails transference={transference} key={0} chekPayment={payHandler}/>}
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