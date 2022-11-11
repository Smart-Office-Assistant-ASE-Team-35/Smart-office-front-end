import React, { useEffect } from "react";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard';
  },[]);
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Item>
              <h3>Routine</h3>
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item>
              <h3>Deadlines</h3>
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item>
              <h3>Event</h3>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
