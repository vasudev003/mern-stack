import Container from "@mui/material/Container";
import TransactionFrom from "../components/TransactionFrom";
import TransactionsList from "../components/TransactionsList";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import TransactionChart from "../components/TransactionChart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <Container>
      <TransactionChart data={transactions} />
      <TransactionFrom
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
      />
      <TransactionsList
        data={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}
