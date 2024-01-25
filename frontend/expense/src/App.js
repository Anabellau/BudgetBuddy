import React, { useState, useMemo, useEffect } from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './components/Orb/Orb';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Income/Income';
import Expenses from './components/Expenses/Expenses';
import { useGlobalContext } from './context/GlobalContext';
import { gapi } from 'gapi-script';
import { LoginButton } from './authentication/login';
import { LogoutButton } from './authentication/logout';

const clientId = "41880223738-so05f3a1o35bb5b1bjsva99p3g9c9u5i.apps.googleusercontent.com";


function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const isAuthenticated = global.user !== null;

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      {isAuthenticated ? (
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>{displayData()}</main>
        </MainLayout>
      ) : (
        <LoginButton />
      )}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
