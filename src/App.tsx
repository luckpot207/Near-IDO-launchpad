import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Header from "./pages/header";
import Listings from "./pages/listings";
import Treasury from "./pages/treasury";
import Account from "./pages/account";
import Create from "./pages/create";
import Swap from "./pages/swap";
import NoPage from "./pages/404";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Flex
          as="main"
          padding={{ base: "4", md: "8" }}
          maxWidth="5xl"
          marginX="auto"
          flexDirection="column"
          height="calc(100vh - 80px)"
        >
          <Routes>
            <Route path="/" element={<Listings />} />
            <Route path="/treasury" element={<Treasury />} />
            <Route path="/account" element={<Account />} />
            <Route path="/create" element={<Create />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Flex>
      </Router>
    </div>
  );
}

export default App;
