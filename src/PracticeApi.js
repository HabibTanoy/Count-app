import React, { Component } from 'react';
import axios from 'axios';
import Example from './datepicker';
import BeatLoader from "react-spinners/BeatLoader";

class PracticeApi extends Component {
    state = { 
        email:'hbtonoy42@gmail.com',
        password:'afterburn',
        result:'',
        allData:[],
        loading: true
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
     }

    fetchData() {
        axios.get('https://admin.barikoi.xyz:8090/statistics/mapper?dateFrom=2020-11-09&dateTill=2020-11-11',{ headers: {Authorization:'Bearer' + localStorage.getItem('token')}})
        .then(response => {
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
        return ( 
            <div>
                <Example />
                {/* <BeatLoader size={"50"} color={"#36D7B7"} loading={this.state.loading} speedMultiplier={1} /> */}
            </div>
         );
    }
}
 
export default PracticeApi;