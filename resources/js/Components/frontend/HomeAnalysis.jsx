import React from 'react'

const HomeAnalysis = () => {
  return (
    <div className="home_analysis">
      <style>{`
          .boxes{
            // border:1px solid black;
            height:30vh;
            display:flex;
            justify-content:space-between;
            gap:10px;
          }
            .boxe{
              height:100%;
              width:49%;
              // border:1px solid black;

              display:flex;
              place-content:center;
              place-items:center;
              flex-direction:column;
              border-radius:10px;
              .number{
                font-size:70px;
                font-weight:bold;

              }
                .title{
                  font-size:25px;
                }
            }


      `}</style>
      {/* <p className='mt-5 text-2xl'>Service Metrics</p> */}

      <div className="boxes">
        <div className="boxe">
          <p className='number'>200K+</p>
          <p className='title'>Blood Distributions</p>
        </div>
        <div className="boxe">
        <p className='number'>100K+</p>
        <p className='title'>Donors</p>
        </div>
        <div className="boxe">
        <p className='number'>20+</p>
        <p className='title'>Districts</p>
        </div>
      </div>
    </div>
  )
}

export default HomeAnalysis