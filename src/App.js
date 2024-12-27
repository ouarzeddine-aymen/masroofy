import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import Cookies from 'js-cookie';
import Navbar from './Home/Navbar';
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import About from './Home/About';
import Chart from './Home/Chart';
import NotFound from './Home/NotFound';

function App() {

  //Cookies.get("transactions")

  // let transactions = [
  //     {
  //       category: "Business",
  //       transactionName: "fff",
  //       isIncome: true,
  //       amount: 500.99,
  //       date: "26/12/2024",
  //     },
  //     {
  //       category: "Food",
  //       transactionName: "fff",
  //       isIncome: false,
  //       amount: 60,
  //       date: "26/12/2024",
  //     },
  // ]

  // const check = Cookies.get('transactions')
  // let list = []
  // if(check!==undefined ){
  //   list =  JSON.parse(Cookies.get('transactions'));
  //   if(!list.length==0){
  //     transactions = list
  //   }
  // }


  return <>

  <BrowserRouter>

      <Routes>

      <Route path='/' element={<Navbar/>}>

      <Route index element={<Home/>}/>
      <Route path='chart' element={<Chart/>}/>
      <Route path='about' element={<About/>}/>
      
      </Route>

      </Routes>

  </BrowserRouter>
  
    
  
  </>
    
  
}

export default App;
