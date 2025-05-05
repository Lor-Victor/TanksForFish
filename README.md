# <ins>TanksForFish-Backend</ins>

## <ins>Installation</ins>

* Get the project by:
    * Cloning the repository: `git clone <repository_url>` (replace `<repository_url>` with the actual URL)
    * Downloading the ZIP file and extracting it.
* Open the project in your preferred IDE (e.g., VS Code).
* Install the necessary dependencies by running the following command in your terminal within the project directory:
    ```bash
    npm install
    ```
* Start the server using the following command:
    ```bash
    node server.js
    ```
* Minor changes were made to create_tables.sql
   * Changed "Model" to "model"
   * Changed categories table to only have name (dropped id)

## <ins>Available Endpoints</ins>

### GET Requests

* **Get all products (Admin View):**
    * **Method:** `GET`
    * **Endpoint:** `http://localhost:3000/admin/all`
    * **Description:** Retrieves a list of all products, potentially including administrative details.

* **Get all products (User View):**
    * **Method:** `GET`
    * **Endpoint:** `http://localhost:3000/products/all`
    * **Description:** Retrieves a list of all products intended for general users.

* **Get specific product details:**
    * **Method:** `GET`
    * **Endpoint:** `http://localhost:3000/products/{productId}`
    * **Description:** Retrieves detailed information for a specific product. Replace `{productId}` with the actual ID of the product (e.g., `6` as in the example).
    * **Example:** `http://localhost:3000/products/6`

* **Get product information for editing (Admin):**
    * **Method:** `GET`
    * **Endpoint:** `http://localhost:3000/admin/edit/{productId}`
    * **Description:** Retrieves product information for editing purposes in the admin interface. Replace `{productId}` with the actual ID of the product (e.g., `6` as in the example).
    * **Example:** `http://localhost:3000/admin/edit/6`
