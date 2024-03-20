import { MouseEventHandler, useState } from "react";
import cn from "classnames";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useRouter } from "next/router";

import EventIcon from '@mui/icons-material/Event';
import CasinoIcon from '@mui/icons-material/Casino';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';

import {
    StyledUl
} from "./Fab.styles";

interface FABProps  {
    label: string;
    icon?: any;
    onClick?: MouseEventHandler<HTMLLIElement>;
}

const FAB = ({ actions }:any) => {
  const [open, setOpen] = useState(false);

  // Set open state to true if user hover over "ul" element 
  const mouseEnter = () => setOpen(true);

  // Set open state to false if user hover out of "ul" element 
  const mouseLeave = () => setOpen(false);

  return (
    <StyledUl
      className="fab-container"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <li className="fab-button">
        {open?<ExpandLessIcon />:<ExpandMoreIcon />}
      </li>
      {actions.map((action:FABProps, index: number) => (
        <li
          style={{ transitionDelay: `${index * 25}ms` }}
          className={cn("fab-action", { open })}
          key={action.label}
          onClick={action.onClick}
        >
          {action.icon}
          <span className="tooltip">{action.label}</span>
        </li>
      ))}
    </StyledUl>
  );
};


export const FloatingButtonFAB = () => {
  const { push } = useRouter();
  const newMatch = () => {
    push('create-match');
  }

  const newEvent = () => {
    push('create-event');
  }
  const newCoin = () => {
    push('create-coin');
  }

  const newVoucher = () => {
    push('create-voucher');
  }

  return (
    <FAB actions={[
      {label: 'Nova Aposta', icon: <CasinoIcon/>, onClick: newMatch},
      {label: 'Novo Evento', icon: <EventIcon/>, onClick: newEvent},
      {label: 'Novo Cupom', icon: <LocalActivityIcon/>, onClick: newCoin},
      {label: 'Novo Vale Cupom', icon: <BatchPredictionIcon/>, onClick: newVoucher},
      ]}></FAB>
  );
};

export default FAB;