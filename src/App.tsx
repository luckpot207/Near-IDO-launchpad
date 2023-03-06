import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useNearContext } from "./hooks";
import Header from "./pages/layout/header";
import Footer from "./pages/layout/footer";
import Listings from "./pages/listings";
import Listing from "./pages/listing";
import Treasury from "./pages/treasury";
import Account from "./pages/account";
import Create from "./pages/create";
import Swap from "./pages/swap";
import Project from "./pages/project";
import Setting from "./pages/setting";
import Detail from "./pages/detail";
import NoPage from "./pages/layout/404";
import "./App.css";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10 * 60 * 1000, // 10 mins
      refetchOnWindowFocus: false,
    },
  },
});


function App() {
  const { role } = useNearContext()

  console.log('role is', role)

  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Flex
            as="main"
            padding={{ base: "4", md: "8" }}
            maxWidth="7xl"
            marginX="auto"
            flexDirection="column"
            justifyContent='center'
          // height="calc(100vh - 80px)"
          >
            <Routes>
              <Route path="/" element={<Listings />} />
              <Route path="/create" element={<Create />} />
              <Route path="/treasury" element={<Treasury />} />
              <Route path="/account" element={<Account />} />
              <Route path="/project" element={<Project />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/listing/:projectId" element={<Listing />} />
              <Route path="/setting/:projectId" element={<Setting />} />
              <Route path="/detail/:projectId" element={<Detail />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </Flex>
        </QueryClientProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;