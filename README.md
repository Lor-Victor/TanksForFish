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

## <ins>Running the Application</ins>

### Guest
* **Guest user is the default**
     *You can use the search for fish API.
     *You can browse the products and get them by category.
     * **Unable** to view the products in detail.

### User (shopper)
* **Create a user account by signing in with Google**
     *This allows you to view products in detail and access your shopping cart.
 
### Admin
* **Manually create an admin user in the database**
     *A link to admin pages is located at the footer.
     *Able to create a single product or bulk upload a product.
     *Able to edit an existing product or delete a product.
     *Has the functions of a guest and a regular user.
     *Uploaded JSON files are stored in the uploads folder. 
