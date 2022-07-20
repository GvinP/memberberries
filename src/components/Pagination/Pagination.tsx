import React from 'react';
import useStyles from './styles'
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {Link} from "react-router-dom";

const Paginate = () => {
    const classes = useStyles()
    return (
      <Pagination classes={{ul: classes.ul}}
                  count={5}
                  page={1}
                  variant={'outlined'}
                  color={'primary'}
                  renderItem={(item)=>(
                      <PaginationItem {...item} component={Link} to={`/posts?page=${1 }`}/>
                  )}
      />
    );
};

export default Paginate;