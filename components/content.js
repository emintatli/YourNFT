function Content(props) {
    return (<>
   {props.bg?<>
   <div className="card mt-2 bgcontent">
    </div><div className="card-content pos-abs">
     {props.children}
     </div></>:
     <div className="card mt-2 ">
        <div className="card-content">
     {props.children}
     </div></div>} 
    </>
        
    );
  }
  
  export default Content;
  