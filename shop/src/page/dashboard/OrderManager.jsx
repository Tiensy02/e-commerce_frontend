import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useMemo, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Button } from '@mui/material';
import { getLoggedInUser } from '../../heppler/authUtils';
import { useFetchOrderItemByOwnProductQuery, useUpdateOrderItemStatusMutation } from '../../redux/order/apiSlice';
import { useFetchProductsByIdsQuery } from '../../redux/product/apiSlice';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useFetchShopProductsQuery } from '../../redux/product/apiSlice';
import { LoadingComponent } from '../../components/Loadding';
import { converToMoney } from '../../heppler/stringUtils';
import { Link } from 'react-router-dom/cjs/react-router-dom';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useFetchUserByIdsMutation } from '../../redux/user/apiSlice';
import { toast } from 'react-toastify';
import { isArray } from '../../heppler/arrayUtils';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function createProductView({ productName, productImage, id }) {
  return (
    <Link to={{ pathname: `/dashboard/products/add/${id}`, state: { productId: id } }}>
      <div className='d-flex column-gap-2 align-items-center p-2' >
        <img src={productImage} style={{ height: "80px", width: "80px", borderRadius: "4px" }} alt={productName} />
        <div className='ms-2' style={{ display: 'flex', flexDirection: "column", rowGap: "8px" }}>
          <p style={{ padding: 0, margin: 0 }}>{productName}</p>
          <p style={{ padding: 0, margin: 0 }}>{"ID: " + id}</p>
        </div>
      </div>
    </Link>

  )
}


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
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);

}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Tên sản phẩm',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Giá',
    handleData: (value) => {
      return converToMoney(value)
    }
  },
  {
    id: 'quantityOrder',
    numeric: true,
    disablePadding: true,
    label: 'Đơn hàng',
  },
  {
    id: 'stock',
    numeric: true,
    disablePadding: false,
    label: 'Kho',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: '     ',
    action: 'Xem chi tiết'
  },

];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%', textAlign: 'start' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Đã chọn {numSelected}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', textAlign: 'start' }}
          variant="h6"
          id="tableTitle"
          component="div"

        >
          Đơn hàng
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
function OrderElem({ status, handleUpdateStatus, products, orderItems }) {
  console.log(products);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [selectRow, setSelectRow] = useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };


  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;
  const visibleRows = useMemo(
    () => {
      if (products && products.length > 0) {
        return stableSort(products, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        );
      }
    },
    [order, orderBy, page, rowsPerPage, products]);
  return <>
    {products && products.length > 0 && <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={products.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow key={index}
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, row.id)}

                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>

                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {createProductView({ productName: row.name, productImage: row.imagePrimary, id: row.id })}
                    </TableCell>
                    {headCells.slice(1, headCells.length).map((elem, index) => {
                      if (elem.handleData) {
                        return (
                          <TableCell key={index} align="right">{elem.handleData(row[elem.id])}</TableCell>
                        )
                      } else if (elem.action && status) {
                        return (
                          <>
                            <TableCell onClick={() => {
                              setSelectRow({ userId: row.userOrderId, orderItemId: row.orderItemId })
                              handleClickOpen()
                            }} className='table_action' key={index} align="right">{elem.action}</TableCell>
                            <BootstrapDialog
                              onClose={handleClose}
                              aria-labelledby="customized-dialog-title"
                              open={open}
                            >
                              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                Chi tiết đơn hàng
                              </DialogTitle>
                              <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                  position: 'absolute',
                                  right: 8,
                                  top: 8,
                                  color: (theme) => theme.palette.grey[500],
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                              <DialogContent sx={{ height: "400px", width: "600px" }} dividers>
                                <OrderDetail handleUpdateStatus={handleUpdateStatus} userIds={selectRow?.userId} orderItemIds={selectRow?.orderItemId} orderItems={orderItems}></OrderDetail>
                              </DialogContent>
                              <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                  Chấp nhận tất cả
                                </Button>
                              </DialogActions>
                            </BootstrapDialog>
                          </>
                        )
                      } else
                        return (
                          <TableCell key={index} align={elem.numeric ? "right" : "left"}>{row[elem.id]}</TableCell>
                        )
                    })}

                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>}
    {
      (!products || products.length == 0) && <div>
        <div className='empty_table'>
          <div className='empty_table_text'>Không có sản phẩm nào</div>
        </div>
      </div>
    }
  </>
}

