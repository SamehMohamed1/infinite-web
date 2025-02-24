import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../Products/style.css";
import "./product";
import { useParams } from "react-router";
import axios from "axios";
import FavoriteIcon from '@mui/icons-material/Favorite';

import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../rtk/slices/Cart-slice";
import { Link } from "react-router-dom";

function Products() {


  const state = useSelector(state=>state)
  console.log(state.cart)
  const dispatch = useDispatch()
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
  },[data])
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
          {dataPerPage.length > 0  ? dataPerPage.map((item) => {
            const Price = Math.round(item.Product_Price)
            return (
           
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5" key={item.Product_Id}>
              <div className="card pro-card">
              <Link to={`/product/${item.Category}/${item.Product_Id}`}>
                <img src={item.Product_img1} alt="" className="card-img-top card-img" loading="lazy" />
                </Link>
                {item.isNew ? <span className="newSeazon">New Seazon</span>:null}
                <div className="card-body">
                  <h6 className="card-title mt-2">{item.Product_Name}</h6>
                  <button className="btn mt-3 btn-dark" onClick={()=>{
                    dispatch(addToCart(item))
                  }}>add to cart</button>
                  <button className="btn mx-1 mt-3 btn-outline-danger no-hover "><FavoriteIcon className="svgnohover"/></button>
                  <h4 className="card-text float-end  mt-4  price">${Price}</h4>
                </div>
              </div>
            </div>
          
            );
          }):<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <span class="loader"></span>
            </div>}

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
