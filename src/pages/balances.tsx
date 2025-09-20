import type { NextPage } from "next";
import Head from "next/head";

import CustomHeader from "../containers/CustomHeader/CustomHeader";

import Container from "@mui/material/Container";

import HomePageItem from "../components/HomePageItem";
import Match from "../models/Match";

import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CenteredComponent from "../components/CenteredComponent";
import { BetService } from "../services/BetService";
import { BookmakerService } from "../services/BookmakerService";
import { MatchService } from "../services/MatchService";
import { AuthService } from "../services/AuthService";
import { Column } from "../styles/shared-styles";
import Bookmakers from "../containers/Bookmakers";
import Divider from '@mui/material/Divider';
import FAB, { FloatingButtonFAB } from "../components/Dropdown/Fab";

import CasinoIcon from '@mui/icons-material/Casino';
import { useRouter } from "next/router";
import ItemProperty from "../components/ItemProperty";
import AvatarImage from "../components/AvatarImage";
import PromoImage from "../components/PromoImage";
import ShareButtons from "../components/ShareButtons";
import ServerError from "../models/ServerError";
import Alert from "../components/Alert/Alert";
import Currency from "../models/Currency";
import Bet from "../models/Bet";
import { CurrencyService } from "../services/CurrencyService";
import RequestedMatches from "../containers/RequestedMatches";
import {RequestedCurrencies,ReceivedCurrencies} from "../containers/RequestedCurrencies";
import RequestedBets from "../containers/RequestedBets";
import { Card, CardHeader, CardContent, CardActions, Button, Chip } from '@mui/material';
import {FullCurrencyCard} from "../components/CurrencyCard/FullCurrencyCard";
import { RequestedVouchers } from "../containers/RequestedVouchers";
import { VoucherService } from "../services/VoucherService";
import { RecurrentVoucherService } from "../services/RecurrentVoucherService";
import { RequestedRecurrentVouchers } from "../containers/RequestedRecurrentVouchers";
// import { SignedRecurrentVoucherService } from "../services/SignedRecurrentVoucherService";


//const bookmakerService = new BookmakerService();
const authService = new AuthService();
//const matchService = new MatchService();
//const betService = new BetService();
const currencyService = new CurrencyService();
const voucherService = new VoucherService();
const recurrentVoucherService = new RecurrentVoucherService();
// const signedRecurrentVoucherService = new SignedRecurrentVoucherService();

