import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import ReactTooltip from 'react-tooltip'
import InstallAction from './InstallAction/InstallAction';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function createData({name, description, score, url}) {
  return ({
    name,
    description,
    score,
    url,
  });
}

export default function SimpleTable({searchResults}) {
  const classes = useStyles();
  const data = searchResults.map(result => createData(result));

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Score</StyledTableCell>
            <StyledTableCell align="left">URL</StyledTableCell>
            <StyledTableCell align="left">Installation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" style={{fontSize: 12, fontFamily: 'monospace'}}>
                {row.name}
              </TableCell>
              <TableCell style={{fontSize: 12, textAlign: 'left'}}>{row.description}</TableCell>
              <TableCell style={{fontSize: 12, textAlign: 'left'}}>
                <p>{ row.score.final ? Math.floor(row.score.final * 100) : '-'} <a data-tip data-for="scoreTooltip"><img style={{verticalAlign: 'sub'}} src={'images/info-14.png'}/></a></p>
                <ReactTooltip id="scoreTooltip" place="bottom" type="info" effect="float">
                  <p>Quality: { row.score.detail.quality ? Math.floor(row.score.detail.quality  * 100) : '-' }</p>
                  <p>Popularity: { row.score.detail.popularity ? Math.floor(row.score.detail.popularity * 100) : '-'}</p>
                  <p>Maintenance: { row.score.detail.maintenance ? Math.floor(row.score.detail.maintenance * 100) : '-'}</p>
                </ReactTooltip>
                </TableCell>
              <TableCell style={{fontSize: 12, textAlign: 'left'}}>
                <a href={row.url} rel="noopener noreferrer" target="_blank">
                  {row.url}
                </a>
              </TableCell>
              <TableCell>
                <InstallAction packageName={row.name}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}