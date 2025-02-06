# Uni-CMS

Uni-CMS is a simple and easy-to-use Content Management System (CMS) designed to help users quickly build and manage website content.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Deploy](#deploy)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/uni-cms.git
    ```
2. Navigate to the project directory:
    ```bash
    cd uni-cms
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Build your Next.js Application:
    ```bash
    npm run build
    ```
    Use our CLI tools we provided you (Optional)
    ```bash
    unicms build
    ```

## Usage

1. Modified .env file for Application setups:
    <br>
2. Start the development server:
    ```bash
    unicms dev
    ```
3. Open your browser and visit `http://localhost:xxxx` to view the project.

## Deploy

> *Recommand for production-ready*

* **Node.js**
    1.Open the Termial
    2.Start the production server:
    ```bash
    unicms start
    ```
<br>

* **Vercel**
    - [Instrunction](https://vercel.com/docs)
    - [Get Started](https://vercel.com/docs/getting-started-with-vercel)
    - [Deploy](https://vercel.com/new)
<br>

* **Github Pages**
    - [Build and deployment](https://github.com)

<br>

> *Work in progress*
* **Docker**
* **CWS LAS**
* **AWS EC2**
* **Aliyun ECS**

## Features

- **User Management**: Add, edit, and delete users.
- **Content Management**: Create, edit, and delete articles and pages.
- **Media Management**: Upload and manage images and files.
- **Access Control**: Set access permissions for different users.
- **Plugin System**: Extend system functionality.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to get involved in the project.

## License

This project is open-sourced under the MIT license. For more details, please refer to the [LICENSE](LICENSE) file.