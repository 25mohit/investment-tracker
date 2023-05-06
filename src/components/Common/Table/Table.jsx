const Table = ({ columnData, tableData }) => {
    
  return (
    <div className='table'>
        <table cellSpacing={0}>
            <thead>
                <tr>
                {
                    columnData?.map((column, indx) => 
                        <th key={indx}>{column.name}</th> )
                    }
                </tr>
            </thead>
            <tbody>
                    {
                        tableData?.map((data, indx) => 
                        <tr key={indx} className={data?.invAction === 'Sell' ? 'sell-row': ''}>
                            <td>{indx+1}</td>
                            <td>INVOICE</td>
                            <td>{data?.invType}</td>
                            <td>{data?.invAssetName}</td>
                            <td>₹ {data?.invAssetPrice}</td>
                            <td>{data?.invDate?.slice(0,10)}</td>
                            <td>{data?.invQuantity}</td>
                            <td>{data?.invAction}</td>
                            <td>{data?.invAction === 'Sell' ? '-' :''}&nbsp;₹ {data?.invAmount}</td>
                        </tr>)
                        
                    }
            </tbody>
        </table>
    </div>
  )
}

export default Table