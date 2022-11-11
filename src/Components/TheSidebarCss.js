import { styled } from "@mui/material";

export const SidebarWrap = styled("aside")({
  height: "100vh",
  background: " #fff",
  maxWidth: "325px",
  width: "100%",
  borderRight : "1px solid #E7E7E7",
  ul: {
    marginTop : "200px",
    li: {
      listStyle: "none",
      a: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontWeight: "400",
        fontSize: "20px",
        lineHeight: "30px",
        height: "68px",
        padding : "0 40px",
        svg: {
          height: "28px",
          width: "28px",
          marginRight: "10px",
        },
      },
      active : {
        color : "initial"
      },
      ".active": {
        color: "#5030E5",
        background : "#EDE9FF",
        borderRight: "3px solid #5030E5",
        svg: {
          path: {
            fill: "#5030E5",
          },
        },
      },
    },
  },
});
