import React,{ useEffect, useState } from "react";

export const Pagination = () => {
    const[data,setData]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
    const[itemsPerPage,setItemsPerPage]=useState(20)

    const pages = [];

    for(let i=1;i<=Math.ceil(data.length/itemsPerPage);i++){
        pages.push(i)
    }

    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch("http://localhost:8000/api/v1", {
                headers: headerOptions,
            });
            const data = await res.json();
            setData(data);
        };
        fetchApi();
    }, []);

    return (
    <div>Pagination</div>
  )
}
