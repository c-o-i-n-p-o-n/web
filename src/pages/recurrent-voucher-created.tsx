import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Drawer,
  Divider,
  CircularProgress,
  Container,
} from "@mui/material";
import { useRouter } from "next/router";
import RecurrentVoucher from "../models/RecurrentVoucher";
import SignedRecurrentVoucher from "../models/SignedRecurrentVoucher";

import { useQuery } from "react-query";
import { RecurrentVoucherService } from "../services/RecurrentVoucherService";
import { AuthService } from "../services/AuthService";
import { SignedRecurrentVoucherService } from "../services/SignedRecurrentVoucherService";
import { TransferenceService } from "../services/TransferenceService";
import Transference from "../models/Transference";
import CenteredComponent from "../components/CenteredComponent";
import Alert from "../components/Alert/Alert";
import Head from "next/head";
import CustomHeader from "../containers/CustomHeader/CustomHeader";
import HomePageItem from "../components/HomePageItem";
import { FloatingButtonFAB } from "../components/Dropdown/Fab";
import { Column } from "../styles/shared-styles";
import ItemProperty from "../components/ItemProperty";
import ShareButtons from "../components/ShareButtons";
import PromoImage from "../components/PromoImage";
import ServerError from "../models/ServerError";
import AvatarImage from "../components/AvatarImage";
import VoucherRules from "../components/VoucherProperties/VoucherRules";
import RecurrentVoucherData from "../components/RecurrentVoucherProperties/RecurrentVoucherData";

// interface Proposal {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
// }

interface Subscription {
  id: number;
  proposalId: number;
  proposalName: string;
  status: string;
  nextPaymentDate: string;
}

interface ProposalListProps {
  myRecurrentVouchers: RecurrentVoucher[];
  //isCreator?: boolean;
  //onSubscribe?: (id: number) => void;
  onManage?: (proposal: RecurrentVoucher) => void;
}

interface SubscriptionListProps {
    subscriptions: SignedRecurrentVoucher[]
}

interface CreatorTabsProps {
    recurrentVoucher: RecurrentVoucher;
    subscribers: SignedRecurrentVoucher[]
    //setRecurrentVoucher: Function
  //userType: "creator" | "subscriber";
}

interface SubscriberTabsProps {
    setSelectedSignedRecurrentVoucher: Function;
    getSelectedSignedRecurrentVoucher: Function;
    mySignedRecurrentVouchers: SignedRecurrentVoucher[]
    //setRecurrentVoucher: Function
  //userType: "creator" | "subscriber";
}

// const propostasMock: Proposal[] = [
//   { id: 1, name: "Proposta Ouro", price: 50, description: "Assinatura premium com benefícios exclusivos." },
//   { id: 2, name: "Proposta Prata", price: 30, description: "Assinatura básica para usuários iniciantes." },
// ];

const assinaturasMock: Subscription[] = [
  { id: 101, proposalId: 1, proposalName: "Proposta Ouro", status: "Ativa", nextPaymentDate: "2025-07-01" },
  { id: 102, proposalId: 2, proposalName: "Proposta Prata", status: "Pendente", nextPaymentDate: "2025-06-15" },
];

const authService = new AuthService();
const recurrentVoucherService = new RecurrentVoucherService();
const signedRecurrentVoucherService = new SignedRecurrentVoucherService();
const transferenceService = new TransferenceService();

