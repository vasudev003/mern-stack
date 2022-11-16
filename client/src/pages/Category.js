import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import Cookies from "js-cookie";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { setUser } from "../store/auth.js";
import CategoryFrom from "../components/CategroyForm.js";

export default function Category() {
  const token = Cookies.get("token");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = React.useState({});

  function setEdit(category) {
    setEditCategory(category);
  }

  async function remove(id) {
    const res = await fetch(`${process.env.React_APP_API_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const _user = {
        ...user,
        categories: user.categories.filter((cat) => cat._id !== id),
      };
      dispatch(setUser({ user: _user }));
    }
  }

  return (
    <Container>
      <CategoryFrom editCategory={editCategory} />
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Categories
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} variant="h6" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">label</TableCell>
              <TableCell align="center">icon</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="center">{row.icon}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component="label"
                    onClick={() => setEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    component="label"
                    onClick={() => remove(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
