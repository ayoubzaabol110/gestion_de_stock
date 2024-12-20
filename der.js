
const fs = require('fs');
const Product = require('./product');
const prompt = require('prompt-sync')(); 

class Inventory {
  constructor() {
    this.products = [];
    this.nextId = 1; 
    this.loadProducts(); 
  }
  // Charger les produits depuis le fichier JSON
  loadProducts() {
      const data = fs.readFileSync('products.json', 'utf-8');
      this.products = JSON.parse(data);
      
  }

  // Sauvegarder les produits dans le fichier JSON
  saveProducts() {
    fs.writeFileSync('products.json', JSON.stringify(this.products, null, 4));
    console.log("Produits sauvegardés dans products.json");
  }
// suprimerr produit 

deleteProductById(id){
    const index = this.products.find(product => product.id === id);
    if (index !== -1) {
      const removedProduct = this.products.splice(index, 1);
      this.saveProducts();
      console.log(`Produit supprimé : ${removedProduct[0].name}`);
    } else {
      console.log("Produit non trouvé.");
    }
}
  // Ajouter un produit au stock
  addProduct(product) {
    product.id = this.nextId++;
    this.products.push(product);
    this.saveProducts();
    console.log(`Produit ajouté : ${product.name}`);
  }

  // Afficher tous les produits
  displayProducts() {
    if (this.products.length === 0) {
      console.log("Aucun produit en stock.");
      return;
    }

    console.log("Liste des produits :");
    this.products.forEach((product, index) => {
      console.log(`${index + 1}. nom - ${product.name}
         - Description :${product.description} 
         - Quantité: ${product.quantity}
          - Prix: ${product.price} `);
    });
  }
}

function addProductMenu() {
  const name = prompt("Nom du produit : ");
  const description = prompt("Description : ");
  const quantity = parseInt(prompt("Quantité : "));
  const price = parseFloat(prompt("Prix unitaire : "));

  const product = new Product(name, description, quantity, price);
  inventory.addProduct(product);
}

function deleteProductMenu() {
    console.log("1. Supprimer un produit par ID");
      const id = prompt("Entrez l'ID du produit à supprimer : ");
      inventory.deleteProductById(id);}

const inventory = new Inventory();

while (true) {
  console.log("\nMenu Principal :");
  console.log("1. Ajouter un produit");
  console.log("2. Afficher tous les produits");
  console.log("2. suprimmer  un produit");


  console.log("3. Quitter\n");
  const choice = prompt("Choisissez une option : ");
  switch (choice) {
    case "1":
      addProductMenu();
      break;
    case "2":
      inventory.displayProducts();
      break;
      case "3":deleteProductMenu();
      break;
    case "4":
      console.log("Au revoir !");
      return;
    default:
      console.log("Option invalide. Veuillez réessayer.");
  }
}