const RecurrentVoucheCreated: NextPage = () => {
  const router = useRouter();
    
  const [successMessage, setSuccessMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recurrentVoucher, setRecurrentVoucher] = useState<RecurrentVoucher | undefined>(undefined);

  const { push,query } = useRouter();
  const recurrentVoucherHash = !!(query.recurrentVoucherHash)?String(query.recurrentVoucherHash):undefined;

  
  
  const [subscribersListSize, setSubscribersListSize] = useState(5);
  const [subscribersPage, setSubscribersPage] = useState(0);
  const [subscribers, setSubscribers] = useState<SignedRecurrentVoucher[] | undefined>(undefined);
   
  const [logged, setLogged] = useState<Boolean>(authService.isLogged);

  const { isLoading, error, data: bookmaker, isSuccess } = useQuery(['getBookmaker'], authService.getBookmaker);
  
  
  console.log(query.recurrentVoucherHash);
  console.log(recurrentVoucherHash);
  
  const loading = !!!recurrentVoucher || !!!subscribers;
    
  useEffect(() => {
    let active = true;
    //console.log(loading);
    console.log(bookmaker);
    console.log(query.recurrentVoucherHash);
    console.log(recurrentVoucherHash);
    // if (!loading) {
    //   return undefined;
    // }
    if(!!recurrentVoucherHash){
      console.log(recurrentVoucherHash);
      recurrentVoucherService.getRecurrentVoucherByHash(recurrentVoucherHash).then((rec)=>{
        setRecurrentVoucher(rec)
      }).catch((erro)=>{
        if(!!setErrorMessage){
          setErrorMessage(erro.message)
        }
      })
    }

    return () => {
        active = false;
    };
  }, [recurrentVoucherHash]);
    


  const onEditHandler = (recurrentVoucher: RecurrentVoucher, changes: any, alertMessage: string) => {

      console.log(recurrentVoucher);
      console.log(changes);
      
      recurrentVoucherService.updateRecurrentVoucher(recurrentVoucher, changes)
          .then((_res: RecurrentVoucher) => {
            setSuccessMessage(alertMessage)
            setRecurrentVoucher(_res)
          })
          .catch((err: ServerError) => {
            console.log("Erro interno");
            console.log(err.detail);
            setErrorMessage("Erro interno")
          });
  };

  // 
  useEffect(() => {
    let active = true;
    //console.log(loading);
    console.log(bookmaker);
    console.log(recurrentVoucher);
    
    if (!!!recurrentVoucher) {
      return undefined;
    }

    signedRecurrentVoucherService.getSignedRecurrentVouchersByRecurrentId(recurrentVoucher.id,subscribersPage,subscribersListSize).then((sigs)=>{
      setSubscribers(sigs)
    }).catch((erro)=>{
      //if(!!setErrorMessage){
      console.log(erro.message);
      setErrorMessage(erro.message)
      //}
    })

    return () => {
        active = false;
    };
  }, [recurrentVoucher,subscribersPage,subscribersListSize]);

  console.log(recurrentVoucher);

  useEffect(() => {
      setLogged(authService.isLogged);
  }, [authService.isLogged, bookmaker]);

  if(!logged && !isLoading && (!!isSuccess || !!error)){
      router.push('login')
  }
    
    return (
      
      <div>
        <Head>
          <title>{recurrentVoucher?.hid}</title>
        </Head>
        <CustomHeader />
       {/* <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}> */}
       <Container>
        

            { (loading) ? <CenteredComponent>
            <CircularProgress />
          </CenteredComponent> :
          <div>


          <HomePageItem>
            <Typography variant="h5" gutterBottom>{recurrentVoucher.hid}</Typography>
          </HomePageItem>
          <HomePageItem>
            {/* <MatchPromoImage/> com botões de edição e compartilhamento*/}
            
            <Column>
              <ItemProperty>
                <PromoImage entity={recurrentVoucher} bookmaker={bookmaker || undefined} onEditHandler={onEditHandler}/>
              </ItemProperty>
            </Column>
          </HomePageItem>

          
          <HomePageItem>
              
            <Column>
              <ItemProperty>
                <AvatarImage entity={recurrentVoucher} bookmaker={bookmaker || undefined} onEditHandler={onEditHandler}/>
              </ItemProperty>
            </Column>
          </HomePageItem>
          <HomePageItem>
            <ItemProperty>
              <VoucherRules voucher={recurrentVoucher} title={"Leia as Regras (Importante!)"}/> {/* descricao (nao editavel) */}
            </ItemProperty>
          </HomePageItem>

          <HomePageItem>
            <ItemProperty>
              <RecurrentVoucherData recurrentVoucher={recurrentVoucher} bookmaker={bookmaker || undefined} onEditHandler={onEditHandler} title={"Dados da Proposta de Assinatura"}/> {/* informacoes editaveis do voucer (talvez seja visivel apenas para o owner) */}
            </ItemProperty>
          </HomePageItem>

          <RecurrenceTabs 
            recurrentVoucher={recurrentVoucher} 
            subscribers={subscribers} />
          </div>
            
            }

            

          <HomePageItem>
          <FloatingButtonFAB/>
          </HomePageItem>
            
          <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
              <p>{errorMessage}</p>
          </Alert>
          <Alert type="alert" show={!!alertMessage} closeAll={()=> setAlertMessage("")}>
              <p>{alertMessage}</p>
          </Alert>
          <Alert type="success" show={!!successMessage} closeAll={()=> setSuccessMessage("")}>
              <p>{successMessage}</p>
          </Alert>
        {/* </Box> */}
        </Container>
      </div>
    );
}

