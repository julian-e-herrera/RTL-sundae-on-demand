import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* SummaryPage amd Entry also needs provider */}
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
