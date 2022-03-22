import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableContainer, TablePagination, TableSortLabel, TextField, MenuItem } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useSelector } from 'react-redux';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.address}</TableCell>
        <TableCell align="center">{row.age}</TableCell>
        <TableCell align="center">{row.gender}</TableCell>
        <TableCell align="center">{row.Uid}</TableCell>
        < TableCell align="center">{row.Tid}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Condition
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Temperature(F)</TableCell>
                    <TableCell>Bllod Pressure(BP)</TableCell>
                    <TableCell align="right">Oxygen Level(BLO)</TableCell>
                    <TableCell align="right">Date Of Appointment</TableCell>
                    <TableCell align="right">Date Of Booking</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => ( */}
                  <TableRow >
                    <TableCell component="th" scope="row">
                      {row.currentTemp}
                    </TableCell>
                    <TableCell>{row.currentBp}</TableCell>
                    <TableCell align="right">{row.currentOxygen}</TableCell>
                    <TableCell align="right">{row.dateOfAppoint}</TableCell>
                    <TableCell align="right">{row.dateOfBooking}</TableCell>
                    {/* <TableCell align="right">
                      {Math.round(historyRow.amount * row.price * 100) / 100}
                    </TableCell> */}
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function CollapsibleTable({ allPat, handleDocChange, doc }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };


  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, allPat.length - page * rowsPerPage);
  const doctors = useSelector(state => state.reducers.OPD.doctors)
  console.log(allPat)
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "20%" }}>
                <TextField
                  id="doctor"
                  name="doctor"
                  select
                  label="Doctor"
                  // style={{ paddingLeft: "18px", paddingRight: "18px" }}
                  value={doc}
                  onChange={handleDocChange}
                >
                  {[{ doctorId: 0, doctorName: "All", qualification: "Doctors" }, ...doctors].map((doc) => {
                    return <MenuItem value={doc.doctorId} >
                      {`${doc.doctorName} (${doc.qualification})`}
                    </MenuItem>
                  })}
                </TextField>
              </TableCell>
              <TableCell variant="head">Name</TableCell>
              <TableCell align="center" variant="head">Address</TableCell>
              <TableCell align="center" variant="head">Age</TableCell>
              <TableCell align="center" variant="head">Gender</TableCell>
              <TableCell align="center" variant="head">Patient UUId</TableCell>
              <TableCell align="center" variant="head">
                <TableSortLabel
                  active={orderBy === "sqltime"}
                  direction={orderBy === "sqltime" ? order : 'asc'}
                  onClick={createSortHandler("sqltime")}
                >
                  Token Id
                  {orderBy === "sqltime" ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(allPat, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (<Row key={row.UId} row={row} />)
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={allPat.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
