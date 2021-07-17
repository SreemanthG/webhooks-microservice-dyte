[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

<p align="center"> 
  <img src="https://raw.githubusercontent.com/SreemanthG/webhooks-microservice-dyte/master/images/logo.PNG?token=ALORTLESOJCVGXE7H5YPZFDA7Q7QO" alt="Webhooks Microservice Logo" height="80px">
</p>
<h1 align="center"> Webhooks Microservice </h1>
<h3 align="center"> A Webhooks Microservice using Node and Moleculer </h3>  

</br>

<!-- <p align="center"> 
  <img src="images/Signal.gif" alt="Sample signal" width="70%" height="70%">
</p> -->

<!-- TABLE OF CONTENTS -->
<h2 id="table-of-contents"> :book: Table of Contents</h2>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project"> ➤ About The Project</a></li>
    <li><a href="#features"> ➤ Features</a></li>
    <li><a href="#folder-structure"> ➤ Folder Structure</a></li>
    <li><a href="#running-local"> ➤ Running Locally</a></li>
    <li><a href="#restful"> ➤ RESTful URLs</a></li>
    <li>
      <a href="#reqandres"> ➤Requests and Responses</a>
    </li>
    <!--<li><a href="#experiments">Experiments</a></li>-->
    <li><a href="#feedback"> ➤ Feedback</a></li>
  </ol>
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- ABOUT THE PROJECT -->
<h2 id="about-the-project"> :pencil: About The Project</h2>

<p align="justify"> 
This is a Webhook Microservice project. Moleculer, a microservices framework, was used to create this microservice. The goal of this project is to create an API that allows many webhooks to be invoked at the same time.
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- PREREQUISITES -->
<h2 id="features"> :fork_and_knife: Features</h2>

<!-- [![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/) <br>
[![Made withJupyter](https://img.shields.io/badge/Made%20with-Jupyter-orange?style=for-the-badge&logo=Jupyter)](https://jupyter.org/try) <br> -->

<!--This project is written in Python programming language. <br>-->
The following are the features provided by this microservice:
* Registers new target URL's into system
* Lists out all the target URL's
* Updates the specific target URL
* Invokes all the target URL's parallely

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- :paw_prints:-->
<!-- FOLDER STRUCTURE -->
<h2 id="folder-structure"> :cactus: Folder Structure</h2>
    
    └── webhooks-microservice-dyte/
        ├── data/
        │   └── webhooks.db
        ├── mixins/
        │   └── db.mixin.js
        ├── public/
        │   └── index.html
        ├── services/
        │   ├── api-service.js
        │   └── webhooks.service.js
        ├── utils/
        │   └── sendRequest.js
        ├── .dockerignore
        ├── .editorconfig
        ├── .eslintrc.js
        ├── .gitignore
        ├── docker-compose.env
        ├── docker-compose.yml
        ├── Dockerfile
        ├── k8s.yaml
        ├── moleculer.config.js
        ├── package-lock.json
        ├── package.json
        └── README.md

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- DATASET -->
<h2 id="running-local"> :floppy_disk: Running Locally</h2>
<p> 
  
Make sure you have [NodeJS](https://nodejs.org/) and the [Mongodb](https://www.mongodb.com/) installed.

```sh
git clone https://github.com/SreemanthG/webhooks-microservice-dyte.git

cd webhooks-microservice-dyte

npm install
```

Development
```sh
npm run dev
```

Production
```sh
npm run start
```

Docker
```sh
docker-compose up
```
<br />
<!-- 
<p align="center">
  <img src="images/Human Activity.gif" alt="Human Activity.gif" display="inline-block" width="60%" height="50%">
</p>


 _The WISDM dataset is publicly available. Please refer to the [Link](https://archive.ics.uci.edu/ml/datasets/WISDM+Smartphone+and+Smartwatch+Activity+and+Biometrics+Dataset+)_ 

  The following table shows the 18 activities represented in data set.
</p> -->

<!-- <p align="center">
  <img src="images/Activity Table.png" alt="Table1: 18 Activities" width="45%" height="45%">
</p> -->

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- ROADMAP -->
<h2 id="restful"> :dart: RESTful URLs</h2>

### Good URL examples
* Registering a target URL:
    * POST http://localhost:3000/api/webhooks/register
* Listing out target URL's:
    * POST http://localhost:3000/api/webhooks/list
* Updating a target URL:
    * PUT http://localhost:3000/api/webhooks/update/:id
* Trigerring all the target URL's:
    * GET http://localhost:3000/api/webhooks/ip

### Bad URL examples
* Registering a target URL:
    * GET http://localhost:3000/api/webhooks/register
* Listing out target URL's:
    * POST http://localhost:3000/list
* Updating a target URL:
    * PUT http://localhost:3000/api/webhooks/update/
* Trigerring all the target URL's:
    * GET http://localhost:3000/api/webhooks/trigger
<br />


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- PREPROCESSING -->
<h2 id="reqandres"> :hammer: Requests and Responses</h2>

### API Resources

  - [POST /register](#post-register)
  - [POST /list](#post-list)
  - [PUT /update/:id](#put-update)
  - [GET /ip](#get-ip)


### POST /register

Example: http://localhost:3000/api/webhooks/register

Request body(JSON):
    
      {
      
        "targetUrl":"http://www.google.com"
      
      }


Response body:
<br />
      


      {
        "_id": "iEKJVNnLPYGwPvVk"
      }

 <br />

### POST /list

Example: http://localhost:3000/api/webhooks/register

Request body(JSON):
    
      {}


Response body:
<br />
      


      {
        "rows": [
            {
                "_id": "iEKJVNnLPYGwPvVk",
                "targetUrl": "http://www.google.com/"
            }
        ]
        "total": 1,
        "page": 1,
        "pageSize": 10,
        "totalPages": 1
      }
 <br />

### PUT /update/:id

Example: http://localhost:3000/api/webhooks/update/JAP611ZUF0yaVaLt

Request body(JSON):
    
      {
        "newTargetUrl":"http://www.youtube.com"
      }


Response body:
<br />

      {
        "_id": "JAP611ZUF0yaVaLt",
        "targetUrl": "http://www.google.com/"
      }
 <br />

### GET /ip

Example: http://localhost:3000/api/webhooks/ip

Request body(JSON):
    
      {
        "ipAddress":"198.168.0.1"
      }


Response body:
<br />

      [
        {
            "targetUrl": "http://www.google.com/",
            "_id": "JAP611ZUF0yaVaLt",
            "status": 201,
            "retries": 0
        }
      ]
 <br />

    
![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- PRE-PROCESSED DATA -->
<h2 id="feedback"> :diamond_shape_with_a_dot_inside: Feedback</h2>

<p align=""> 
  Feel free to send feedback on [Twitter](https://twitter.com/GSreemanth) or [file an issue](https://github.com/SreemanthG/webhooks-microservice-dyte/issues/new). Feature requests are always welcome. You can contact me at sreemanth2001@gmail.com
</p>