const Balances: NextPage = () => {


  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  // const [matchListSize, setMatchListSize] = useState(5);
  // const [matchPage, setMatchPage] = useState(0);

  const [currencyListSize, setCurrencyListSize] = useState(5);
  const [currencyPage, setCurrencyPage] = useState(0);

  const [myCurrencyListSize, setMyCurrencyListSize] = useState(5);
  const [myCurrencyPage, setMyCurrencyPage] = useState(0);

  const [myVoucherListSize, setMyVoucherListSize] = useState(5);
  const [myVoucherPage, setMyVoucherPage] = useState(0);

  const [recurrentVoucherListSize, setRecurrentVoucherListSize] = useState(5);
  const [recurrentVoucherPage, setRecurrentVoucherPage] = useState(0);

  // const [signedRecurrentVoucherListSize, setSignedRecurrentVoucherListSize] = useState(5);
  // const [signedRecurrentVoucherPage, setSignedRecurrentVoucherPage] = useState(0);

  // const [betListSize, setBetListSize] = useState(5);
  // const [betPage, setBetPage] = useState(0);
  
  // const { isLoading: isLoadingMatches, error: matchError, data: mostRequestedMatches } = 
  //   useQuery(['getMatchs',matchPage,matchListSize], 
  //   () => {return matchService.getMatchs(matchPage,matchListSize)});
  
  const { isLoading: isLoadingMyCurrencies, error: myCurrencyError, data: mostRequestedMyCurrencies } = 
    useQuery(['getMyCurrencies',myCurrencyPage,myCurrencyListSize], 
    () => {return currencyService.getMyCurrencies(myCurrencyPage,myCurrencyListSize)});
  
  const { isLoading: isLoadingCurrencies, error: currencyError, data: mostRequestedCurrencies } = 
    useQuery(['getCurrenciesReceived',currencyPage,currencyListSize], 
    () => {return currencyService.getCurrenciesReceived(currencyPage,currencyListSize)});
  
  const { isLoading: isLoadingMyVouchers, error: myVoucherError, data: mostRequestedMyVouchers } = 
    useQuery(['getMyVouchers',myVoucherPage,myVoucherListSize], 
    () => {return voucherService.getMyVouchers(myVoucherPage,myVoucherListSize)});
  
  const { isLoading: isLoadingRecurrentVouchers, error: recurrentVoucherError, data: mostRequestedRecurrentVouchers } = 
    useQuery(['getRecurrentVouchers',recurrentVoucherPage,recurrentVoucherListSize], 
    () => {return recurrentVoucherService.getRecurrentVouchers(recurrentVoucherPage,recurrentVoucherListSize)});
  
  // const { isLoading: isLoadingSignedRecurrentVouchers, error: signedRecurrentVoucherError, data: mostRequestedSignedRecurrentVouchers } = 
  //   useQuery(['getSignedRecurrentVouchers',signedRecurrentVoucherPage,signedRecurrentVoucherListSize], 
  //   () => {return signedRecurrentVoucherService.getSignedRecurrentVouchers(signedRecurrentVoucherPage,signedRecurrentVoucherListSize)});
  
  // const { isLoading: isLoadingBets, error: betError, data: mostRequestedBets } = 
  //   useQuery(['getMyBets',betPage,betListSize], 
  //   () => {return betService.getBets(betPage,betListSize)});

  const { push } = useRouter();
  
  const [logged, setLogged] = useState<Boolean>(authService.isLogged);

  
  const { isLoading, error, data: bookmaker, isSuccess } = useQuery(['getBookmaker'], authService.getBookmaker);

  
  // useEffect(() => {
  //   setLogged(authService.isLogged);
  //   }, [authService.isLogged, bookmaker]);

    if(!logged && !isLoading && (!!isSuccess || !!error)){
        //push('login')
        push('/')
    }
  

  useEffect(() => {
    setLogged(authService.isLogged);
  }, [bookmaker]);

  // const discountCurrency = (id: number) => {
  //   push({ pathname: "discount-currency", query: { currencyId: id }} );
  // }

  // const rescueCurrency = (id: number) => {
  //   push({ pathname: "rescue-currency", query: { currencyId: id }} );
  // }

  // const finalizeBet = (id: number) => {
  //   push({ pathname: "finalize-bet", query: { currencyId: id }} );
  // }

  // const seeMoreMatchesHandler = () => {
  //   setMatchListSize(matchListSize + 5);
  // };

  const seeMoreCurrenciesHandler = () => {
    setCurrencyListSize(currencyListSize + 5);
  };

  const seeMoreMyCurrenciesHandler = () => {
    setMyCurrencyListSize(myCurrencyListSize + 5);
  };

  const seeMoreMyVouchersHandler = () => {
    setMyVoucherListSize(myVoucherListSize + 5);
  };

  const seeMoreRecurrentVouchersHandler = () => {
    setRecurrentVoucherListSize(recurrentVoucherListSize + 5);
  };

  // const seeMoreBetsHandler = () => {
  //   setBetListSize(betListSize + 5);
  // };

  return (
    <div>
      <Head>
        <title>{bookmaker?.hid}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomHeader />
      {isLoading ? <CenteredComponent>
            <CircularProgress />
          </CenteredComponent> :
          <Container>


          {/*<HomePageItem>
            
              <Typography variant="h6" gutterBottom>Saldo em Moeda Corrente</Typography>
            <Card>
              <CardContent>
                <ul>
                  <li>🇧🇷 BRL: <strong>R$ 5.000,00</strong></li>
                </ul>
              </CardContent>
              <CardActions>
                <Button variant="contained">Depositar</Button>
                <Button variant="outlined">Sacar</Button>
              </CardActions>
            </Card>
          </HomePageItem>*/}

            
          {/* <HomePageItem 
            showSeeMore
            seeMoreHandler={seeMoreMyCurrenciesHandler}>
                {isLoadingMyCurrencies ? <CenteredComponent>
            <CircularProgress />
            </CenteredComponent> : 
            
            <Card>
              <CardHeader title="Seus Cupons" />
              <CardContent>
                <ul>
                  <li>₿ Bitcoin (BTC): <strong>0.52</strong> ≈ $34,500</li>
                  <li>Ξ Ethereum (ETH): <strong>3.2</strong> ≈ $9,000</li>
                  <li>🪙 Solana (SOL): <strong>25</strong> ≈ $3,500</li>
                </ul>
              </CardContent>
              <CardActions>
                <Button variant="contained">Usar</Button>
                <Button variant="outlined">Vender</Button>
              </CardActions>
            </Card>}
          </HomePageItem> */}
{/* 
            <HomePageItem
            //title="Matches"
            showSeeMore
            seeMoreHandler={seeMoreMatchesHandler}
            >
          {isLoadingMatches ? <CenteredComponent>
            <CircularProgress />
          </CenteredComponent> : 
          <Column>
            <RequestedMatches requested={mostRequestedMatches} size={matchListSize} page={matchPage} />
            
          </Column>}
        </HomePageItem > */}
          <HomePageItem 
            showSeeMore
            seeMoreHandler={seeMoreCurrenciesHandler}>
                {isLoadingCurrencies ? <CenteredComponent>
            <CircularProgress />
            </CenteredComponent> : 
        <div>
        <Typography variant="h6" gutterBottom>Cupons que você adquiriu</Typography>
        {/* <Card> */}
          <Column>
                <ReceivedCurrencies setErrorMessage={setErrorMessage} requested={mostRequestedCurrencies} size={currencyListSize} page={currencyPage} />
                 
                
            
          </Column>
        {/* </Card> */}
        </div>
      }
          </HomePageItem>
          <HomePageItem 
            showSeeMore
            seeMoreHandler={seeMoreMyCurrenciesHandler}>
                {isLoadingMyCurrencies ? <CenteredComponent>
            <CircularProgress />
            </CenteredComponent> : 
        <div>
        <Typography variant="h6" gutterBottom>Cupons que você criou</Typography>
            <Column>
                <RequestedCurrencies setErrorMessage={setErrorMessage} requested={mostRequestedMyCurrencies} size={myCurrencyListSize} page={myCurrencyPage} />
                
            </Column>
            </div>}
          </HomePageItem>
          <HomePageItem 
            showSeeMore
            seeMoreHandler={seeMoreMyVouchersHandler}>
                {isLoadingMyVouchers ? <CenteredComponent>
            <CircularProgress />
            </CenteredComponent> : 
        <div>
        <Typography variant="h6" gutterBottom>Vale cupons que você criou</Typography>
            <Column>
                <RequestedVouchers setErrorMessage={setErrorMessage} requested={mostRequestedMyVouchers} size={myVoucherListSize} page={myVoucherPage} />
                
            </Column>
            </div>}
          </HomePageItem>
          <HomePageItem 
            showSeeMore
            seeMoreHandler={seeMoreRecurrentVouchersHandler}>
                {isLoadingRecurrentVouchers ? <CenteredComponent>
            <CircularProgress />
            </CenteredComponent> : 
        <div>
        <Typography variant="h6" gutterBottom>Propostas de assinaturas de cupons que você criou</Typography>
            <Column>
                <RequestedRecurrentVouchers setErrorMessage={setErrorMessage} requested={mostRequestedRecurrentVouchers} size={recurrentVoucherListSize} page={recurrentVoucherPage} />
                
            </Column>
            </div>}
          </HomePageItem>
          {/* <HomePageItem 
            showSeeMore
            seeMoreHandler={seeMoreBetsHandler}>
                {isLoadingBets ? <CenteredComponent>
            <CircularProgress />
            </CenteredComponent> : 
            <Column>
                <RequestedBets requested={mostRequestedBets} size={betListSize} page={betPage} />
                
            </Column>}
          </HomePageItem> */}
          <HomePageItem>
            {/* <MatchLink/> com botão de compartilhamento*/}
          </HomePageItem>
          <HomePageItem>
            {/* <MatchQRCode/> com botão de compartilhamento*/}
          </HomePageItem>
          <HomePageItem>
            {/* <MatchStatistics/> com botão de compartilhamento*/}
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

export default Balances;
