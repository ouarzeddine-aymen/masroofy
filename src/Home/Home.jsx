import React, { useRef, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import "./styles.css";
export default function Home(){

    let oldtransactions = [
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
      if(!list.length==0){
        oldtransactions = list
      }
    }

    let [newTransactions, setNewTransactions] = useState(oldtransactions)

    useEffect(() => {
    if (typeFilterRef.current.value === undefined || typeFilterRef.current.value === "all") {
        document.querySelector("#categoryFilter").disabled = true;
    } else {
        document.querySelector("#categoryFilter").disabled = false;
    }
}, []);

    const formatDate = (dateString) => {
        if(dateString===''){
            return ''
        }
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    const formatDate2 = (dateString) => {
        if(dateString===''){
            return ''
        }
        const [day, month, year] = dateString.split("/");
        return `${year}-${month}-${day}`;
    };

    const capitalizeFirstLetter = (str) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      };


    let incomeCategories = ["Business","Investments","Extra income","Deposits","Lottery","Gifts","Salary","Savings","Rental income"]
    let expenseCategories = ["Bills","Car","Clothes","Travel","Food","Shopping","House","Entertainment","Phone","Pets","Other"]

    let incomeCategoriesFilter = ["ALL","Business","Investments","Extra income","Deposits","Lottery","Gifts","Salary","Savings","Rental income"]
    let expenseCategoriesFilter = ["ALL","Bills","Car","Clothes","Travel","Food","Shopping","House","Entertainment","Phone","Pets","Other"]


    let [transactions,setTransactions] = useState([...oldtransactions])
    let [type,setType] = useState("income")
    let dateRef = useRef()
    let amountRef = useRef()
    let transactionNameRef = useRef()
    let categoryRef = useRef()

    let categoryFilterRef = useRef()
    

    

    const addTransaction = (e)=>{

        e.preventDefault()
        
        let transaction = {
            category: categoryRef.current.value,
            isIncome: type === "income",
            amount: amountRef.current.value,
            date: formatDate(dateRef.current.value),
            transactionName: transactionNameRef.current.value,
          }

            const updatedTransactions = [transaction,...transactions];

            Cookies.set('transactions', JSON.stringify(updatedTransactions), { expires: 31, path: '/' });

            dateRef.current.value = ""
            amountRef.current.value = ""
            categoryRef.current.value = ""
            
            
          setTransactions([transaction,...transactions])
          setNewTransactions([transaction,...transactions])
    }

    const addExistTransaction = (e) => {
        e.preventDefault();

        let transaction = {
            category: categoryRef.current.value,
            isIncome: type === "income",
            amount: amountRef.current.value,
            date: formatDate(dateRef.current.value),
            transactionName: transactionNameRef.current.value,
        };
    
        // Update the transactions array immutably
        const updatedTransactions = transactions.map((item, index) => 
            index === key ? transaction : item
        );
    
        // Save updated transactions in cookies
        Cookies.set('transactions', JSON.stringify(updatedTransactions), { expires: 31, path: '/' });
    
        // Clear form fields
        dateRef.current.value = "";
        amountRef.current.value = "";
        categoryRef.current.value = "";
    
        // Update state
        setTransactions(updatedTransactions);
        setNewTransactions(updatedTransactions);
        resetForm()
    };



    const deleteTransaction = (index) => {
        const updatedTransactions = transactions.filter((_, i) => i !== index);

        Cookies.set('transactions', JSON.stringify(updatedTransactions), { expires: 31, path: '/' });

        setTransactions([...updatedTransactions]);
        setNewTransactions([...updatedTransactions])
    };

    const resetForm = ()=>{
        dateRef.current.value = "";
        amountRef.current.value = "";
        transactionNameRef.current.value = "";
        categoryRef.current.value = "";
        setType("income")
        setIsUpdate(false)
    }

    let [isUpdate , setIsUpdate] = useState(false);

    const [key, setKey] = useState(null);


    const updateTransaction = (index) => {
        setKey(index)
        const transaction = transactions[index];
    
        // Update type first to ensure re-render
        const transactionType = transaction.isIncome ? "income" : "expense";
        setType(transactionType);
    
        // Populate form fields after type is set
        setTimeout(() => {
            document.querySelector("#date").value = formatDate2(transaction.date);
            document.querySelector("#amount").value = transaction.amount;
            document.querySelector("#transactionName").value = transaction.transactionName;
            document.querySelector("#type").value = transactionType;
            document.querySelector("#category").value = transaction.category;
            setIsUpdate(true);
        }, 0);
    };

    let income = 0
    let expense = 0
    let balance = 0


    const handleReset = ()=>{

       typeFilterRef.current.value = "all"
       dateFilterRef.current.value = ""

      //categoryFilterRef.current.value = "Category"

       dateRef.current.value = ""
       amountRef.current.value = ""
       transactionNameRef.current.value = ""
        document.querySelector("#type").value = "income"
       categoryRef.current.value = ""

        setIsUpdate(false)
        filterTransactions()
    }
   
    const getBalance = ()=>{

        let _income = 0;
        let _expense = 0;

        transactions.forEach(transaction => {
            if(transaction.amount != ""){
                if(transaction.isIncome){
                    _income+= parseFloat(transaction.amount)
                }else{
                    _expense+= parseFloat(transaction.amount)
                }
            }
        });
        
        income = _income
        expense = _expense
        balance = (_income - _expense).toFixed(2)
    }

    let typeFilterRef = useRef("all")
    let dateFilterRef = useRef("")
    let [categoriesFilter , setCategoriesFilter] = useState([])


    const filterTransactions = ()=>{

        if(typeFilterRef.current.value == undefined || typeFilterRef.current.value == "all"){
            document.querySelector("#categoryFilter").disabled = true;
        }else{
            document.querySelector("#categoryFilter").disabled = false;
        }

        categoryFilterRef.current.value = ""

        let typeFilter = typeFilterRef.current.value
        if(typeFilter == undefined){
            typeFilter = "all"
        }
        let dateFilter = dateFilterRef.current.value
        if(dateFilter == undefined){
            dateFilter = ""
        }
        

        let filteredTransactions = transactions
        if(typeFilter == "income"){
            filteredTransactions = filteredTransactions.filter(transaction => transaction.isIncome);
            setCategoriesFilter(incomeCategoriesFilter)
            setNewTransactions([...filteredTransactions])
        }else if(typeFilter == "expense"){
            filteredTransactions = filteredTransactions.filter(transaction => !transaction.isIncome);
            setCategoriesFilter(expenseCategoriesFilter)
            setNewTransactions([...filteredTransactions])
        }else{
            filteredTransactions = transactions
            setNewTransactions([...filteredTransactions])
        }
        
        if(dateFilter != ""){
            filteredTransactions = filteredTransactions.filter(transaction => transaction.date === formatDate(dateFilter));
            setNewTransactions([...filteredTransactions])
        }
        
    }
    
    const filterTransactionsByCategory = ()=>{
        let filteredTransactions = transactions
        if(categoryFilterRef.current.value != "" && categoryFilterRef.current.value != "All"){
            filteredTransactions = filteredTransactions.filter(transaction => transaction.category === categoryFilterRef.current.value);
            setNewTransactions([...filteredTransactions])
        }else{
            filterTransactions()
        }

        
    }

    const displayTransactions = () => {
        let _transactions = newTransactions
        return _transactions.map((transaction, key) => {
            return (
                <div key={key} className={transaction.isIncome ? "transaction income" : "transaction expense"}>
                    <div className="transaction-details">
                        <span className="categoryText">{transaction.category}</span>
                        <span>{transaction.transactionName}</span>
                        <span>{transaction.date}</span>
                    </div>
                    <span className="transaction-amount-container">
                        {transaction.amount} DA
                        <div className="inline-select">
                        <button onClick={() => deleteTransaction(key)} className="delete-btn">Delete</button>
                        <button onClick={() => updateTransaction(key)} className="update-btn">Update</button>
                        </div>
                    </span>
                </div>
            );
        });
    };

    const changeType = ()=>{
        const _type = document.querySelector("#type").value
        setType(_type)
    }


    const displayCategories = ()=>{
        let listOfCategories = incomeCategories
        if(type === "expense"){
            listOfCategories = expenseCategories
        }

        return listOfCategories.map((category,key)=>{
            return <option key={key} value={capitalizeFirstLetter(category)}>📌 {capitalizeFirstLetter(category)}</option>
        })
    }

    

    const displayCategoriesFilter = ()=>{
        let listOfCategories = []
        if(typeFilterRef.current.value === "income"){
            listOfCategories = incomeCategoriesFilter
           
        }else if(typeFilterRef.current.value === "expense"){
            listOfCategories = expenseCategoriesFilter
        }
        
        return listOfCategories.map((category,key)=>{
            return <option key={key} value={capitalizeFirstLetter(category)}>📌 {capitalizeFirstLetter(category)}</option>
        })
    }

    return <>
    {getBalance()}
    <div className="app-container">
        <div className="input-container">
        <div className="header">
                        {/* Replaced Budget Tracker Pro with income and expense widgets */}
                        <div className="widget" id="income_widget">
                            <div className="widget-title">Income</div>
                            <div className="widget-amount">{income} DA</div>
                        </div>
                        <div className="widget" id="expense_widget">
                            <div className="widget-title">Expense</div>
                            <div className="widget-amount">-{expense} DA</div>
                        </div>
                    </div>

            <div id="balance" style={{
                color: balance == 0 ? "#2c3e50" : balance > 0 ? "green" : "red",
            }} >Balance: {balance} DA</div>

            <form id="transactionForm">
                <input type="date" id="date" placeholder="Transaction Date" required ref={dateRef}/>
                <input type="number" id="amount" placeholder="Amount" step="0.01" required ref={amountRef}/>
                <input type="text" id="transactionName" placeholder="Transaction Name" step="0.01" required ref={transactionNameRef}/>
                <div className="inline-select">
                    <select id="category" ref={categoryRef}>
                        <option value="" hidden>Select Category</option>
                        {displayCategories()}
                    </select>
                    <select id="type" required onChange={changeType}>
                        <option value="income">💸 Income</option>
                        <option value="expense">💳 Expense</option>
                    </select>
                </div>

                <button type="submit" onClick={isUpdate ? addExistTransaction : addTransaction} >{isUpdate ? "Update Transaction" : "Add Transaction"}</button>
            </form>
        </div>

        <div className="transactions-container">
            <h2 id="title">Transactions</h2>
            <div className="inline-select">
            <input type="date" id="dateFilter" placeholder="Transaction Date" required onChange={filterTransactions} ref={dateFilterRef} defaultValue="" />
                    <select id="typeFilter" required onChange={filterTransactions} ref={typeFilterRef} defaultValue="all">
                        <option value="all">📍 ALL</option>
                        <option value="income">📍 Income</option>
                        <option value="expense">📍 Expense</option>
                    </select>
                    <select id="categoryFilter" ref={categoryFilterRef} onChange={filterTransactionsByCategory}>
                        <option value="" hidden>Category</option>
                        {displayCategoriesFilter()}
                    </select>
                    <button onClick={handleReset}>Reset</button>
                </div>
            
            <div id="transactionsList">
                {displayTransactions()}
            </div>
            
        </div>

    </div>
    
    
    </>

}