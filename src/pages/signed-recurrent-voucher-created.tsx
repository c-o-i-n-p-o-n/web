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
import { BillingService } from "../services/BillingService";
import Transference from "../models/Transference";
import CenteredComponent from "../components/CenteredComponent";
import Billing from "../models/Billing";

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

    myBillings: Billing[] | undefined,
    setSelectedSubscription: Function,
    selectedSubscription: Billing | undefined,
    setOpennedDrawer: Function,
    opennedDrawer: String | undefined,
    signedRecurrentVoucher: SignedRecurrentVoucher
}

interface CreatorTabsProps {
  recurrentVoucher: RecurrentVoucher;
  signedRecurrentVoucher: SignedRecurrentVoucher;
  myBillings: Billing[] | undefined;

    //setRecurrentVoucher: Function
  //userType: "creator" | "subscriber";
}

interface SubscriberTabsProps {
    // setSelectedSignedRecurrentVoucher: Function;
    // getSelectedSignedRecurrentVoucher: Function;
    // mySignedRecurrentVouchers: SignedRecurrentVoucher[]

    recurrentVoucher: RecurrentVoucher,
    signedRecurrentVoucher: SignedRecurrentVoucher,
    myBillings: Billing[] | undefined

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
const billingService = new BillingService();

const SignedRecurrentVoucheCreated: NextPage = () => {
  const router = useRouter();
    
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recurrentVoucher, setRecurrentVoucher] = useState<RecurrentVoucher | undefined>(undefined);
  const [signedRecurrentVoucher, setSignedRecurrentVoucher] = useState<SignedRecurrentVoucher | undefined>(undefined);

  const { push,query } = useRouter();
  const signedRecurrentVoucherId = Number(query.signedRecurrentVoucherId);
  
  console.log(query.signedRecurrentVoucherId);
  console.log(signedRecurrentVoucherId);

  const [myBillingsListSize, setMyBillingsListSize] = useState(5);
  const [myBillingsPage, setMyBillingsPage] = useState(0);
  
  //const [selectedRecurrentVoucher, setSelectedRecurrentVoucher] = useState<RecurrentVoucher | null>(null);
  //const [selectedSignedRecurrentVoucher, setSelectedSignedRecurrentVoucher] = useState<SignedRecurrentVoucher | null>(null);
  
  
  const { isLoading: isLoadingMyBillings, error: myBillingsError, data: myBillings } = 
  useQuery(['getBillingsBySignedRecurrentVoucherId',signedRecurrentVoucherId,myBillingsPage,myBillingsListSize], 
  () => {return billingService.getBillingsBySignedRecurrentVoucherId(signedRecurrentVoucherId,myBillingsPage,myBillingsListSize)});


  const loading = !!!recurrentVoucher || !!!signedRecurrentVoucher || !!myBillings;

  const [logged, setLogged] = useState<Boolean>(authService.isLogged);

  const { isLoading, error, data: bookmaker, isSuccess } = useQuery(['getBookmaker'], authService.getBookmaker);
  
  
  useEffect(() => {
    let active = true;
    //console.log(loading);
    console.log(bookmaker);
    console.log(query.signedRecurrentVoucherId);
    console.log(signedRecurrentVoucherId);

    if(!!signedRecurrentVoucherId){
      console.log(signedRecurrentVoucherId);
      signedRecurrentVoucherService.getSignedRecurrentVoucherById(signedRecurrentVoucherId).then((sig)=>{
        setSignedRecurrentVoucher(sig)
      }).catch((erro)=>{
        if(!!setErrorMessage){
          setErrorMessage(erro.message)
        }
      })
    }

    return () => {
        active = false;
    };
  }, [signedRecurrentVoucherId]);
    
