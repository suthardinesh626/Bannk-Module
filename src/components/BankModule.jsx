import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/modulestyle.css'

function BankModule() {
  const [banks, setBanks] = useState([]);
  const [accNo, setAccNo] = useState('');
  const [bankName, setBankName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch the list of banks when the component mounts
    fetchBanks();
  }, []);

  const fetchBanks = () => {
    const accessToken = localStorage.getItem('accessToken'); // Get the access token from storage (replace with your own implementation)
    axios
      .get('http://172.105.42.161:3020/v1/bank/listBank', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setBanks(response.data);
        } else {
          console.log('Failed to fetch banks');
        }
      })
      .catch((error) => {
        console.error('Error fetching banks', error);
      });
  };

  const handleCreateBank = () => {
    const accessToken = localStorage.getItem('accessToken'); // Get the access token from storage (replace with your own implementation)

    const payload = {
      acc_no: accNo,
      bank_name: bankName,
    };

    axios
      .post('http://172.105.42.161:3020/v1/bank/createBank', payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('Bank created successfully');
          // Fetch the updated list of banks
          fetchBanks();
        } else {
          console.log('Failed to create bank');
        }
      })
      .catch((error) => {
        console.error('Error creating bank', error);
      });
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'accNo') {
      setAccNo(e.target.value);
    } else if (e.target.name === 'bankName') {
      setBankName(e.target.value);
    }
  };

  return (
    <div className="container mt-5">
      <div className="btn_addbank">
        <button onClick={handleCreateBank}>Add Bank</button>
      </div>
      <table className="content_table">
        <thead>
          <tr>
            <th>#</th>
            <th>Bank Name</th>
            <th>Bank Account No.</th>
            <th>Bank Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {banks.map((bank, index) => (
            <tr key={bank.bank_id}>
              <td>{index + 1}</td>
              <td>{bank.bank_name}</td>
              <td>{bank.acc_no}</td>
              <td>{bank.status}</td>
              <td>{/* Add action buttons here */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BankModule;
