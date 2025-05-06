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

### Guest Access
- **Default mode** — no login required.
- Can:
  - Browse products by category.
  - Use the fish information API.
- Cannot:
  - View product details.

---

### Shopper (User)
- **Sign in with Google** to create a user account.
- Gains access to:
  - Product detail pages.
  - Personal shopping cart.

---

### Admin Access
- **Create an admin user manually** in the database.
- Admin capabilities:
  - Access admin pages (via footer link).
  - Create a single product or upload multiple via JSON.
  - Edit or delete existing products.
  - Includes all guest and shopper features.
- Uploaded JSON files are saved to the `/uploads` folder.
