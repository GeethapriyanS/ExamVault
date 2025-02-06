import './Main.css';


const Main =()=>{
      return(
        <div className="main_body">
           <div className="main_container">
               <div className="left_side_bar">
                     <div className="all_option_container">
                         <h2 className='side_title'>ExamVault</h2>
                         <div className="options">
                          <div className="option">
                          <i class="fa-solid fa-boxes-stacked"></i>
                          <h3>dashboard</h3>
                          </div>
                          <div className="option">
                          <i class="fa-solid fa-paperclip"></i>
                          <h3>Papers</h3>
                          </div>
                          <div className="option">
                          <i class="fa-solid fa-star"></i> 
                          <h3>Important</h3>
                          </div>
                         </div>
                     </div>
               </div>
                <div className="right_side">
                  <div className="main_navbar">
                     <div className="search_bar">
                       <input type="text" className='search_input' />
                       <button>Search</button>
                     </div>
                     <div className="profile_area">
                         <div className="profile_photo"></div>
                         <h3>BOOPATHI</h3>
                     </div>
                  </div>
                  <div className="main_content_area">
                    <h3>Select Your Study Year :</h3>
                    <div className="year">
                    <div className="years one"></div>
                    <div className="years two"></div>
                    <div className="years three"></div>
                    <div className="years four"></div>
                    </div>
                  </div>
                </div>
           </div>
        </div>
      )
}
export default Main;