import React from 'react';


const Card = (props) => {
  let options = props.options;
  let priceOptions = Object.keys(options);
  
  return (
    <div>

      <div className="card m-3 shadow rounded-lg" style={{ "width": "15rem", "maxHeight": "400px" }}>
        <img src={props.imdsrc} className="card-img-top" alt="..."  style={{height:'120px',objectFit:'fill'}}/>
        <div className="card-body">
          <h5 className="card-title">{props.foodname}</h5>
          <p className="card-text">{props.des} </p>
          <select className='m-2 h-100 bg-light rounded'>

            {Array.from(Array(10), (e, i) => {
              return (
                <option key={i = 1} value={i + 1}>{i + 1}</option>
              )
            })}
          </select>
          <select className='m-2 h-100 bg-light rounded'>
            {priceOptions.map((data) => {
              return <option key={data} value={data}>{data}</option>
            })}
          </select>

           <div className='container w-100'>
            <div className='d-inline h-100 fs-5'>Total Price</div>

          </div>
        </div>
        
        <button className='btn btn-success justify-center '>  Add to Card</button>
      </div>
    </div>



  )
}

export default Card