# Steps to Run the Project First Time

1) Install Hardhat
   ```shell
   npm install --save-dev hardhat
   ```
2)  Initializes Hardhat
    Run this command if you are creating first time project or pulling project for first time from github
    ```shell
    npx hardhat init
    ```
    See if after Initializing is it asking for any other dependencies to install
    e.g:
    ```shell
    npm install --save-dev "@nomicfoundation/hardhat-toolbox@^5.0.0
    ```
3) Move to evidence folder
   ```shell
   cd evidence
   ```
4) Get node_modules files in evidence folder
   ```shell
   npm install
   ```
5) Dependeices need to install for project
   ```shell
   npm i axios
   npm i react-router-dom
   npm i react-table
   ```
6) Now open metamask and create hardhat network
   - Go to setting
   - Go to network
   - Add Network
   - Add Network Manually
   *Network Name:Hardhat
   *RPC URL:http://127.0.0.1:8545/
   *Chain ID: 31337
   *Currency Symbol : ETH
7) Now go to vs code terminal and run hardhat by using following command
   ```shell
   npx hardhat node
   ```
   You will get the list of account with there private key
8) Import one of the account from the list into metamask
   NOTE: Don't close or terminate the "npx hardhat node " terminal
   - Open Metamask
   - Click on Accont
   - Click on "Add Account or hardware wallet"
   - Click on "Import Account"
   - Enter the private key of any one acoount from the list
   - Import
   - Select the hardhat network for the account and you can see account balance with 10000 ETH
9) Deploy Contract by using below command
   NOTE: Don't close or terminate the "npx hardhat node " terminal instead use new terminal to run the deploy command
         Don't run this command in evidence folder
         If you are in evidence folder move backward by using "cd .." command and then run the below command
   ```shell
   npx hardhat run --network localhost scripts/deploy.js
   ```
10) Now copy the copy the contract address and paste it at line no: 48 in file "App.jsx" present at "evidence/src/App.jsx"
11) Now Start the project by running below command
    ```shell
    npm run dev
    ```
# Steps to run project whenever we start our vs code
1) ```shell
   npx hardhat node
   ```
   Note: Don't close or terminate this terminal this will stop hardhat network
2) Open new terminal
   Deploy Contract by using below command
   NOTE: Don't close or terminate the "npx hardhat node " terminal instead use new terminal to run the deploy command
         Don't run this command in evidence folder
         If you are in evidence folder move backward by using "cd .." command and then run the below command
   ```shell
   npx hardhat run --network localhost scripts/deploy.js
   ```
3) Now copy the copy the contract address and paste it at line no: 48 in file "App.jsx" present at "evidence/src/App.jsx"
4) Again open new terminal and run
   ```shell
   cd evidence
   npm run dev
   ```
   
   
