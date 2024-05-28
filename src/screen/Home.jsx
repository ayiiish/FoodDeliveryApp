
import React, { useEffect, useState } from 'react';
import Navbar from './../component/Navbar';
import Card from './../component/Card';

import Footer from '../component/Footer';




const Home = () => {
  const [search, setsearch] = useState('');
  const [foodcat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);

  const loadData = async () => {
    let response = await fetch('http://localhost:4000/api/displaydata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    response = await response.json();
    setfooditem(response[0]);
    setfoodcat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>     <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" >
    <div className="carousel-inner" id="carousel">
    <div className="carousel-caption"style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
      
    </div>
      </div>
      <div className="carousel-item active ">
          <img src="https://source.unsplash.com/random/400x400/?burger" className="d-block w-100" style={{ filter: 'opacity(50%)' , objectFit: 'cover' , height:'400px' }} alt="Zinger Burger" />
        </div>
        <div className="carousel-item">
          <img src="https://source.unsplash.com/random/400x400/?pasta" className="d-block w-100" style={{ filter: 'opacity(50%)' , objectFit: 'cover', height:'400px' }} alt="Pasta" />
        </div>
        <div className="carousel-item">
          <img src="https://source.unsplash.com/random/400x400/?biryani" className="d-block w-100" style={{ filter: 'opacity(50%)' , objectFit: 'cover' , height:'400px'}} alt="Biryani" />
        </div>
    </div>
  </div>
  </div>

      <div className='container'>
        {
          foodcat !== []
            ? foodcat.map((data) => {
              return ( <div className='row mb-3'>
                <div key={data._id} className='fs-1 mt-4 '>
                  {data.CategoryName}
                  </div>
                 
                  <hr />

                  
                  {fooditem !== [] ? fooditem.filter((item) => (item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase())) ) 
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 '>
                          <Card foodname = {filterItems.name}
                          options = {filterItems.options[0]}
                          imdsrc = {filterItems.img}
                          des = {filterItems.description} 
                          ></Card>
                        </div>
                      )
                    })
                    : <div>no data</div>}
                </div>
              )
            })
            : ""
        }
      </div>
      
      <div><Footer /></div>
     
    </div>
    
  )
}

export default Home;