  useEffect(() => {
    let active = true;
    //console.log(loading);
    console.log(bookmaker);
    console.log(signedRecurrentVoucher);
    if (!signedRecurrentVoucher) {
      return undefined;
    }
    if(!!signedRecurrentVoucher){
      console.log(signedRecurrentVoucher);
      recurrentVoucherService.getRecurrentVoucherById(signedRecurrentVoucher.recurrences.id).then((rec)=>{
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
  }, [signedRecurrentVoucher]);
    

    


    
  console.log(recurrentVoucher);


  useEffect(() => {
      setLogged(authService.isLogged);
  }, [authService.isLogged, bookmaker]);

  if(!logged && !isLoading && (!!isSuccess || !!error)){
      router.push('login')
  }
    
    let userType: "creator" | "subscriber" = "creator";

  function checkTransferenceError(): boolean {
    if(!!!myBillingsError){
      setErrorMessage("Não foi possível carregar o histórico de pagamentos");
      return true
    }
    return false
  }

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
            {loading || checkTransferenceError() ? <CenteredComponent>
            <CircularProgress />
          </CenteredComponent> : recurrentVoucher.isOwner?
            <SignedRecurrenceCreatorTabs 
            recurrentVoucher={recurrentVoucher} 
            signedRecurrentVoucher={signedRecurrentVoucher} 
            myBillings={myBillings}  /> 
            : 
            <SignedRecurrenceSubscriberTabs 
            recurrentVoucher={recurrentVoucher} 
            signedRecurrentVoucher={signedRecurrentVoucher} 
            myBillings={myBillings} />}
        </Box>
    );
}

function SignedRecurrenceCreatorTabs({ 
    recurrentVoucher,
    signedRecurrentVoucher,
    myBillings//, isCreator = false, onSubscribe, onManage 
    }: CreatorTabsProps) {


    //const router = useRouter();

    //const [logged, setLogged] = useState<Boolean>(false);
    //const [tabIndex, setTabIndex] = useState<number>(0);
    const [opennedDrawer, setOpennedDrawer] = useState<"Cancelar" | "Marcar como Paga" | "Visualizar" | undefined>(undefined);
    const [selectedSubscription, setSelectedSubscription] = useState<Billing | undefined>(undefined);


    //const handleChange = (event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);

  
    //useEffect(() => {
    //if (!router.isReady) return;

    // Ler parâmetro de aba
    //const tab = router.query.tab;
    //if (tab === "assinaturas") setTabIndex(2);
    //else if(tab === "assinantes") setTabIndex(1);
    //else setTabIndex(0);

    // Ler parâmetro de proposta
    // const recurrentVoucherHash = router.query.recurrentVoucherHash;
    // if (recurrentVoucherHash) {
    //     //const found = propostasMock.find(p => p.id === Number(recurrentVoucherId));
    //     const found = myRecurrentVouchers.find(p => p.hash === recurrentVoucherHash);
    //     if (found) setSelectedRecurrentVoucher(found);
    // }
    // }, [router.isReady, router.query]);

    //const recurrentVoucher:RecurrentVoucher = getSelectedRecurrentVoucher();
    
    // useEffect(() => {
    // if (!router.isReady) return;

    // const proposalId = router.query.proposalId;
    // if (proposalId) {
    //     const found = propostasMock.find(p => p.id === Number(proposalId));
    //     if (found) setSelectedProposal(found);
    // }
    // }, [router.isReady, router.query.proposalId]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>{signedRecurrentVoucher.hid}</Typography>
      {/* <Tabs value={tabIndex} onChange={handleChange} aria-label="abas do criador" sx={{ mb: 2 }}>
        <Tab label="Minhas Propostas" />
        <Tab label="Meus Assinantes" />
        <Tab label="Minhas Assinaturas" />
      </Tabs> */}

      {/* {tabIndex === 0 && (
        <>


          <MyRecurrentVouchersList
            myRecurrentVouchers={myRecurrentVouchers}
            onManage={(proposal: RecurrentVoucher) => setSelectedRecurrentVoucher(proposal)}
          />
          <Box mt={2}>
            <Button variant="contained" onClick={() => alert("Criar nova proposta")}>Criar Nova Proposta</Button>
          </Box>
        </>
      )} */}

      <SubscriptionList 
      myBillings={myBillings} 
      selectedSubscription={selectedSubscription}
      setSelectedSubscription={setSelectedSubscription}
      opennedDrawer={opennedDrawer}
      setOpennedDrawer={setOpennedDrawer}
      signedRecurrentVoucher={signedRecurrentVoucher}/>

      <Drawer
        anchor="right"
        open={opennedDrawer === "Cancelar" && !!selectedSubscription}
        onClose={() => setOpennedDrawer(undefined)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          {recurrentVoucher && (
            <>
              <Typography variant="h6">{recurrentVoucher.hid}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                R$ {recurrentVoucher.cost} / mês
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1">{recurrentVoucher.description}</Typography>
              <Box mt={2}>
                <Button variant="contained" fullWidth onClick={() => alert("Cancelar fatura")}>Cancelar</Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </Container>
  );
}

function SignedRecurrenceSubscriberTabs({ 
    recurrentVoucher,
    signedRecurrentVoucher,
    myBillings
    
    
    }: SubscriberTabsProps) {
  //const [tabIndex, setTabIndex] = useState<number>(0);
  //const userSubscriptions: Subscription[] = [assinaturasMock[0]];

  
  const [opennedDrawer, setOpennedDrawer] = useState<"Pagar" | "Visualizar" | undefined>(undefined);
  const [selectedSubscription, setSelectedSubscription] = useState<Billing | undefined>(undefined);

  // const router = useRouter();

  //   useEffect(() => {
  //   if (!router.isReady) return;

  //   const tab = router.query.tab;
  //   if (tab === "minhas") setTabIndex(0);
  //   else setTabIndex(0);
  //   }, [router.isReady, router.query]);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);


  return (
    <>
      <Typography variant="h5" gutterBottom>{signedRecurrentVoucher.hid}</Typography>
      {/* <Tabs value={tabIndex} onChange={handleChange} aria-label="abas do assinante" sx={{ mb: 2 }}>
        
        <Tab label="Minhas Assinaturas" />
      </Tabs> */}

      {/* {tabIndex === 0 && (
        <ProposalList
          proposals={propostasMock}
          onSubscribe={(id) => alert(`Assinar proposta ${id}`)}
        />
      )} */}

      
      <SubscriptionList 
      myBillings={myBillings} 
      selectedSubscription={selectedSubscription}
      setSelectedSubscription={setSelectedSubscription}
      opennedDrawer={opennedDrawer}
      setOpennedDrawer={setOpennedDrawer}
      signedRecurrentVoucher={signedRecurrentVoucher}/>

      <Drawer
        anchor="right"
        open={opennedDrawer === "Pagar" && !!selectedSubscription}
        onClose={() => setOpennedDrawer(undefined)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          {recurrentVoucher && (
            <>
              <Typography variant="h6">{recurrentVoucher.hid}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                R$ {recurrentVoucher.cost} / mês
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1">{recurrentVoucher.description}</Typography>
              <Box mt={2}>
                <Button variant="contained" fullWidth onClick={() => alert("Pagar fatura")}>Pagar</Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      {/* {tabIndex === 0 && (
        <SubscriptionList
          getSelectedSignedRecurrentVoucher={getSelectedSignedRecurrentVoucher}
          setSelectedSignedRecurrentVoucher={setSelectedSignedRecurrentVoucher}
          mySignedRecurrentVouchers={mySignedRecurrentVouchers}
          onCancel={(id) => alert(`Cancelar assinatura ${id}`)}
        />
      )} */}

      
    </>
  );
}

function MyRecurrentVouchersList({ myRecurrentVouchers, onManage }: ProposalListProps) {
  return (
    <List>
      {myRecurrentVouchers.map((p) => (
        <ListItem key={p.id} divider>
          <ListItemText
            primary={p.hid}
            secondary={`Valor: R$ ${p.cost} / ${p.timeUnit}`}
          />
          {p.isOwner && (
            <ListItemSecondaryAction>
              <Button variant="outlined" onClick={() => onManage && onManage(p)}>
                Gerenciar
              </Button>
            </ListItemSecondaryAction>
          )}
          {/* {!p.isOwner && onSubscribe && (
            <ListItemSecondaryAction>
              <Button variant="outlined" onClick={() => onSubscribe(p.id)}>
                Assinar
              </Button>
            </ListItemSecondaryAction>
          )} */}
        </ListItem>
      ))}
    </List>
  );
}

function SubscriptionList({ 
    myBillings,
    setSelectedSubscription,
    selectedSubscription,
    setOpennedDrawer,
    opennedDrawer,
    signedRecurrentVoucher
    }: SubscriptionListProps) {
    
      
    function onView(s: Billing|undefined): void {
      setSelectedSubscription(s);
      setOpennedDrawer("Visualizar");
    }
      
    function onPay(s: Billing|undefined): void {
      setSelectedSubscription(s);
      setOpennedDrawer("Pagar");
    }
      
    function onSetPaied(s: Billing|undefined): void {
      setSelectedSubscription(s);
      setOpennedDrawer("Marcar como Pago");
    }
    function onCancel(s: Billing|undefined): void {
      setSelectedSubscription(s);
      setOpennedDrawer("Cancelar");
    }
    // const router = useRouter();

    // useEffect(() => {
    // if (!router.isReady) return;

    // // Ler parâmetro de proposta
    // const signedRecurrentVoucherId = router.query.signedRecurrentVoucherId;
    // if (signedRecurrentVoucherId) {
    //     //const found = propostasMock.find(p => p.id === Number(recurrentVoucherId));
    //     const found = mySignedRecurrentVouchers.find(p => p.id === Number(signedRecurrentVoucherId));
    //     if (found) setSelectedSignedRecurrentVoucher(found);
    // }
    // }, [router.isReady, router.query]);

    //const signedRecurrentVoucher:SignedRecurrentVoucher = getSelectedSignedRecurrentVoucher();








    //ao criar a recorrencia, já tem que criar todas as bills
    //tem que ter uma bill e duas transfrencias, uma do dinheiro e outra dos cupons
  return !!!myBillings ?(
  <CenteredComponent>
    <CircularProgress />
  </CenteredComponent>
) : (
  <>
    <List>
      {myBillings.map((s) => (
        <ListItem key={s.id} divider>
        
          <ListItemText
            primary={s.currentCicle}
            secondary={`Status: ${s.status} — Próxima cobrança: ${s.dueAt}`}
          />
          {
            <ListItemSecondaryAction>
              {!!s.isPayer ? 

              <Button variant="outlined" color="error" onClick={() => onPay(s)}>
                Pagar
              </Button>
              :
              <>
              <Button variant="outlined" color="error" onClick={() => onCancel(s)}>
                Cancelar
              </Button>
              <Button variant="outlined" color="error" onClick={() => onSetPaied(s)}>
                Marcar como pago
              </Button>
              </>}
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
        open={opennedDrawer === "Visualizar" && !!selectedSubscription}
        onClose={() => setOpennedDrawer(undefined)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          {signedRecurrentVoucher && (
            <>
              <Typography variant="h6">{signedRecurrentVoucher.hid}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                R$ {signedRecurrentVoucher.cost} / {signedRecurrentVoucher.timeUnit}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1">{signedRecurrentVoucher.description}</Typography>
              <Box mt={2}>
                <Button variant="contained" fullWidth onClick={() => alert("Editar proposta")}>Editar</Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
  </>
  );
}

export default SignedRecurrentVoucheCreated;
