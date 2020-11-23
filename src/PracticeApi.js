import React, { Component } from 'react';
import axios from 'axios';
import Example from './datepicker'

class PracticeApi extends Component {
    state = { 
        email:'hbtonoy42@gmail.com',
        password:'afterburn',
        result:'',
        allData:[]
     }
    async componentDidMount() {
        await axios.post('https://admin.barikoi.xyz:8090/auth/login', {email:this.state.email, password:this.state.password})
     .then(response => {
          this.setState({
              result:response.data.data
          })
          let token = this.state.result;
         localStorage.setItem('token', token)
      })
      .catch(error => {
          console.log(error)
      })
    //   this.fetchData()
     }

    fetchData() {
        axios.get('https://admin.barikoi.xyz:8090/statistics/mapper?dateFrom=2020-11-09&dateTill=2020-11-11',{ headers: {Authorization:'Bearer' + localStorage.getItem('token')}})
        .then(response => {
            // console.log(response.data.data);
            this.setState({
                allData:response.data.data,
                mainData:response.data.data.state
            })
        })
        .catch(error => {
            console.log(error);
        })
       }

    render() { 
        const data = this.state.allData.map(data => {
            return(
            <div key={data.date}>
                <p>{data.date}</p>
                <p>ID: {data.state[1].id}</p>
                <p>Name: {data.state[1].name}</p>
                <p>Place Count: {data.state[1].p_count}</p>
            </div>
            )
        })
        return ( 
            <div>
                <Example />
                {/* <h2>
                    {data}
                </h2> */}
            </div>
         );
    }
}
 
export default PracticeApi;