export default function OrderManager() {
  const [valueTab, setValueTab] = useState(0);
  const userCurrent = getLoggedInUser();
  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const { data: response, isSuccess: isGetOrderSuccess, isLoading: isLoadingGetOrderSuccess } = useFetchOrderItemByOwnProductQuery(userCurrent.userId)
  // console.log(response.orderItems);

  const [productIds, setProductIds] = useState([])
  const [productsSelect, setProductSelect] = useState([])

  const { data: products, isSuccess: isGetProductsSuccess, isLoading: isLoadingGetProduct } = useFetchProductsByIdsQuery(productIds, { skip: productIds.length == 0 })
  const [updateOrderItemStatus, { isSuccess: isSuccessUpdate, isLoading: isLoadingUpdate }] = useUpdateOrderItemStatusMutation()

  function handleUpdateStatus(orderItemIds, status) {
    if (!isArray(orderItemIds)) {
      orderItemIds = [orderItemIds]
    }
    let statusUpdate = "CONFIRM"
    switch (status) {
      case "CONFIRM":
        statusUpdate = "PACKING"
        break;
      case "PACKING":
        statusUpdate = "SHIPPING"
        break;
    }
    const data = {
      orderItemId: orderItemIds,
      status: statusUpdate
    }
    updateOrderItemStatus(data).then((value) => {
      if (value.error) {
        toast.error("Cập nhật trạng thái không thành công")
      } else {
        console.log(value);
        toast.success("Cập nhật trạng thái thành công")
      }
    })
  }

  useEffect(() => {
    if (response) {
      if (response?.orderItems && response?.orderItems.length > 0) {
        setProductIds(prevProductIds => {
          const newProductIds = response.orderItems.map(elm => elm.productId);
          return [...new Set([...prevProductIds, ...newProductIds])];
        })

      }
    }

  }, [isGetOrderSuccess, isLoadingGetOrderSuccess])

  useEffect(() => {
    if (products) {
      setProductSelect(prev => {
        const newProductSelect = products.map(elm => {
          const order = response.orderItems.filter(order => order.productId == elm.id)[0]
          return {
            ...elm,
            quantityOrder: order.quantity,
            status: order.status,
            orderItemId: order.id,
            userOrderId: order.order.map(el => el.userId)
          }
        })
        return [...newProductSelect]
      });
    }
  }, [products])

  function filterStatus(status) {

    return productsSelect.filter((elem) => elem.status == status)
  }

  return <>
    <Box >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example">
          <Tab label="Tất cả" {...a11yProps(0)} />
          <Tab label="Xác nhận đơn hàng" {...a11yProps(1)} />
          <Tab label="Đang giao hàng" {...a11yProps(2)} />
          <Tab label="Hoàn thành" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={valueTab} index={0}>
        {response && !isLoadingGetProduct && <OrderElem handleUpdateStatus={handleUpdateStatus} orderItems={response.orderItemOrigin} products={productsSelect ? productsSelect : []} />}
      </CustomTabPanel>
      <CustomTabPanel value={valueTab} index={1}>
        {response && !isLoadingGetProduct && <OrderElem status={"CONFIRM"} handleUpdateStatus={handleUpdateStatus} orderItems={response.orderItemOrigin} products={productsSelect ? filterStatus("CONFIRM").concat(filterStatus("PACKING")) : []} />}
      </CustomTabPanel>
      <CustomTabPanel value={valueTab} index={2}>
        {response && !isLoadingGetProduct && <OrderElem status={"SHIPPING"} handleUpdateStatus={handleUpdateStatus} orderItems={response.orderItemOrigin} products={productsSelect ? filterStatus("SHIPPING") : []} />}
      </CustomTabPanel>
      <CustomTabPanel value={valueTab} index={3}>
        <OrderElem />
      </CustomTabPanel>
    </Box>
  </>

}
/**
 * 
 * @param {[]} orderItems: mảng tất cả orderItem chưa bị gộp ban đầu
 * @param {[]} orderItemIds: mảng id các orderItem được chọn
 * 
 */
function OrderDetail({ handleUpdateStatus, orderItemIds, orderItems, userIds }) {
  const [orderSelect, setOrderSelect] = useState([])
  const [getUses, { isSuccess }] = useFetchUserByIdsMutation()
  const [orderValids, setOrderValids] = useState(orderItems.filter(elem => orderItemIds.includes(elem.id)))
  const [isLoadSuccess, setIsLoadSuccess] = useState(false)

  useEffect(() => {
    if (!isLoadSuccess) {
      getUses(userIds).then(value => {
        if (value.error) {
          toast.error("không lấy được danh sách người mua")
        } else {
          const newOrderValids = orderValids.map((elem) => {

            if (value.data.filter((user) => user.id == elem.order.userId).length > 0) {
              return { ...elem, user: value.data.filter((user) => user.id == elem.order.userId)[0] }
            } return elem
          })
          setOrderValids(newOrderValids)
          setIsLoadSuccess(true)
        }
      }
      )
    }
  }, [isLoadSuccess])



  return <>
    {isLoadSuccess && <table class="styled-table">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Email</th>
          <th>Số đơn</th>
          <th></th>
        </tr>
      </thead>
      <tbody>

        {orderValids.map((elm, index) => {
          return (<tr>
            <td>{elm.user.name}</td>
            <td style={{ fontStyle: "italic", fontSize: "14px" }}>{elm.user.email}</td>
            <td>{elm.quantity}</td>
            <td className='table_action' onClick={() => {
              handleUpdateStatus(elm.id, elm.status)
            }
            }>{elm.status == "PACKING" ? "Gọi shipper đến giao hàng" : "Xác nhận"}</td>
          </tr>)
        })}

      </tbody>
    </table>}
    {!isLoadSuccess && <LoadingComponent isWindow={false}></LoadingComponent>}
  </>
}