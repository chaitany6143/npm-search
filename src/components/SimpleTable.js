/*global chrome*/

import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import ReactTooltip from 'react-tooltip';
import InstallAction from './InstallAction/InstallAction';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

function createData({ name, description, score, links }) {
  return {
    name,
    description,
    score,
    links
  };
}

export default function SimpleTable({ searchResults }) {
  const classes = useStyles();
  const data = searchResults.map(result => createData(result));

  function openInNewTab(url) {
    return () => {
      chrome.tabs.create({ url: url, active: false });
    };
  }
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Score</StyledTableCell>
            <StyledTableCell style={{ width: 35 }} align="left">
              URL
            </StyledTableCell>
            <StyledTableCell align="left">Installation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: 12, fontFamily: 'monospace' }}
              >
                <div
                  style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    color: '#FB3B49'
                  }}
                  onClick={openInNewTab(row.links.npm)}
                >
                  {row.name}
                </div>
              </TableCell>
              <TableCell style={{ fontSize: 12, textAlign: 'left' }}>
                {row.description ? row.description : '-'}
              </TableCell>
              <TableCell style={{ fontSize: 12, textAlign: 'left' }}>
                {row.score.final ? Math.floor(row.score.final * 100) : '-'}{' '}
                <a data-tip data-for={'a' + index}>
                  <img
                    style={{ verticalAlign: 'sub' }}
                    src={'images/info-14.png'}
                  />
                </a>
                <ReactTooltip
                  id={'a' + index}
                  place="bottom"
                  type="info"
                  effect="float"
                >
                  <p>
                    Quality:{' '}
                    {row.score.detail.quality
                      ? Math.floor(row.score.detail.quality * 100)
                      : '-'}
                  </p>
                  <p>
                    Popularity:{' '}
                    {row.score.detail.popularity
                      ? Math.floor(row.score.detail.popularity * 100)
                      : '-'}
                  </p>
                  <p>
                    Maintenance:{' '}
                    {row.score.detail.maintenance
                      ? Math.floor(row.score.detail.maintenance * 100)
                      : '-'}
                  </p>
                </ReactTooltip>
              </TableCell>
              <TableCell style={{ fontSize: 18, textAlign: 'left' }}>
                {row.links.homepage !== row.links.repository ? (
                  <a
                    style={{ color: 'black' }}
                    href={row.links.homepage}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="fa fa-home" />
                  </a>
                ) : null}
                {row.links.repository ? (
                  <a
                    style={{ marginLeft: 5, color: 'black' }}
                    href={row.links.repository}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="fa fa-code-fork" />
                  </a>
                ) : null}
                {!row.links.homepage && !row.links.repository && '-'}
              </TableCell>
              <TableCell>
                <InstallAction packageName={row.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