function RecurrenceTabs({ 
    recurrentVoucher,
    subscribers
    //myRecurrentVouchers//, isCreator = false, onSubscribe, onManage 
    }: CreatorTabsProps) {

    //const [logged, setLogged] = useState<Boolean>(false);
    //const [tabIndex, setTabIndex] = useState<number>(0);

    //const handleChange = (event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);


  return (
    <Container>


      {!!(recurrentVoucher.isOwner)?

        <SubscriptionList subscriptions={subscribers} />

      :

        <></>
      }

      {!!(recurrentVoucher.isOwner)?
      
        <Box mt={2}>
          <Button variant="contained" onClick={() => alert("Criar nova proposta")}>Criar Nova Proposta</Button>
        </Box>
      :
      
        <Box mt={2}>
          <Button variant="contained" onClick={() => alert("Contratar proposta")}>Contratar</Button>
        </Box>
      }

      
      <HomePageItem>
        {/* <MatchPromoImage/> com botões de edição e compartilhamento*/}
        <Column>
          <ItemProperty>
            <ShareButtons link={window.location.href} bannerLink={recurrentVoucher?.photo || recurrentVoucher?.logo}/>
          </ItemProperty>
        </Column>
      </HomePageItem>
    </Container>
  );
}

// function SubscriberTabs({ 
//     setSelectedSignedRecurrentVoucher,
//     getSelectedSignedRecurrentVoucher,
//     mySignedRecurrentVouchers//, isCreator = false, onSubscribe, onManage 
    
//     }: SubscriberTabsProps) {
//   const [tabIndex, setTabIndex] = useState<number>(0);
//   //const userSubscriptions: Subscription[] = [assinaturasMock[0]];

//   const router = useRouter();

//     useEffect(() => {
//     if (!router.isReady) return;

//     const tab = router.query.tab;
//     if (tab === "minhas") setTabIndex(0);
//     else setTabIndex(0);
//     }, [router.isReady, router.query]);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);


//   return (
//     <>
//       <Typography variant="h5" gutterBottom>Área do Assinante</Typography>
//       <Tabs value={tabIndex} onChange={handleChange} aria-label="abas do assinante" sx={{ mb: 2 }}>
//         {/* <Tab label="Propostas Disponíveis" /> */}
//         <Tab label="Minhas Assinaturas" />
//       </Tabs>

//       {/* {tabIndex === 0 && (
//         <ProposalList
//           proposals={propostasMock}
//           onSubscribe={(id) => alert(`Assinar proposta ${id}`)}
//         />
//       )} */}

//       {tabIndex === 0 && (
//         <SubscriptionList
//           getSelectedSignedRecurrentVoucher={getSelectedSignedRecurrentVoucher}
//           setSelectedSignedRecurrentVoucher={setSelectedSignedRecurrentVoucher}
//           mySignedRecurrentVouchers={mySignedRecurrentVouchers}
//           onCancel={(id) => alert(`Cancelar assinatura ${id}`)}
//         />
//       )}

      
//     </>
//   );
// }

