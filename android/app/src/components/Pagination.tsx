import React, { useState, useEffect, useContext, useCallback }  from 'react';


const Pagination = (props: any) => {
    let [pageNumbers, setPageNumbers] = useState([''])

    useEffect(() => {
        for (let i = 1; i <= props.totalPages; i++) {
            setPageNumbers(current => [...current, i.toString()])
        }
        }, [props.totalPages]);

    console.log(props.totalPages)
        

    return (
        <div id = "paginationcontainer">
            <ul className="pagination">
                {props.page == 1 ?
                <li className="pageSwitcherBackDisabled">
                    <a tabIndex={-1}>Previous</a>
                </li> : 
                <li className="pageSwitcherBack">
                    <a tabIndex={-1} style={{cursor:"pointer"}} onClick={() => {props.setCurrentPage(props.page - 1)}}>Previous</a>
                </li>}
                {props.page != 1 && props.page != 2 && props.page != 3 && (<li className="pageSwitcherPage" onClick={() => {props.setCurrentPage(props.page - 3)}}>...</li>)}
                {props.page != 1 && props.page != 2 && (<li className="pageSwitcherPage" onClick={() => {props.setCurrentPage(props.page - 2)}}>{props.page - 2}</li>)}
                {props.page != 1 && <li className="pageSwitcherPage" onClick={() => {props.setCurrentPage(props.page - 1)}}>{props.page - 1}</li>}
                <li className="pageSwitcherPageActive">{props.page}</li>
                <li className="pageSwitcherPage" onClick={() => {props.setCurrentPage(props.page + 1)}}>{props.page + 1}</li>
                <li className="pageSwitcherPage" onClick={() => {props.setCurrentPage(props.page + 2)}}>{props.page + 2}</li>
                <li className="pageSwitcherPage" onClick={() => {props.setCurrentPage(props.page + 3)}}>...</li>
                {props.page == props.totalPages ?
                <li className="pageSwitcherBackDisabled">
                    <a>Next</a>
                </li> :
                <li className="pageSwitcherForward">
                    <a style={{cursor:"pointer"}} onClick={() => {props.setCurrentPage(props.page + 1)}}>Next</a>
                </li>}
            </ul>
        </div>
    );
};

export default Pagination;