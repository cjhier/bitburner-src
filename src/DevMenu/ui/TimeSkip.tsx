import React, { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Player } from "@player";
import { saveObject } from "../../SaveObject";
import { Engine } from "../../engine";

// Update as additional BitNodes get implemented

export function TimeSkip(): React.ReactElement {
  const [isTimeSkipping, setIsTimeSkipping] = useState(false);

  function timeskip(time: number) {
    return () => {
      Player.lastUpdate -= time;
      Engine._lastUpdate -= time;

      setIsTimeSkipping(true); // Set the flag to indicate time skip

      setTimeout(() => {
        setIsTimeSkipping(false); // Reset the flag after timeout
        saveObject.saveGame();
        location.reload(); // Reload the page
      }, 1000);
    };
  }

  function handleAutoSave() {
    if (!isTimeSkipping) {
      saveObject.saveGame(); // Save the game if not time skipping
    }
  }

  // Add an event listener to handle auto-save
  window.addEventListener("beforeunload", handleAutoSave);

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Time skip</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button onClick={timeskip(60 * 1000)}>1 minute</Button>
        <Button onClick={timeskip(60 * 60 * 1000)}>1 hour</Button>
        <Button onClick={timeskip(24 * 60 * 60 * 1000)}>1 day</Button>
      </AccordionDetails>
    </Accordion>
  );
}
