import React, { useEffect, useState } from "react";
import im from "./ronaldo.jpg";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../Products/style.css";
import "./product";
import { useParams } from "react-router";
import axios from "axios";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";

function Products() {

  let {cate} = useParams();
  const [data,setData] = useState([]);
  async function getData(cate){
    console.log(cate)
      const res  = await axios.get("http://localhost:3000",{params:{
        cate:cate
      }}).then(data=>setData(data.data))
  }


  useEffect(()=>{
    getData(cate)
  },[])
  // pagination 

  const items = 4
  const [cur,setCur] = useState(1)
  const numOfPage = Math.ceil(data.length/items)
  let eachPage = [];
  for(let i = 1;i<=numOfPage;i++){
    eachPage.push(i);
  }
  const startIndex = (cur-1) * items
  const endIndex = startIndex + items

  const dataPerPage = data.slice(startIndex,endIndex)

return (
  <div>
    <div className="products">
      <h1 style={{textAlign:"center",textTransform:"capitalize"}}>{cate} Products</h1>
      <div className="container">
        <div className="row">
          {dataPerPage.map((item) => {
            const Price = Math.round(item.Product_Price)
            return (
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
              <div className="card pro-card">
                <img src={item.Product_img1} alt="" className="card-img-top card-img" loading="lazy" />
                {item.isNew ? <span className="newSeazon">New Seazon</span>:null}
                <div className="card-body">
                  <h6 className="card-title mt-2">{item.Product_Name}</h6>
                  <button className="btn mt-3 btn-dark">add to cart</button>
                  <button className="btn mx-1 mt-3 btn-outline-danger"><FavoriteIcon/></button>
                  <h4 className="card-text float-end  mt-4  price">${Price}</h4>
                </div>
              </div>
            </div>
            );
          })}

          <div className="pagination">
          <div className="icons">
        <div className="icon" onClick={()=>{
          if(cur == 1){
            return;
          }
          setCur(cur - 1 )
        }}>
          <WestOutlinedIcon />
        </div>
            {eachPage.map(item=>{
              if(item == cur){
                return(<>
                  <div className="icon" style={{background:"#000",color:"#fff"}}>
                    {item}
                  </div>
                  </>)
              }
              return(<>
              <div className="icon" onClick={()=>{
                setCur(item)
              }}>
                {item}
              </div>
              </>)
            })}
        <div className="icon" onClick={()=>{
          if(cur == numOfPage){
            return;
          }
          setCur(cur + 1)
        }} >
          <EastOutlinedIcon />
        </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

export default Products;
