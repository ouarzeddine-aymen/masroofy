import React from "react";
import Cookies from 'js-cookie';
import {
    Chart as ChartJs,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

import { Pie } from 'react-chartjs-2'

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function Chart(){




    let transactions = [
        {
          category: "Business",
          transactionName: "create a landing page for a client",
          isIncome: true,
          amount: 5000,
          date: "26/12/2024",
        },
        {
          category: "Food",
          transactionName: "bought a pizza",
          isIncome: false,
          amount: 600,
          date: "26/12/2024",
        },
    ]
        const check = Cookies.get('transactions')
          let list = []
          if(check!==undefined ){
            list =  JSON.parse(Cookies.get('transactions'));
            if(list.length!=0){
              transactions = list
            }
          }
        

        let income = 0;
        let expense = 0;

        transactions.forEach(transaction => {
            if(transaction.amount != ""){
                if(transaction.isIncome){
                    income+= parseFloat(transaction.amount)
                }else{
                    expense+= parseFloat(transaction.amount)
                }
            }
        });

        
        
        console.log(income , expense)


    const data = {
        labels: ['Income' , 'Expense'],
        datasets : [
        {
            data: [income , expense ],
            backgroundColor: ['#2ecc71', '#e74c3c'],
        }
    ]
    };

    const options = {}

    return <>

<div style={{ textAlign: "center" }}>
    
    <h1>Chart</h1>

    <div style={
        {
            padding: '20px',
            width: '37%',
            margin: '0 auto', // This will center the div
            textAlign: "center",
            
        }
    }>

        <Pie
            data = {data}
            options = {options}
        >
            
        </Pie>

    </div>

    </div>
    
    </>
}