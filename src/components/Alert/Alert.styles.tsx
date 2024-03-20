import {Card, CardContent, IconButton, IconButtonProps, styled, Typography} from "@mui/material";
import React from "react";

export const StyledUl = styled("div")({
  display: "flex",
  "list-style": "none",
  margin: 0,
  padding: 0,
  "flex-direction": "column-reverse",
  position: "fixed",
  right: "2em",
  bottom: "2em",
  "max-height": "52px",

  "&.open": {
    "max-height": "max-content",
  },

  "li": {
    "border-radius": "50%",
    //"box-shadow": "0 3px 6px lightgrey",
    display: "grid",
    "place-items": "center",
    margin: "8px 0",
    "font-size": "28px",
    padding: "12px",
    cursor: "pointer",
    position: "relative",
  },

  ".fab-button": {
    "background-color": "#503071",

    "svg": {
      fill: "white",
    }
  },

  ".error": {

    
    display: "flex",
    margin: 0,
    fontWeight: "bold", 
    p: 1.3,
    fontSize: "1rem",
    textTransform: "capitalize",
    width: "60vw",
    

    position: "relative",
    padding: "0rem 1rem 0rem 0rem",
    border: "1px solid transparent",
    "border-radius": "0.25rem",
    "color": "white",
    "background-color": "#842029",
    "border-color": "#f5c2c7",
  },

  ".success": {

    
    display: "flex",
    margin: 0,
    fontWeight: "bold", 
    p: 1.3,
    fontSize: "1rem",
    textTransform: "capitalize",
    width: "60vw",
    

    position: "relative",
    padding: "0rem 1rem 0rem 0rem",
    border: "1px solid transparent",
    "border-radius": "0.25rem",
    "color": "#555555",
    "background-color": "#4AF206",
    "border-color": "#f5c2c7",
  },

  ".alert": {

    
    display: "flex",
    margin: 0,
    fontWeight: "bold", 
    p: 1.3,
    fontSize: "1rem",
    textTransform: "capitalize",
    width: "60vw",
    

    position: "relative",
    padding: "0rem 1rem 0rem 0rem",
    border: "1px solid transparent",
    "border-radius": "0.25rem",
    "color": "#555555",
    "background-color": "#FFF11F",
    "border-color": "#f5c2c7",
  },
  
  /* The close button */
  ".closebtn": {
    "margin-left":" 15px",
    "color": "white",
    "font-weight": "bold",
    "float": "right",
    "font-size": "22px",
    "line-height": "20px",
    "cursor": "pointer",
    "transition": "0.3s"
  },
  
  /* When moving the mouse over the close button */
  ".closebtn:hover": {
    "color": "black"
  },
  ".hide": {
    "display": "none"
  },

  ".fab-action": {
    transform: "translateY(50px) scale(0)",
    transition: "transform 300ms, opacity 300ms",
    opacity: 0,
    "background-color": "#503071",

    "svg": {
      fill: "white",
    },
    
    "&:hover": {
      ".tooltip": {
        transform: "translateX(-100%) scale(1)",
        opacity: 1,
      }
    },

    "&.open": {
      transform: "translateY(0) scale(1)",
      opacity: 1,
    },

    ".tooltip": {
      padding: "4px 6px",
      "font-size": "12px",
      position: "absolute",
      left: "-12px",
      transform: "translateX(-75%)",
      "background-color": "#353b48",
      "border-radius": "4px",
      color: "white",
      opacity: 0,
      transition: "transform 300ms, opacity 300ms",
      "user-select": "none",
    }
  }
});