import React, { Component } from 'react';
import axios from "axios";

class Fetch extends Component {
    state = { 
        users: []
     }


     sortData(dates)
     {
        let users_container = [];
        dates.map((users) => {
            users.state.map((user) => {
                let exist = this.exists(user.id,users_container);
                // console.log(exist);

                if(exist){
                   let found_user = users_container.find((element) => {
                        return element.user_id == user.id
                    });
                    let total_added = user.p_count + user.v_count;
                    let amount = this.calculation(total_added);
                    found_user.p_count += user.p_count;
                    found_user.v_count += user.v_count;
                    found_user.total_count += total_added;
                    found_user.add_history = found_user.add_history +'+'+ total_added;
                    found_user.cash_history = found_user.cash_history +'+'+ amount;
                    found_user.amount += amount;
                }else{
                    let total_added = user.p_count + user.v_count;
                    let amount = this.calculation(total_added);
                    users_container.push({
                        'user_id' : user.id,
                        'user_name' : user.name,
                        'p_count' : user.p_count,
                        'v_count' : user.v_count,
                        'total_count' : total_added,
                        'add_history' : total_added,
                        'cash_history' : amount,
                        'amount' : amount 
                    });
                }
            });
        });
        this.setState({users: users_container});
       console.log(this.state.users);
     }

     exists(id,users)
     {
         console.log(id);
         let response = false;
        for(let i = 0; i < users.length; i++){
            if(users[i].user_id == id){
                response = true;
            }
        }
        return response;
     }
     calculation(added_data) {
        if(added_data > 0 && added_data <= 250){
            return added_data * 1.20;
        }
        if(added_data > 250 && added_data <= 299){
            return added_data * 1.35;
        }
        if(added_data >= 300){
            return added_data * 1.50;
        }
     }
     
    async fetchData(a, b) {
       
    await axios.get(`https://admin.barikoi.xyz:8090/statistics/mapper?dateFrom=${a}&dateTill=${b}`,{ headers: {Authorization:'Bearer' + localStorage.getItem('token')}})
      .then(response => {
        this.setState({
            users: response.data.data
        })
        this.sortData(response.data.data);
        // console.log(this.state.users);
      })
      .catch(err => {
        console.log(err);
      })
    }
    render() { 
    const startSelect = this.props.Start;
    const endSelect = this.props.End;
    const a = startSelect.current;
    const b = endSelect.current;

    const data = this.state.users.map((item,index) => {
        return(
        <tr key={index}>
            <td>{item.user_id}</td>
            <td>{item.user_name}</td>
            <td>{item.p_count}</td>
            <td>{item.v_count}</td>
            <td>{item.total_count}</td>
            <td>{item.add_history}</td>
            <td>{item.cash_history}</td>
             <td>{item.amount}</td>
         </tr>   
        )
    })

        return ( 
            <div>
                <button onClick={()=>this.fetchData(a, b)}>Click</button>
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                    {/* <th scope="col"></th> */}
                    <th scope="col">Name</th>
                    <th scope="col">Place Added</th>
                    <th scope="col">Vault Added</th>
                    <th scope="col">Total Added</th>
                    <th scope="col">Add History</th>
                    <th>Cash History</th>
                    <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                {data}
                </tbody>
                </table>
                
            </div>
         );
    }
}
 
export default Fetch;