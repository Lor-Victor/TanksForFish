"use strict";

(function () {
    window.addEventListener("load", init);

    function init() {
        const deleteButtons = document.querySelectorAll('.delete-btn');

        deleteButtons.forEach(button => {
            button.addEventListener("click", function (e) {
                const productId = e.currentTarget.dataset.id;
                const name = e.currentTarget.dataset.name; 
                confirmDelete(productId,name); // Call the confirmation function
            });
        });
    }

    function confirmDelete(productId,name) {
        if (confirm(`Are you sure you want to delete ${name} (ID: ${productId})?`)) {
            deleteProduct(productId);
        }
    }

    function deleteProduct(productId) {
        console.log("Deleting product with ID:", productId);
        fetch(`/admin/delete/${productId}`, {
            method: "DELETE",
        })
        .then(checkStatus)
        .then(reloadProducts)
        .catch(error => {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please try again.");
        });
    }

    function reloadProducts() {
        location.replace("/admin/all");
    }

    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error deleting product: " + response.statusText);
        }
        return response;
    }

    function qs(cssSelector) {
        return document.querySelector(cssSelector);
    }

    function qsa(cssSelector) {
        return document.querySelectorAll(cssSelector);
    }
})();