// function MyRecurrentVouchersList({ myRecurrentVouchers, onManage }: ProposalListProps) {
//   return (
//     <List>
//       {myRecurrentVouchers.map((p) => (
//         <ListItem key={p.id} divider>
//           <ListItemText
//             primary={p.hid}
//             secondary={`Valor: R$ ${p.price} / mês`}
//           />
//           {p.isOwner && (
//             <ListItemSecondaryAction>
//               <Button variant="outlined" onClick={() => onManage && onManage(p)}>
//                 Gerenciar
//               </Button>
//             </ListItemSecondaryAction>
//           )}
//           {/* {!p.isOwner && onSubscribe && (
//             <ListItemSecondaryAction>
//               <Button variant="outlined" onClick={() => onSubscribe(p.id)}>
//                 Assinar
//               </Button>
//             </ListItemSecondaryAction>
//           )} */}
//         </ListItem>
//       ))}
//     </List>
//   );
// }

function SubscriptionList({ 
    subscriptions
    }: SubscriptionListProps) {
    
  const router = useRouter();
  
  const [signedRecurrentVoucher, setSignedRecurrentVoucher] = useState<SignedRecurrentVoucher | undefined>(undefined);

  function onManage(id: number): void {
    if (!router.isReady) return;
    router.push({ pathname: "signed-recurrent-voucher-created", query: { signedRecurrentVoucherId: id }} );
  }
  
  function onView(s: SignedRecurrentVoucher|undefined): void {
    setSignedRecurrentVoucher(s)
  }

  function nextPaymentDate(
    
    quantidade: number,
    unidade: string,
    pagamentoEmDia: boolean,
    dataContratacao: Date
  ): { dataProximoPagamento: Date; dataFormatada: string } {
    const dataBase = new Date(dataContratacao);

    // Se não estiver em dia, o vencimento é o atual
    if (!pagamentoEmDia) {
      return {
        dataProximoPagamento: dataBase,
        dataFormatada: formatarData(dataBase),
      };
    }

    switch (unidade.toLowerCase()) {
      case "dia":
      case "dias":
        dataBase.setDate(dataBase.getDate() + quantidade);
        break;
      case "semana":
      case "semanas":
        dataBase.setDate(dataBase.getDate() + 7 * quantidade);
        break;
      case "quinzena":
      case "quinzenas":
        dataBase.setDate(dataBase.getDate() + 15 * quantidade);
        break;
      case "mês":
      case "mes":
      case "meses":
        dataBase.setMonth(dataBase.getMonth() + quantidade);
        break;
      case "ano":
      case "anos":
        dataBase.setFullYear(dataBase.getFullYear() + quantidade);
        break;
      default:
        throw new Error("Unidade de tempo inválida.");
    }

    return {
      dataProximoPagamento: dataBase,
      dataFormatada: formatarData(dataBase),
    };
  }

function formatarData(data: Date): string {
  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

  return (<>
  
    <List>
      {subscriptions.map((s) => (
        !!s && <ListItem key={s.id} divider>
          <ListItemText
            primary={s.hid}
            secondary={`Status: ${s.status} — Próxima cobrança: ${nextPaymentDate(s.period,s.timeUnit,s.status==2,s.createdAt)}`}
          />
          {
            <ListItemSecondaryAction>
              <Button variant="outlined" color="error" onClick={() => onView(s)}>
                Visualizar
              </Button>
            </ListItemSecondaryAction>
          }
        </ListItem>
      ))}
    </List>
  
      <Drawer
        anchor="right"
        open={!!signedRecurrentVoucher}
        onClose={() => onView(undefined)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          {signedRecurrentVoucher && (
            <>
              <Typography variant="h6">{signedRecurrentVoucher.hid}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                R$ {signedRecurrentVoucher.cost} / mês
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1">{signedRecurrentVoucher.description}</Typography>
              <Box mt={2}>
                <Button variant="contained" fullWidth onClick={() => signedRecurrentVoucher && onManage(signedRecurrentVoucher.id)}>Editar</Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
  </>
  );
}

export default RecurrentVoucheCreated;
