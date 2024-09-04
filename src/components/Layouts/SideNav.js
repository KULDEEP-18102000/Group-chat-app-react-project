import { Box, Divider, IconButton, Stack,Switch } from "@mui/material";
import { Users,Gear } from "@phosphor-icons/react";
// import { Nav_Buttons,Nav_Setting } from "../../data";
import Logo from '../../assets/Images/logo.ico'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const SideNav=()=>{

  const history=useHistory()

  const routeToMakeGroupPage=()=>{
    history.push('/makeGroup')
}

const routeToGroupSettingPage=()=>{
    history.push('/editGroup')
}

    return(
        <Box
      sx={{
        height: "100vh",
        width: 100,

        backgroundColor:"#F0F4FA",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        py={3}
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Box
            sx={{
              height: 64,
              width: 64,
              borderRadius: 1.5
            }}
            p={1}
          >
            <img src={Logo} height={50} width={50} alt="Tawk" />
          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems={"center"}
            spacing={3}
          >
           
            <IconButton onClick={() => {
                      routeToMakeGroupPage();
                    }}>
            <Users size={32} />
            </IconButton>
            <IconButton  onClick={() => {
                      routeToGroupSettingPage();
                    }}>
            <Gear size={32} />
            </IconButton>
          </Stack>
        </Stack>
        <Stack spacing={4}>
        <Switch defaultChecked />
          {/* Profile Menu */}
          {/* <User size={32} /> */}
        </Stack>
      </Stack>
    </Box>
    )
}

export default SideNav