# Twitter Service

## Getting Started

### Prerequisites

- Make config.js (as shown below) file which has twitter credentials such as consumer key, consumer secret, access token key and access token secret. The file should be created in repository root directory.

```
const config = {
  access_token_key:"",
  access_token_secret:"",
  consumer_key:"",
  consumer_secret:""
}
export default config

```


### Installing node module dependencies

A step by step series of examples that tell you how to get a development env running

This project is divided into  two parts **server** and **client**

- Installing server
  - Run following command to install node module dependencies for **server**
  ```
  npm install
  ```
- Installing client
  - Run following command to install node module dependencies for **client**
  ```
  cd client
  npm install
  ```

### Running Application

- Running **server**
  - Run following command to run **server** module
  ```
  npm start
  ```

- Running **client**
  - Run following command to run **client** module
  ```
  cd client
  npm start
  ```

## Running the tests

- Run test cases
  - Run following command to run **server** tests
  ```
  npm run test
  ```


## Project Contributors
- Dhwani Sanghvi <dhwani.sanghvi@sjsu.edu>
- Praveen Kumar Thakur <praveen.thakur@sjsu.edu>
- Amit Vijapure <amit.vijapure@sjsu.edu>
- Jignesh Madhani <jigneshdinesh.madhani@sjsu.edu>
