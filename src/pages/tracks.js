import React, {useState, useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import TrackCard from '../containers/track-card';
import { Layout, QueryResult } from '../components';
import styled from 'styled-components'
import {JsonToTable} from "react-json-to-table"


let startingPortfolio = [
    {
        "symbol": "VTI",
        "shares": 50.64
    },
    {
        "symbol": "VOO",
        "shares": 50.128
    },
    {
        "symbol": "BNDX",
        "shares": 25.32
    },
    {
        "symbol": "VXUS",
        "shares": 40
    },
    {
        "symbol": "VNQ",
        "shares": 30
    },
    {
        "symbol": "VTIP",
        "shares": 25
    },
    {
        "symbol": "BLV",
        "shares": 26
    }
]

const Styles = styled.div `
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

/** TRACKS gql query to retreive all tracks */
export const GET_PRICES = gql `
  query getClosing($getCloseForDateSymbols: [String!], $getCloseForDateDate: String) {
  getCloseForDate(symbols: $getCloseForDateSymbols, date: $getCloseForDateDate) {
    price
    symbol
  }
}
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
    const symbols = startingPortfolio.map(item => {return item.symbol})
    const [date, setDate] = useState("2020-02-03");

    const { loading, error, data, } = useQuery(GET_PRICES, {
      variables: {
        getCloseForDateSymbols: symbols,
        getCloseForDateDate: date
      }
    })

    if(!loading && error) {
      alert('Please pick a different date')
      window.location.reload()
    }
          return (
            
            <QueryResult loading={ loading } data={ data }>{
              <Styles>
                <JsonToTable json={data?.getCloseForDate}/>
                <form>
                  <label>Enter date</label>
                  <input type="text" defaultValue={date} id="date_input" />
                  
                </form>
                <button onClick={() => setDate(document.getElementById('date_input').value)}>Enter</button>

              </Styles>
              
            }</QueryResult>
          )
};

export default Tracks;